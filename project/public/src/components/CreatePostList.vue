<template>
	<form v-on:submit.prevent="createPostList($event, title, content, username)">
		<label> Title:
			<input type="text" name="title" v-model="title">
		</label>
		<label>	Content:
			<input type="text" name="content" v-model="content">
		</label>
		<label>	Username:
			<input type="text" name="username" v-model="username">
		</label>		
			<button type="submit">Create Post</button>
			
	</form>
</template>


<script>


export default {
	name: 'create-post-list',
	data: function(){
		return {
			title:'',
			content:'',
			username:''
		};
	},
	methods:{
		createPostList: function(event, title, content, username){
			this.$store.dispatch("createPostList", {
				title: title,
				content: content,
				username, username
			});
			this.$set(this, "title", "");
			this.$set(this, "content", "");
			this.$set(this, "username", "");

			
		}
	}
}
</script>