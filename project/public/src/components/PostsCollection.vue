<template>
	<div>
		<a href="/about">About</a>
		<ul>
			<li 
				is="post-list-item" 
				v-for="item in $store.getters.getPosts" 
				v-bind:post="item">
			</li>
		</ul>
		<create-post></create-post>
	</div>
</template>


<script>
export default {
	name: "posts-collection"
};
</script>