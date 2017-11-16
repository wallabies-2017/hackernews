<template>
	<div>
		<p>Title: {{post.title}}</p> <p>Description: {{post.description}}</p>
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