<template>
	<div>
		<p>Name: {{post.title}}</p> <p>Description: {{post.content}}</p>
	</div>
</template>


<script>
export default {
	name: "postListSummary",
	props:{
		post: Object
	}
};
</script>