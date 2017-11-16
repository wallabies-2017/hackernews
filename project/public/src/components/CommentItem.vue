<template>
	<div>
		<comment-summary 
			v-if="!mode.edit"
			v-bind:comment="comment"
		>
		</comment-summary>

		<edit-comment 
			v-if="mode.edit"
			v-bind:comment="comment"
		>
		</edit-comment>
		<button 
			v-bind:key="comment.id"
			v-on:click="mode.edit = !mode.edit" 
		>
			{{ editMode }}
		</button>

		<button 
			v-bind:key="parent.id"
			v-on:click="detailClick"
		>
			{{ detailMode }}
		</button>
		
		<transition-group name="component-fade" mode="in-out">
			<add-comment 
				v-if="mode.detail && comment.comments"
				v-bind:comment="comment"
				v-bind:key="comment.id"
			>
			</add-comment>

			<ul 
				v-if="mode.detail"
				v-bind:key="comment.id"
			>
				<li 
					is="comment-item"
					v-for="nestedComment in comment.comments"
					v-bind:parent="comment"
					v-bind:comment="nestedComment"
					v-bind:key="nestedComment.id"
				></li>
			
			</ul>
		
		</transition-group> 
	</div>
</template>


<script>
export default {
	name: 'comment-item',
	props:{
		parent: Object,
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
	methods: {
		detailClick: function(event){
			this.$set(this.mode, "detail", !this.mode.detail);

			if (this.mode.detail && !Object.hasOwnProperty.call(this.comment, "comments")){
				this.$store.dispatch("loadComments", {
					comment: this.comment
				});
			}
		}
	},
	computed: {
		editMode: function(){
			return this.mode.edit ? "Summary":"Edit";
		},
		detailMode: function(){
			return this.mode.detail ? "Hide":"Detail";
		},
	}
	
};
</script>