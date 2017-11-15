from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions


from blog.models import Post, Comment, Vote
from blog.serializers import (
	PostDetailSerializer, CommentListSerializer, 
	ListPostSerializer, CommentDetailSerializer, 
	VoteListSerializer, VoteDetailSerializer
)
from blog.permissions import PostIsOwnerOrReadOnly, CommentIsOwnerOrReadOnly, VoteIsOwnerOrReadOnly



class PostListView(generics.ListCreateAPIView):
	queryset = Post.objects.all()
	serializer_class = ListPostSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def perform_create(self, serializer):
		serializer.save(posted_by=self.request.user)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Post.objects.all()
	serializer_class = PostDetailSerializer
	permission_classes = (PostIsOwnerOrReadOnly,)


class PostCommentsListView(generics.ListCreateAPIView):
	queryset = Comment.objects.all()
	serializer_class = CommentListSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get_post(self):
		pk = self.kwargs.get('pk')
		return get_object_or_404(Post, id=pk)

	def get_queryset(self):
		queryset = super().get_queryset()
		queryset = queryset.filter(posts=self.get_post())
		return queryset

	def perform_create(self, serializer):
		post = self.get_post()
		serializer.save(author=self.request.user, post=post, parent=post)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Comment.objects.all()
	serializer_class = CommentDetailSerializer
	permission_classes = (CommentIsOwnerOrReadOnly,)


	

class CommentCommentsListView(generics.ListCreateAPIView):
	queryset = Comment.objects.all()
	serializer_class = CommentListSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get_comment(self):
		pk = self.kwargs.get('pk')
		return get_object_or_404(Comment, id=pk)

	def get_queryset(self):
		queryset = super().get_queryset()
		queryset = queryset.filter(comment=self.get_comment())
		return queryset

	def perform_create(self, serializer):
		comment = self.get_comment()
		serializer.save(author=self.request.user, post=comment.post, parent=comment)

class PostVoteListView(generics.ListCreateAPIView):
	queryset = Vote.objects.all()
	serializer_class = VoteListSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get_post(self):
		pk = self.kwargs.get('pk')
		return get_object_or_404(Post, id=pk)

	def get_queryset(self):
		queryset = super().get_queryset()
		queryset = queryset.filter(posts=self.get_post())
		return queryset

	def perform_create(self, serializer):
		target = self.get_post()
		defaults = serializer.data
		defaults.update(dict(target=target))
		obj, created = Vote.objects.update_or_create(
			posts__id=target.id, user=self.request.user,
			defaults=defaults
		)
		# serializer.save(target=target, user=self.request.user)


class CommentVoteListView(generics.ListCreateAPIView):
	queryset = Vote.objects.all()
	serializer_class = VoteDetailSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get_comment(self):
		pk = self.kwargs.get('pk')
		return get_object_or_404(Comment, id=pk)

	def get_queryset(self):
		queryset = super().get_queryset()
		queryset = queryset.filter(comment=self.get_comment())
		return queryset

	def perform_create(self, serializer):
		target = self.get_comment()
		defaults = serializer.data
		defaults.update(dict(target=target))
		obj, created = Vote.objects.update_or_create(
			comment__id=target.id, user=self.request.user,
			defaults=defaults
		)
		# serializer.save(target=target, user=self.request.user)		