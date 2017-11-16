<template>
	<form v-on:submit.prevent="editComment($event, content)">
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
		comment: Object
	},
	data: function(){
		return {
			content: this.comment.content
		};
	},
	methods: {
		editComment: function(event, content){
			
			this.$store.dispatch("editComment", {
				comment: this.comment,
				data: {
					content: content
				}
			});
			
		}
	}
};
</script>