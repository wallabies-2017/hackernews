<template>
	<div>
		<p>Comment-Content: {{comment.content}}</p> 
	</div>
</template>

<script>
export default {
	name: 'comment-list',
	props:{
		comment: Object
	}
};
</script>