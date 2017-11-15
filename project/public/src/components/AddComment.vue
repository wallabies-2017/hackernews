<template>
	<form v-on:submit.prevent="addComment($event, content)">
		<label> content:
			<input type="text" name="content" v-model="content">
		</label>	
			<button type="submit">Add Comment</button>
			
	</form>
</template>


<script>

export default {
	name: 'add-comment',
	props:{
		postList: Object
	},
	data: function(){
		return {
			content:'',

		};
	},
	methods:{
		addComment: function(event, content){
			this.$store.dispatch("addComment", {
				postList: this.postList,
				data: {
					content: content
				}
			});
			this.$set(this, "content", "");
		}
	}
};
</script>