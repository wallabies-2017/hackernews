<template>
	<div>
		<transition-group name="component-fade" mode="in-out">
			<post-list-summary 
				v-if="!mode.edit" 
				v-bind:post="post" 
				v-bind:key="post.id"
			>
			</post-list-summary>
			
			<edit-post-list 
				v-if="mode.edit" 
				v-bind:post="post" 
				v-bind:key="post.id"
			>
			</edit-post-list>
		</transition-group>

		<button 
			v-bind:key="post.id"
			v-on:click="mode.edit = !mode.edit" 
		>
			{{ editMode }}
		</button>
		<button 
			v-bind:key="post.id"
			v-on:click="detailClick"
		>
			{{ detailMode }}
		</button>
		

		<transition-group name="component-fade" mode="in-out">
			<add-comment 
				v-if="mode.detail && post.comments"
				v-bind:post="post"
				v-bind:key="post.id"
			>
			</add-comment>

			<ul 
				v-if="mode.detail"
				v-bind:key="post.id"
			>
				<li 
					is="comment-item"
					v-for="comment in post.comments"
					v-bind:parent="post"
					v-bind:comment="comment"
					v-bind:key="comment.id"
				></li>
			
			</ul>
		
		</transition-group> 
	</div>
</template>

<script>
export default {
	name: 'post-list-item',
	props:{
		post: Object
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

			if (this.mode.detail && !Object.hasOwnProperty.call(this.post, "comments")){
				this.$store.dispatch("loadComments", {
					post: this.post
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