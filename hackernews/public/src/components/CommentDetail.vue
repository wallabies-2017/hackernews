<template>
	<div>
		<comment-list 
			v-if="!mode.edit"
			v-bind:comment="comment"
		>
		</comment-list>

		<edit-comment 
			v-if="mode.edit"
			v-bind:post="post" 
			v-bind:comment="comment"
			v-on:editComplete="mode.edit = !mode.edit"
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
	name: 'comment-detail',
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