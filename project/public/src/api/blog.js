import axios from "axios";

axios.defaults.baseURL = '/api/v0/blog';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


export default {
	getPost: function(postId){

	},
	getComments: function(postId){

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
			method: 'post',
			url: '/posts/' + postId,
			data: data
		})
	},
	getPosts: function(){
		return axios({
			method: 'get',
			url: '/posts'
		});
	}
}