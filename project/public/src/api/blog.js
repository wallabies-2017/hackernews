import axios from "axios";

axios.defaults.baseURL = '/api/v0/blog';


export default {
	getPost: function(postId){

	},
	getComments: function(postId){

	},
	createPost: function(data){

	},
	editPost: function(postId, data){

	},
	getPosts: function(){
		return axios({
			method: 'get',
			url: '/posts'
		});
	}
}