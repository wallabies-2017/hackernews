from rest_framework import serializers
from blog.models import Post, Comment, Vote

class CommentListSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Comment
		fields = ['url','content']
		extra_kwargs = {
			'url': {'view_name': 'blog:comment-detail'}
		}	

class PostDetailSerializer (serializers.ModelSerializer):

	comments = CommentListSerializer(many=True, read_only=True)

	# comments = serializers.HyperlinkedRelatedField(
	# 	many=True,
	# 	read_only=True,
	# 	view_name='blog:comment-detail'
	# )

	create_comment = serializers.HyperlinkedIdentityField(view_name='blog:post-comments')
	create_vote = serializers.HyperlinkedIdentityField(view_name='blog:post-votes')
	
	class Meta:
		model = Post
		fields = ('title', 'description', 'comments', 'create_comment', 'create_vote')


class ListPostSerializer (serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Post
		fields = ('url','title', 'description')
		extra_kwargs = {
			'url': {'view_name': 'blog:post-detail'}
		}

class CommentDetailSerializer(serializers.ModelSerializer):

	comments = CommentListSerializer(many=True, read_only=True)
	create_comment = serializers.HyperlinkedIdentityField(view_name='blog:comment-comments')

	create_vote = serializers.HyperlinkedIdentityField(view_name='blog:comment-votes')


	class Meta:
		model = Comment
		fields = ['content', 'comments', 'create_comment', 'create_vote']

class VoteListSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Vote
		fields = ('url', 'activity')
		extra_kwargs = {
			'url': {'view_name': 'blog:post-detail'}
		}

class VoteDetailSerializer(serializers.ModelSerializer):

	class Meta:
		model = Vote
		fields = ['activity']



