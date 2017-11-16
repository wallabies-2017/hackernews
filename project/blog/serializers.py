from rest_framework import serializers
from blog.models import Post, Comment, Vote

class PostDetailSerializer(serializers.ModelSerializer):

    # comments = CommentListSerializer(many=True, read_only=True)

    # comments = serializers.HyperlinkedRelatedField(
    #   many=True,
    #   read_only=True,
    #   view_name='blog:comment-detail'
    # )

    create_comment = serializers.HyperlinkedIdentityField(view_name='blog:post-comments')
    create_vote = serializers.HyperlinkedIdentityField(view_name='blog:post-votes')

    username = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='username'
     )

    class Meta:
        model = Post
        fields = ('url', 'title', 'content', 'username', 'create_comment', 'create_vote', 'id')
        extra_kwargs = {
            'url': {'view_name': 'blog:post-detail'}
        }

class CommentDetailSerializer(serializers.ModelSerializer):

    # comments = CommentListSerializer(many=True, read_only=True)
    create_comment = serializers.HyperlinkedIdentityField(view_name='blog:comment-comments')

    create_vote = serializers.HyperlinkedIdentityField(view_name='blog:comment-votes')

    username = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='username'
    )

    class Meta:
        model = Comment
        fields = ['content', 'username', 'create_comment', 'create_vote', 'id']

class VoteListSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Vote
        fields = ('url', 'activity', 'id')
        extra_kwargs = {
            'url': {'view_name': 'blog:post-detail'}
        }

class VoteDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vote
        fields = ['activity', 'id']



