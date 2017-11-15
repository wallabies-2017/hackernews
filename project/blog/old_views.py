from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.views.generic import View, CreateView, DetailView, ListView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.contrib.contenttypes.forms import generic_inlineformset_factory
from django.db.models import IntegerField, Sum, Case, Value, When
from blog.models import Post, Comment, Vote
from blog.forms import PostForm, CommentForm


def count_votes(obj):
	return obj.votes.aggregate(
		up_votes=Sum(
			Case(When(activity=Vote.UPVOTE, then=1),
				 output_field=IntegerField())
		),
		down_votes=Sum(
			Case(When(activity=Vote.DOWNVOTE, then=1),
				 output_field=IntegerField())
		)
	)

def create_vote_form_class(**kwargs):
	return generic_inlineformset_factory(
			Vote, fk_field="object_id", ct_field="content_type", 
			extra=0, min_num=1, exclude=["user", "voted_at"],
			can_delete=False, **kwargs
		)


class IndexView(LoginRequiredMixin, ListView):
	model = Post
	template_name = 'blog/index.html'
	context_object_name = 'posts'

class PostCreateView(LoginRequiredMixin, CreateView):
	
	model = Post
	template_name = 'blog/post-create.html'
	form_class = PostForm
	success_url = 'blog:post-detail'

	def get_initial(self, **kwargs):
		initial = super().get_initial(**kwargs)
		initial["posted_by"] = self.request.user
		return initial

	def get_success_url(self):
		return reverse(self.success_url, kwargs=dict(pk=self.object.pk))

class PostDetailView(LoginRequiredMixin, DetailView):
	template_name = 'blog/post-detail.html'
	model = Post

	def get_context_data(self, **kwargs):
		kwargs['vote_form'] = create_vote_form_class()()
		kwargs['votes'] = count_votes(self.object)
		return super().get_context_data(**kwargs)


class PostUpdateView(LoginRequiredMixin, UpdateView):

	model = Post
	template_name = 'blog/post-update.html'
	form_class = PostForm
	success_url = 'blog:post-detail'

	def get_success_url(self):
		return reverse(self.success_url, kwargs=dict(pk=self.object.pk))	


class PostDeleteView(LoginRequiredMixin, DeleteView):
	
	model = Post
	template_name = 'blog/post-delete.html'
	success_url = 'blog:index'

	def get_success_url(self):
		return reverse(self.success_url)

class PostCommentCreateView(LoginRequiredMixin, CreateView):

	model = Comment
	template_name = 'blog/post-comment-create.html'
	form_class = CommentForm
	success_url = 'blog:post-detail'

	def get_post(self):
		pk = self.kwargs.get('pk')
		return get_object_or_404(Post, id=pk)
	
	def get_context_data(self, **kwargs):
		kwargs['post'] = self.get_post()
		return super().get_context_data(**kwargs)

	def form_valid(self, form):
		instance = form.save(commit=False)
		instance.author = self.request.user
		post = self.get_post()
		instance.post = post
		instance.parent = post
		return super().form_valid(form)

	def get_success_url(self):
		return reverse(self.success_url, kwargs=dict(pk=self.kwargs.get('pk')))


class CommentCommentCreateView(LoginRequiredMixin, CreateView):
	
	model = Comment
	template_name = 'blog/comment-comment-create.html'
	form_class = CommentForm
	success_url = 'blog:post-detail'
	
	def get_post(self):
		pk = self.kwargs.get('pk')
		return get_object_or_404(Post, id=pk)
		

	def get_comment(self):
		comment_id = self.kwargs.get('comment_id')
		return get_object_or_404(Comment, id=comment_id)
			
	
	def get_context_data(self, **kwargs):
		kwargs['comment'] = self.get_comment()
		# kwargs['post'] = self.get_post()
		return super().get_context_data(**kwargs)

	def form_valid(self, form):
		instance = form.save(commit=False)
		instance.author = self.request.user
		comment = self.get_comment()
		instance.post = comment.post
		instance.parent = comment
		return super().form_valid(form)


	def get_success_url(self):
		return reverse(self.success_url, kwargs=dict(pk=self.object.post.pk))


# class CommentUpdateView(LoginRequiredMixin, UpdateView):

# 	model = Comment
# 	template_name = 'blog/comment-update.html'
# 	form_class = CommentForm
# 	success_url = 'blog:post-detail'

# 	def get_success_url(self):
# 		return reverse(self.success_url, kwargs=dict(pk=self.object.pk))	


# class CommentDeleteView(LoginRequiredMixin, DeleteView):
	
# 	model = Comment
# 	template_name = 'blog/comment-delete.html'
# 	success_url = 'blog:post-detail'

# 	def get_success_url(self):
# 		return reverse(self.success_url, kwargs=dict(pk=self.object.pk))


class PostVoteView(LoginRequiredMixin, CreateView):
	model = Vote
	template_name = 'blog/post-detail.html'
	success_url = 'blog:post-detail'
	

	def get_form_class(self):
		self.form_class = create_vote_form_class()
		return super().get_form_class()		

	def get_form_kwargs(self):
		kwargs = super().get_form_kwargs()
		kwargs["instance"] = self.get_post()
		return kwargs

	def get_post(self):
		pk = self.kwargs.get('pk')
		return get_object_or_404(Post, id=pk)


	def get_context_data(self, **kwargs):
		kwargs = super().get_context_data(**kwargs)
		if 'form' in kwargs:	
			kwargs['vote_form'] = kwargs['form']
		else:
			kwargs['vote_form'] = self.get_form_class()()	
		kwargs['post'] = self.get_post()
		kwargs['votes'] = count_votes(kwargs['post'])
		return super().get_context_data(**kwargs)	

	def form_valid(self, form):
		votes = form.save(commit=False)
		for vote in votes:
			vote.user = self.request.user
			vote.save()
		return super().form_valid(form)

		
	def get_success_url(self):
		return reverse(self.success_url, kwargs=dict(pk=self.kwargs.get(self.pk_url_kwarg)))


class CommentVoteView(LoginRequiredMixin, CreateView):
	model = Vote
	template_name = 'blog/post-detail.html'
	success_url = 'blog:post-detail'				
	pk_url_kwarg = 'comment_id'

	def get_form_class(self):
		self.form_class = create_vote_form_class()
		return super().get_form_class()		

	def get_comment(self):
		pk = self.kwargs.get(self.pk_url_kwarg)
		return get_object_or_404(Comment, id=pk)

	def get_form_kwargs(self):
		kwargs = super().get_form_kwargs()
		kwargs["instance"] = self.get_comment()
		return kwargs


	def get_context_data(self, **kwargs):
		kwargs = super().get_context_data(**kwargs)
		if 'form' in kwargs:	
			kwargs['vote_form'] = kwargs['form']
		else:
			kwargs['vote_form'] = self.get_form_class()()	
		kwargs['post'] = self.get_comment().post
		kwargs['votes'] = count_votes(kwargs['post'])
		return super().get_context_data(**kwargs)	

	def form_valid(self, form):
		votes = form.save(commit=False)
		for vote in votes:
			vote.user = self.request.user
			vote.save()
		return super().form_valid(form)

		
	def get_success_url(self):
		return reverse(self.success_url, kwargs=dict(pk=self.get_comment().post.pk))




