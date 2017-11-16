"use strict";
import Vue from 'vue'
import Vuex from 'vuex'
import api from '.api/blog'

Vue.use(Vuex);
api.getPosts().then(function(){
	console.log(arguements);
});

const store = new Vuex.Store({
	strict: true,
	state: {
		postLists: [],
	},
	mutations: {

		createPostList: function(state, payload){
			state.postLists.push(payload);
		},

		loadPostList: function(state, payload){
			Vue.set(state, 'posts', payload.data);
		},

		editPostList: function(state, payload){
			if (payload.data.hasOwnProperty('title')){
				Vue.set(payload.obj, 'title', payload.data.title);
			}
			if (payload.data.hasOwnProperty('description')){
				Vue.set(payload.obj, 'description', payload.data.description);
			}
		},
		addComment: function(state, payload){
			payload.obj.comments.push(payload.data);
		},
		editComment: function(state, payload){
			if (payload.data.hasOwnProperty('content')){
				Vue.set(payload.obj, 'content', payload.data.content);
			}

	
		},
		
		deleteComment: function(state, payload){
			_.remove(payload.obj.comments, function(value){
				return value._id === payload.target;
			});
		}
	},




	actions: {
		createPostList: function(context, payload){
		api.createPost(payload.data).then(function({request,data}){
				context.commit("createPostList", data);
			});
			
		},



		editPostList: function(context, payload){
			var postList = context.getters.getPostList(payload.postList._id);
			if (!postList){
				return false;
			}
			var cleanedData = {};
			if (payload.data.hasOwnProperty('title')){
				cleanedData.title = payload.data.title;
			}
	
			if (payload.data.hasOwnProperty('content')){
				cleanedData.content = payload.data.content;
			}

			if (cleanedData){
				context.commit("editPostList", {
					obj: postList,
					data: cleanedData
				});
				return true;
			}

			return false;
	
		},	
		addComment: function(context, payload){
			var postList = context.getters.getPostList(payload.postList._id);
			if (!postList){
				return false;
			}
			var baseComment = {
				_id: +(new Date()), 
				content: null, 
				createdAt: Date(),
				comments : []		
			};

			context.commit("addComment", {
				obj: postList,
				data: Object.assign(baseComment, payload.data)
			});
			return true;
	
	
		},
		editComment: function(context, payload){
			var comment = context.getters.getComment(payload.postList._id, payload.comment._id);
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
			var postList = context.getters.getPostList(payload.postList._id)
	
			if (!postList){
				return false;
			}

			context.commit("deleteComment", {
				obj: postList,
				target: payload.comment._id
			});
		}


		loadPostList: function(context){
			api.getPostLists().then(function({data,request}){
				context.commit("loadPostList", {
					"data": data
				});
			});		
		}
	},
	getters: {
		getPostList: function(state, getters){
			return function(postListId){
				var viewPostList = state.postLists;
				return viewPostList.find(function(element){
					if (element._id === postListId){
						return element;
					}
				});
			};
		},
		getComment: function(state, getters){
			return function(postListId, commentId){
				var postList = getters.getPostList(postListId);
				if (postList){
					return postList.comments.find(function(element){
						if (element._id === commentId){
							return element;
						}
					});
				}
			};
		},
		getComments: function(state, getters){
			return function(postListId, postId){
				var postList = getters.getPostList(postListId);
				if (postList){
					return postList.comments
				}				
			};
		}
	}
});

export default store;