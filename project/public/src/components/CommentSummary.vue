<template>
	<div>
		<p>Comment name: {{comment.content}}</p> <p>Comment-User: {{comment.username}}</p>
	</div>
</template>

<script>
export default {
	name: 'comment-summary',
	props:{
		comment: Object
	}
};
</script>