<template>
	<form v-on:submit.prevent="createPost($event, title, content, username)">
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
	name: 'create-post',
	data: function(){
		return {
			title:'',
			content:'',
			createdAt: '',
			username: '',
			comments: []

		};
	},
	methods:{
		createPost: function(event, title, content, createdAt, username){
			this.$store.dispatch("createPost", {
				title: title,
				content: content,
				createdAt: createdAt,
				username: username

			});
			this.$set(this, "title", "");
			this.$set(this, "content", "");
			this.$set(this, "createdAt", "");
			this.$set(this, "username", "");
			
		}
	}
}
</script>