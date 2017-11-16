<template>
	<form v-on:submit.prevent="createPostList($event, title, content)">
		<label> Title:
			<input type="text" name="title" v-model="title">
		</label>
		<label>	Content:
			<input type="text" name="content" v-model="content">
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
		};
	},

	
	methods:{
		createPostList: function(event, title, content, username){
			this.$store.dispatch("createPostList", {

				title: title,
				content: content,


			});
			this.$set(this, "title", "");
			this.$set(this, "content", "");
			
		}
	}
}
</script>