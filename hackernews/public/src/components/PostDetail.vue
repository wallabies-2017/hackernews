<template>
	<div>
		<transition-group name="component-fade" mode="in-out">
			<post-list 
				v-if="!mode.edit" 
				v-bind:post="post" 
				v-bind:key="post.id"
			>
			</post-list>
			
			<edit-post 
				v-if="mode.edit" 
				v-bind:post="post" 
				v-bind:key="post.id"
			>
			</edit-post>
		</transition-group>

		<button 
			v-bind:key="post.id"
			v-on:click="mode.edit = !mode.edit" 
		>
			{{ editMode }}
		</button>
		<button 
			v-bind:key="post.id"
			v-on:click="mode.detail = !mode.detail" 
		>
			{{ detailMode }}
		</button>
		

		<transition-group name="component-fade" mode="in-out">
			<create-comment 
				v-if="mode.detail"
				v-bind:post="post"
				v-bind:key="post.id"
			>
			</create-comment>

			<ul 
				v-if="mode.detail"
				v-bind:key="post.id"
			>
				<li 
					is="comment-detail"
					v-for="comment in $store.getters.getComments(post.id)"
					v-bind:post="post"
					v-bind:comment="comment"
					v-bind:key="comment.id"
				>
				
				</li>
			
			</ul>
		
		</transition-group> 
	</div>
</template>

<script>
export default {
	name: 'post-detail',
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
