import Vue from 'vue'

import PostListItem from './components/PostListItem.vue'
import PostListSummary from './components/PostListSummary.vue'
import CreatePost from './components/CreatePostList.vue'
import CommentItem from './components/CommentItem.vue'
import CommentSummary from './components/CommentSummary.vue'
import EditPostList from './components/EditPostList.vue'
import AddComment from './components/AddComment.vue'
import EditComment from './components/EditComment.vue'

import DataStore from './store.js'


Vue.component("post-list-item", PostListItem);
Vue.component("post-list-summary", PostListSummary);
Vue.component("create-post", CreatePost);
Vue.component("comment-item", CommentItem);
Vue.component("comment-summary", CommentSummary);
Vue.component("edit-post-list", EditPostList);
Vue.component("add-comment", AddComment);
Vue.component("edit-comment", EditComment);



// const NotFound = { template: '<p>Page not found</p>' }
// const Home = { template: '<ul><li is="post-list-item" v-for="item in sharedState.posts" v-bind:post="item"></li></ul><create-post></create-post>' }
// const About = { template: '<p>about page</p>' };

// const routes = {
//   '/': Home,
//   '/about': About
// }



var app = new Vue({
	el: '#app',
	data: {
		privateState: {
			mode: {
				edit: false,
				detail: false
			}
		},
		sharedState: DataStore.state
	},
	store: DataStore,
	created: function(){
		this.$store.dispatch('loadPosts');
	}
});
