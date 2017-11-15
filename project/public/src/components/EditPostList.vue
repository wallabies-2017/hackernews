<template>
	<form v-on:submit.prevent="editPost($event, title, content)">
		<label> Name:
			<input type="text" name="title" v-model="title">
		</label>
		<label>	Description:
			<input type="text" name="content" v-model="content">
		</label>	
			<button type="submit">Edit Post</button>
			
	</form>
</template>


<script>
export default {
	name: 'edit-post-list',
	props:{
		post: Object
	},
	data: function(){
		return {
			title: this.post.title,
			content: this.post.content
		};
	},
	methods: {
		editPost: function(event, title, content){
			console.log("EDIT POST");
			this.$store.dispatch("editPost", {
				post: this.post,
				data: {
					title: title,
					content: content
				}
			});
			
		}
	}
};
</script>