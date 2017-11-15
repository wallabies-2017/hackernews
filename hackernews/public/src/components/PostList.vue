<template>
	<div>
		<p>Title: {{post.title}}</p> <p>Description: {{post.description}}</p>
		<p>Posted By: {{post.username}}</p>
	</div>
</template>


<script>
export default {
	name: "postList",
	props:{
		post: Object
	}
};
</script>