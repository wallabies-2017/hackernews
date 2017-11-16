from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType


class Post(models.Model):
	title = models.CharField(max_length=50)
	description = models.TextField()
	posted_by = models.ForeignKey(User)
	posted_at = models.DateTimeField(default=timezone.now)
	

	comments = GenericRelation(
		'blog.Comment', 
		object_id_field='object_id', 
		content_type_field='content_type',
		related_query_name='posts'
	)
	
	votes = GenericRelation(
		'blog.Vote', 
		object_id_field='object_id', 
		content_type_field='content_type',
		related_query_name='posts'
	)

	def __str__(self):
		return self.title

	def save(self, *args, **kwargs):
		sef.updated_at = timezone.now()
		super().save(*arg, **kwargs)


class Comment(models.Model):
	content = models.TextField()
	author = models.ForeignKey(User)
	post = models.ForeignKey(Post)
	posted_at = models.DateTimeField(default=timezone.now)	

	content_type = models.ForeignKey(ContentType)
	object_id = models.PositiveIntegerField()
	parent = GenericForeignKey('content_type', 'object_id')

	comments = GenericRelation(
		'blog.Comment', 
		object_id_field='object_id', 
		content_type_field='content_type',
		related_query_name='comment'
	)
	votes = GenericRelation(
		'blog.Vote', 
		object_id_field='object_id', 
		content_type_field='content_type',
		related_query_name='comment'
	)

	def __str__(self):
		return "{} posted by {} at {}".format(self.content, self.author, self.posted_at)

class Vote(models.Model):
	UPVOTE = "U"
	DOWNVOTE = "D"
	CHOICES = (
		(UPVOTE, "Upvote"), (DOWNVOTE, "Downvote")
	)
	activity = models.CharField(max_length=2, choices=CHOICES)
	user = models.ForeignKey(User)
	voted_at = models.DateTimeField(default=timezone.now)

	content_type = models.ForeignKey(ContentType)
	object_id = models.PositiveIntegerField()
	target = GenericForeignKey('content_type', 'object_id')




		


