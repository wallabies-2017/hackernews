import Vue from 'vue'

import PostsCollection from './components/PostsCollection.vue'
import PostListItem from './components/PostListItem.vue'
import PostListSummary from './components/PostListSummary.vue'
import CreatePost from './components/CreatePostList.vue'
import CommentItem from './components/CommentItem.vue'
import CommentSummary from './components/CommentSummary.vue'
import EditPostList from './components/EditPostList.vue'
import AddComment from './components/AddComment.vue'
import EditComment from './components/EditComment.vue'

import DataStore from './store.js'

Vue.component("posts-collection", PostsCollection);
Vue.component("post-list-item", PostListItem);
Vue.component("post-list-summary", PostListSummary);
Vue.component("create-post", CreatePost);
Vue.component("comment-item", CommentItem);
Vue.component("comment-summary", CommentSummary);
Vue.component("edit-post-list", EditPostList);
Vue.component("add-comment", AddComment);
Vue.component("edit-comment", EditComment);



const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '<posts-collection></posts-collection>' }
const About = { template: '<p>about page</p>' };

const routes = {
  '/': Home,
  '/about': About
};



var app = new Vue({
	el: '#app',
	data: {
		currentRoute: window.location.pathname
	},
	computed: {
    	ViewComponent: function() {
			return routes[this.currentRoute] || NotFound
		}
	},
	store: DataStore,
	created: function(){
		this.$store.dispatch('loadPosts');
	},
	render: function(renderer){
		return renderer(this.ViewComponent);
	}
});
