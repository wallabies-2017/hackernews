from django import forms
from django.forms import ModelForm

from blog.models import Post, Comment

class PostForm(forms.ModelForm):

	class Meta:
		model = Post
		fields = ['title', 'content']


class CommentForm(forms.ModelForm):

	class Meta:
		model = Comment
		fields = ['content']

