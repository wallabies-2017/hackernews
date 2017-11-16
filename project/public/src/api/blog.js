import axios from "axios";

axios.defaults.baseURL = '/api/v0/blog';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


export default {
	getPosts: function(){
		return axios({
			method: 'get',
			url: '/posts'
		});
	},
	getPost: function(postId){
		return axios({
			method: 'get',
			url: '/posts/' + postId
		});
	},
	getComments: function(postId){
		return axios({
			method: 'get',
			url: '/posts/' + postId + '/comments'
		});
	},
	createPost: function(data){
		return axios({
			method: 'post',
			url: '/posts',
			data: data
		});
	},
	editPost: function(postId, data){
		return axios({
			method: 'put',
			url: '/posts/' + postId,
			data: data
		});
	},
	addComment: function(postId, data){
		return axios({
			method: 'post',
			url: '/posts/' + postId + "/comments",
			data: data
		});
	},
	editComment: function(commentId, data){
		return axios({
			method: 'put',
			url: '/comments/' + commentId,
			data: data
		});
	}
}