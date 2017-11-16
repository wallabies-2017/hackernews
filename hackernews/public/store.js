"use strict";
import Vue from 'vue';
import Vuex from 'vuex';
import api from './api/blog';

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: true,
	state: {
		posts: [],
	},
	mutations: {
		createPost: function(state, payload){
			state.posts.push(payload);
		},
		editPost: function(state, payload){
			var isChanged = false;
			if (payload.data.hasOwnProperty('title')){
				Vue.set(payload.obj, 'title', payload.data.title);
				isChanged = true;
			}
	
			if (payload.data.hasOwnProperty('description')){
				Vue.set(payload.obj, 'description', payload.data.description);
				isChanged = true;
			}

			if(isChanged){
				Vue.set(payload.obj, 'updatedAt', +(new Date()))
			}			
		},
		createComment: function(state, payload){
			payload.obj.comments.push(payload.data);
		},
		editComment: function(state, payload){
			var isChanged = false;
			if (payload.data.hasOwnProperty('content')){
				Vue.set(payload.obj, 'content', payload.data.content);
				isChanged = true;
			}

			if(isChanged){
				Vue.set(payload.obj, 'updatedAt', +(new Date()))
			}
		},
		
		deleteComment: function(state, payload){
			_.remove(payload.obj.comments, function(value){
				return value._id === payload.target;
			});
		}
	},
	actions: {
		createPost: function(context, payload){
			var basePost = {
				_id: +(new Date()), 
				title: null, 
				description: null,
				postedAt: +(new Date()),
				updatedAt: +(new Date()),
				username: null, 
				comments:[]
			};
			context.commit("createPost", Object.assign(basePost, payload));
		},
		editPost: function(context, payload){
			var post = context.getters.getPost(payload.post._id);
			if (!post){
				return false;
			}
			var cleanedData = {};
			if (payload.data.hasOwnProperty('title')){
				cleanedData.title = payload.data.title;
			}
	
			if (payload.data.hasOwnProperty('description')){
				cleanedData.description = payload.data.description;
			}

			if (cleanedData){
				context.commit("editPost", {
					obj: post,
					data: cleanedData
				});
				return true;
			}

			return false;
	
		},	
		createComment: function(context, payload){
			var post = context.getters.getPost(payload.post._id);
			if (!post){
				return false;
			}
			var baseComment = {
				_id: +(new Date()), 
				content: null,
				postedAt: +(new Date()),
				updatedAt: +(new Date()),
				author: null, 
				comments:[]
			};

			context.commit("createComment", {
				obj: post,
				data: Object.assign(baseComment, payload.data)
			});
			return true;
	
	
		},
		editComment: function(context, payload){
			var comment = context.getters.getComment(payload.post._id, payload.comment._id);
			if (!comment){
				return false;
			}
	
			var cleanedData = {};
			if (payload.data.hasOwnProperty('content')){
				cleanedData.name = payload.data.name;
			}

			if (cleanedData){			
				context.commit("editComment", {
					obj: comment,
					data: cleanedData
				});
			}
	
		},
		
		deleteComment: function(context, payload){
			var post = context.getters.getPost(payload.post._id)
	
			if (!post){
				return false;
			}

			context.commit("deleteComment", {
				obj: post,
				target: payload.comment._id
			});
		}
	},
	getters: {
		getPost: function(state, getters){
			return function(postId){
				var viewPost = state.posts;
				return viewPost.find(function(element){
					if (element._id === postId){
						return element;
					}
				});
			};
		},
		getComment: function(state, getters){
			return function(postId, commentId){
				var post = getters.getPost(postId);
				if (post){
					return post.comments.find(function(element){
						if (element._id === commentId){
							return element;
						}
					});
				}
			};
		},
		getComments: function(state, getters){
			return function(postId, commentId){
				var post = getters.getPost(postId);
				if (post){
					return post.comments
				}				
			};
		},
		getPosts: function(state, getters){
			return function(cb){
				api.getPosts().then(function({data, request}){
					console.log(data, request);
					cb(data);
					state.posts = data;
				});
			}
		}
	}
});

export default store;