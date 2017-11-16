<template>
	<form v-on:submit.prevent="createPost($event, title, description)">
		<label> Title:
			<input type="text" name="title" v-model="title">
		</label>
		<label>	Description:
			<input type="text" name="description" v-model="description">
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
			description:''
		};
	},
	methods:{
		createPost: function(event, title, description){
			this.$store.dispatch("createPost", {
				data: {
					title: title,
					description: description
				}	
			});
			this.$set(this, "title", "");
			this.$set(this, "description", "");
			
		}
	}
}
</script>