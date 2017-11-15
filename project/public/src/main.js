import Vue from 'vue';
import PostListItem from './components/PostListItem.vue';
import PostListSummary from './components/PostListSummary.vue';
import CreatePostList from './components/CreatePostList.vue';
import EditPostList from './components/EditPostList.vue';
import CommentItem from './components/CommentItem.vue';
import CommentSummary from './components/CommentSummary.vue';
import AddComment from './components/AddComment.vue';
import EditComment from './components/EditComment.vue';

import DataStore from './store.js';



Vue.component("post-list-item", PostListItem);
Vue.component("post-list-summary", PostListSummary);
Vue.component("create-post-list", CreatePostList);
Vue.component("edit-post-list", EditPostList);
Vue.component("comment-item", CommentItem);
Vue.component("comment-summary", CommentSummary);
Vue.component("add-comment", AddComment);
Vue.component("edit-comment", EditComment);

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
	store: DataStore
});