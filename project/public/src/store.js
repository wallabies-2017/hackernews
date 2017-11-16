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
			state.posts.push(payload)
		},
		loadPosts: function(state, payload){
			Vue.set(state, 'posts', payload.data);
		},
		loadComments: function(state, payload){
			Vue.set(payload.obj, 'comments', payload.data);
		},
		editPost: function(state, payload){
			Object.assign(payload.obj, payload.data);
		},
		addComment: function(state, payload){
			payload.obj.comments.push(payload.data);
		},
		editComment: function(state, payload){
			Object.assign(payload.obj, payload.data);
		},
		deleteComment: function(state, payload){
			// _.remove(payload.obj.comments, function(value){
			// 	return value._id === payload.target;
			// });
		},
		deletePost: function(state, payload){
			for (let idx = 0; idx < state.posts.length; idx++){
				if (state.posts[idx].id === payload.target.id){
					state.posts.splice(idx, 1);
					return;
				}
			}
		}
	},
	actions: {
		createPost: function(context, payload){
			api.createPost(payload.data).then(function({request,data}){
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
		addComment: function(context, payload){
			if (payload.post){
				api.addPostComment(payload.post.id, payload.data).then(function({request, data}){
					context.commit("addComment", {
						obj: payload.post,
						data: data
					});
				});
			} else if (payload.comment){
				api.addCommentComment(payload.comment.id, payload.data).then(function({request, data}){
					context.commit("addComment", {
						obj: payload.comment,
						data: data
					});
				});
			}
		},
		editComment: function(context, payload){
			api.editComment(payload.comment.id, payload.data).then(function({request, data}){
				context.commit("editComment", {
					obj: payload.comment,
					data: data
				});
			});
		},
		// deleteComment: function(context, payload){
		// 	var comment = context.getters.getPost(payload.post._id)

		// 	if (!comment){
		// 		return false;
		// 	}

		// 	context.commit("deleteComment", {
		// 		obj: comment,
		// 		target: payload.comment._id
		// 	});
		// },
		deletePost: function(context, payload){
			api.deletePost(payload.post.id).then(function(){
				context.commit("deletePost", {
					target: payload.post
				});
			});
		},
		loadPosts: function(context){
			api.getPosts().then(function({data,request}){
				context.commit("loadPosts", {
					"data": data
				});
			});
		},
		loadComments: function(context, payload){
			if(payload.post){
				// load comments for a post
				var comments = api.getPostComments(payload.post.id);
				comments.then(function({data, request}){
					context.commit("loadComments", {
						"obj": payload.post,
						"data": data
					});
				});
			} else if (payload.comment){
				// load comments for a comment
				var comments = api.getCommentComments(payload.comment.id);
				comments.then(function({data, request}){
					context.commit("loadComments", {
						"obj": payload.comment,
						"data": data
					});
				});
			}
		}
	},
	getters: {
		getPosts: function(state, getters){
			return state.posts;
		},
		getPost: function(state, getters){
			return function(postId){
				var viewPost = state.posts;
				return viewPost.find(function(element){
					if (element._id === postId){
						return element;
					}
				})
			}
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
			}
		},
		getComments: function(state, getters){
			return function(postId){
				var post = getters.getPost(postId);
				if (post){
					return post.comments
				}
			}
		},
	}
});

export default store;
