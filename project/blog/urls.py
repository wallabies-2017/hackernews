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
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^posts$', views.PostListView.as_view(), name="posts"),
    url(r'^posts/(?P<pk>[0-9]+)$', views.PostDetail.as_view(), name="post-detail"),
    url(r'^posts/(?P<pk>[0-9]+)/comments$', views.PostCommentsListView.as_view(), name="post-comments"),
    url(r'^comments/(?P<pk>[0-9]+)/$', views.CommentDetail.as_view(), name="comment-detail"),
    url(r'^comments/(?P<pk>[0-9]+)/comments$', views.CommentCommentsListView.as_view(), name="comment-comments"),
    url(r'^comments/(?P<pk>[0-9]+)/votes$', views.CommentVoteListView.as_view(), name="comment-votes"),
     url(r'^posts/(?P<pk>[0-9]+)/votes$', views.PostVoteListView.as_view(), name="post-votes"),

]

urlpatterns = format_suffix_patterns(urlpatterns)