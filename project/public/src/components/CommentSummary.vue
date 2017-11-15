<template>
	<div>
		<p>Comment: {{comment.content}}</p> 
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