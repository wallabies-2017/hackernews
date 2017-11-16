import axios from "axios";

axios.defaults.baseURL = '/api/v0/blog';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


export default {
	getPostList: function(postId){

	},
	getComments: function(postId){
		return axios({
			method: 'get',
			url: '/comments' + postId
		});
	},
	createPostList: function(data){
		return axios({
			method: 'get',
			url: '/posts',
			data: data
		});
	},
	editPostList: function(postId, data){
		return axios({
			method: 'put',
			url: '/posts/' + postId,
			data: data
		});
	},
	getPostLists: function(){
		return axios({
			method: 'get',
			url: '/posts'
		});
	}
}