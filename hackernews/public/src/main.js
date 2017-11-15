import Vue from 'vue';
import PostList from './components/PostList.vue';
import PostDetail from './components/PostDetail.vue';
import CreatePost from './components/CreatePost.vue';
import EditPost from './components/EditPost.vue';
import CreateComment from './components/CreateComment.vue';
import EditComment from './components/EditComment.vue';
import CommentDetail from './components/CommentDetail.vue';
import CommentList from './components/CommentList.vue';

import DataStore from './store.js';

Vue.component("post-list", PostList);
Vue.component("post-detail", PostDetail);
Vue.component("create-post", CreatePost);
Vue.component("edit-post", EditPost);
Vue.component("create-comment", CreateComment);
Vue.component("edit-comment", EditComment);
Vue.component("comment-detail", CommentDetail);
Vue.component("comment-list", CommentList)


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
