<template>
	<div>
		<transition-group name="component-fade" mode="in-out">
			<post-list-summary 
				v-if="!mode.edit" 
				v-bind:post="post" 
				v-bind:key="post._id"
			>
			</post-list-summary>
			
			<edit-post-list 
				v-if="mode.edit" 
				v-bind:post="post" 
				v-bind:key="post._id"
			>
			</edit-post-list>
		</transition-group>

		<button 
			v-bind:key="post._id"
			v-on:click="mode.edit = !mode.edit" 
		>
			{{ editMode }}
		</button>
		<button 
			v-bind:key="post._id"
			v-on:click="mode.detail = !mode.detail" 
		>
			{{ detailMode }}
		</button>
		

		<transition-group name="component-fade" mode="in-out">
			<add-comment 
				v-if="mode.detail"
				v-bind:post="post"
				v-bind:key="post._id"
			>
			</add-comment>

			<ul 
				v-if="mode.detail"
				v-bind:key="post._id"
			>
				<li 
					is="comment-item"
					v-for="comment in post.comments"
					v-bind:post="post"
					v-bind:comment="comment"
					v-bind:key="comment._id"
				>
				
				</li>
			
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