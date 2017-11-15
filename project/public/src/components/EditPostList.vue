<template>
	<form v-on:submit.prevent="editPostList($event, title, content, username)">
		<label> title:
			<input type="text" name="title" v-model="title">
		</label>
		<label>	content:
			<input type="text" name="content" v-model="content">
		</label>
		<label>	username:
			<input type="text" name="username" v-model="username">
		</label>	
			<button type="submit">Edit Post List</button>
			
	</form>
</template>


<script>


export default {
	name: 'edit-post-list',
	props:{
		postList: Object
	},
	data: function(){
		return {
			title: this.postList.title,
			content: this.postList.content,
			username: this.postList.username,

		};
	},
	methods: {
		editPostList: function(event, title, content, username){
			this.$store.dispatch("editPostList", {
				postList: this.postList,
				data: {
					title: title,
					content: content,
					username: username,

				}
			});
		}
	}
};
</script>