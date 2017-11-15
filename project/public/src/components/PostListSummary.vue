<template>
	<div>
		<p>title: {{postList.title}}</p> <p>content: {{postList.content}}</p>
		<p>created by: {{postList.username}}</p>
	</div>
</template>


<script>
export default {
	name: "postListSummary",
	props:{
		postList: Object
	}
};
</script>