<template>
	<form v-on:submit.prevent="createComment($event, content)">
		<label> Content:
			<input type="text" name="content" v-model="content">
		</label>
			<button type="submit">Create Comment</button>	
	</form>
</template>


<script>

export default {
	name: 'create-comment',
	props:{
		post: Object
	},
	data: function(){
		return {
			content:''
		};
	},
	methods:{
		createComment: function(event, content){
			this.$store.dispatch("createComment", {
				post: this.post,
				data: {
					content: content
				}
			});
			this.$set(this, "content", "");
		}
	}
};
</script>