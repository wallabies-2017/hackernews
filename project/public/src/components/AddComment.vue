<template>
	<form v-on:submit.prevent="addComment($event, title, content, username)">
		<label> Title:
			<input type="text" name="title" v-model="title">
		</label>
		<label>	Content:
			<input type="text" name="content" v-model="content">
		</label>
		<label>	Username:
			<input type="text" name="username" v-model="username">
		</label>

			<button type="submit">Add Comment</button>
			
	</form>
</template>


<script>

export default {
	name: 'add-comment',
	props:{
		post: Object
	},
	data: function(){
		return {
			title:'',
			content:'',
			username:''
		};
	},
	methods:{
		addComment: function(event, title, content, username){
			this.$store.dispatch("addComment", {
				post: this.post,
				data: {
					title: title,
					content: content,
					username: username
				}
			});
			this.$set(this, "title", "");
			this.$set(this, "content", "");
			this.$set(this, "username", "");
		}
	}
};
</script>