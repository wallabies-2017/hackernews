<template>
	<form v-on:submit.prevent="addComment($event, content)">
		<label>	Content:
			<input type="text" name="content" v-model="content">
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
			content:''
		};
	},
	methods:{
		addComment: function(event, content){
			this.$store.dispatch("addComment", {
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