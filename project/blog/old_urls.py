"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^index$', views.IndexView.as_view(), name="index"),
    url(r'^posts/create$', views.PostCreateView.as_view(), name="post-create"),
    url(r'^posts/(?P<pk>\d+)/detail/$', views.PostDetailView.as_view(), name="post-detail"),
    url(r'^posts/(?P<pk>\d+)/update$', views.PostUpdateView.as_view(), name="post-update"),
    url(r'^posts/(?P<pk>\d+)/delete$', views.PostDeleteView.as_view(), name="post-delete"),
    url(r'^posts/(?P<pk>\d+)/comments$', views.PostCommentCreateView.as_view(), name="post-comment-create"),
    url(r'^comments/(?P<comment_id>\d+)/comments$', views.CommentCommentCreateView.as_view(), name="comment-comment-create"),
    #url(r'^comments/(?P<comment_id>\d+)/update$', views.CommentUpdateView.as_view(), name="comment-update"),
    #url(r'^comments/(?P<comment_id>\d+)/delete$', views.CommentDeleteView.as_view(), name="comment-delete"),
    url(r'^posts/(?P<pk>\d+)/votes$', views.PostVoteView.as_view(), name="post-vote"),
    url(r'^comments/(?P<comment_id>\d+)/votes$', views.CommentVoteView.as_view(), name="comment-vote"),
]
