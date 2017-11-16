"use strict";
import Vue from 'vue';
import Vuex from 'vuex';
import api from './api/blog.js'

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: true,
	state: {
		posts: [],
	},
	mutations: {
		loadPosts: function(state, payload){
			Vue.set(state, 'posts', payload.data);
		},
		loadComments: function(state, payload){
			Vue.set(payload.obj, "comments", payload.data);
		},
		createPost: function(state, payload){
			state.posts.push(payload);
		},
		editPost: function(state, payload){
			Object.assign(payload.obj, payload.data);
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
			api.createPost(payload.data).then(function({request, data}){
				context.commit("createPost", data);
			});
			
		},
		editPost: function(context, payload){
			api.editPost(payload.post.id, payload.data).then(function({request, data}){
				context.commit("editPost", {
					obj: payload.post,
					data: data
				});
			});
	
		},	
		createComment: function(context, payload){
			api.createComment(payload.post.id, payload.data).then(function({request, data}){
				context.commit("createComment", {
					obj: payload.post,
					data: data
				});
			});
			
	
		},
		editComment: function(context, payload){
			var comment = context.getters.getComment(payload.post._id, payload.comment._id);
			if (!comment){
				return false;
			}
	
			var cleanedData = {};
			if (payload.data.hasOwnProperty('content')){
				cleanedData.content = payload.data.content;
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
		},

		loadPosts: function(context){
			api.getPosts().then(function({data, request}){
				context.commit("loadPosts", {"data":data});
			});
		},

		loadComments: function(context, payload){
			if (payload.post){
				var comments = api.getComments(payload.post.id);
				comments.then(function({request, data}){
					context.commit("loadComments", {
						obj: payload.post,
						data: data
					});
				});
			} else if (payload.comment){
				// ...
			}
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

	}
});

export default store;