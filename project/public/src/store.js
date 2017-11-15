"use strict";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: true,
	state: {
		postLists: [],
	},
	mutations: {
		createPostList: function(state, payload){
			state.postLists.push(payload);
		},
		editPostList: function(state, payload){
			if (payload.data.hasOwnProperty('title')){
				Vue.set(payload.obj, 'title', payload.data.title);
			}
			if (payload.data.hasOwnProperty('description')){
				Vue.set(payload.obj, 'description', payload.data.description);
			}
			if (payload.data.hasOwnProperty('username')){
				Vue.set(payload.obj, 'username', payload.data.description);
			}
		},
		addComment: function(state, payload){
			payload.obj.comments.push(payload.data);
		},
		editComment: function(state, payload){
			if (payload.data.hasOwnProperty('content')){
				Vue.set(payload.obj, 'content', payload.data.content);
			}
				if (payload.data.hasOwnProperty('username')){
				Vue.set(payload.obj, 'content', payload.data.content);
			}
	
		},
		
		deleteComment: function(state, payload){
			_.remove(payload.obj.posts, function(value){
				return value._id === payload.target;
			});
		}
	},
	actions: {
		createPostList: function(context, payload){
			var basePostList = {
				_id: +(new Date()), 
				title: null, 
				content: null, 
				comments: [], 
			};
			context.commit("createPostList", Object.assign(basePostList, payload));
		},
		editPostList: function(context, payload){
			var postList = context.getters.getPostList(payload.postList._id);
			if (!postList){
				return false;
			}
			var cleanedData = {};
			if (payload.data.hasOwnProperty('title')){
				cleanedData.name = payload.data.name;
			}
	
			if (payload.data.hasOwnProperty('content')){
				cleanedData.description = payload.data.description;
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
				cleanedData.name = payload.data.content;
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