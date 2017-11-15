"use strict";
import Vue from 'vue'
import Vuex from 'vuex'
var faker = require("faker");

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
		editPost: function(state, payload){
			if (payload.data.hasOwnProperty('title')){
				Vue.set(payload.obj, 'title', payload.data.title);
			}

			if (payload.data.hasOwnProperty('content')){
				Vue.set(payload.obj, 'content', payload.data.content)
			}
		},
		addComment: function(state, payload){
			
			payload.obj.comments.push(payload.data)
		},
		editComment: function(state, payload){

			if (payload.data.hasOwnProperty('content')){
				Vue.set(payload.obj, 'content', payload.data.content)
			}

			if (payload.data.hasOwnProperty('username')){
				Vue.set(payload.obj, 'username', payload.data.username)
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
				content: null,
				createdAt: null,
				updatedAt: null,
				username: null,
				comments:[]
			}
			context.commit("createPost", Object.assign(basePost, payload))
		},
		editPost: function(context, payload){
			var post = context.getters.getPost(payload.post._id)

			if (!post){
				return false;
			}
			var cleanedData = {};
			if (payload.data.hasOwnProperty('title')){
				cleanedData.title = payload.data.title;
			}
			if (payload.data.hasOwnProperty('content')){
				cleanedData.content = payload.data.content
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
		addComment: function(context, payload){
			var createdAt = faker.date.past();
			var post = context.getters.getPost(payload.post._id)
			if (!post){
				return false;
			}
			console.log(payload.data)
			var baseComment = {
				_id: +(new Date()),
				content: null, 
				createdAt: createdAt,
				updatedAt: null,
				description: null,
				username: null,
				comments: []
			};

			context.commit("addComment", {
				
				obj: post,
				data: Object.assign(baseComment, payload.data)
			});
			return true;
		},
		editComment: function(context, payload){
			var comment = context.getters.getComment(
				payload.post._id, payload.comments._id
			)
			if (!comment){
				return false;
			}

			var cleanedData = {};

			if (payload.data.hasOwnProperty('content')){
				cleanedData.content = payload.data.content;
			}

			if (payload.data.hasOwnProperty('username')){
				cleanedData.username = payload.data.username;
			}
			
			if (cleanedData){
				context.commit("editComment", {
					obj:comment,
					data: cleanedData
				});
			}

		},
		deleteComment: function(context, payload){
			var comment = context.getters.getPost(payload.post._id)

			if (!comment){
				return false;
			}

			context.commit("deleteComment", {
				obj: comment,
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
		}
	}

	

});

export default store;


