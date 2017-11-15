<template>
	<div>
		<comment-summary 
			v-if="!mode.edit"
			v-bind:comment="comment"
		>
		</comment-summary>

		<edit-comment 
			v-if="mode.edit"
			v-bind:post="post" 
			v-bind:comment="comment"
		>
		</edit-comment>
		<button 
			v-bind:key="post._id"
			v-on:click="mode.edit = !mode.edit" 
		>
			{{ editMode }}
		</button>
	
	</div>
</template>


<script>
export default {
	name: 'comment-item',
	props:{
		post: Object,
		comment: Object
	},
	data: function(){
		return {
			mode: {
				detail: false,
				edit: false
			}
		}
	},	
	computed: {
		editMode: function(){
			return this.mode.edit ? "Summary":"Edit";
		}
	}
	
};
</script>