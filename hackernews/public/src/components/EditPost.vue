<template>
	<form v-on:submit.prevent="editPost($event, title, description)">
		<label> Title:
			<input type="text" name="title" v-model="title">
		</label>
		<label>	description:
			<input type="text" name="description" v-model="description">
		</label>	
			<button type="submit">Edit Post</button>
			
	</form>
</template>


<script>


export default {
	name: 'edit-post',
	props:{
		post: Object
	},
	data: function(){
		return {
			title: this.post.title,
			description: this.post.description
		};
	},
	methods: {
		editPost: function(event, title, description){
			this.$store.dispatch("editPost", {
				post: this.post,
				data: {
					title: title,
					description: description
				}
			});
		}
	}
};
</script>