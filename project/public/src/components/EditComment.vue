<template>
	<form v-on:submit.prevent="editComment($event, username, content)">
		<label> Username:
			<input type="text" name="username" v-model="username">
		</label>
		<label>	Content:
			<input type="text" name="content" v-model="content">
		</label>	
			<button type="submit">Edit Comment</button>
			
	</form>
</template>


<script>
export default {
	name: 'edit-comment',
	props:{
		post: Object,
		comment: Object
	},
	data: function(){
		return {
			username: this.comment.username,
			content: this.comment.content
		};
	},
	methods: {
		editComment: function(event, username, content){
			
			this.$store.dispatch("editComment", {
				comment: this.comment,
				post: this.post,
				data: {
					username: username,
					content: content
				}
			});
			
		}
	}
};
</script>