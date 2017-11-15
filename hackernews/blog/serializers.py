from rest_framework import serializers
from blog.models import Post, Comment, Vote

class CommentDetailSerializer(serializers.ModelSerializer):

	comments = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='blog:comment-detail'
    )

	create_comment = serializers.HyperlinkedIdentityField(view_name='blog:comment-comments')

	create_vote = serializers.HyperlinkedIdentityField(view_name='blog:comment-votes')

	class Meta:
		model = Comment
		fields = ['content', 'comments', 'create_comment', 'create_vote', 'id'] 

class CommentListSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Comment
		fields = ['url', 'content', 'id']	
		extra_kwargs = {
			"url": {"view_name": "blog:comment-detail"}
		}

class PostDetailSerializer (serializers.HyperlinkedModelSerializer):

	comments = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='blog:comment-detail'
    )

	create_comment = serializers.HyperlinkedIdentityField(view_name='blog:comments')

	create_vote = serializers.HyperlinkedIdentityField(view_name='blog:post-votes')

	class Meta:
		model = Post
		fields = ('url', 'title', 'description', 'comments', 'create_comment', 'create_vote', 'id')

		extra_kwargs = {
			"url": {"view_name": "blog:post-detail"}
		}

class ListPostSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Post
		fields = ('url','title', 'description', 'id')
		extra_kwargs = {
			"url": {"view_name": "blog:post-detail"}
		}		


class VoteListSerializer(serializers.HyperlinkedModelSerializer):


	class Meta:
		model = Vote
		fields = ('url', 'activity', 'id')
		extra_kwargs = {
			"url": {"view_name": "blog:post-detail"}
		}

class VoteDetailSerializer(serializers.ModelSerializer):

	class Meta:
		model = Vote
		fields = ['activity', 'id']	


