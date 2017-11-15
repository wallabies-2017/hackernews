from django import template
from django.contrib.contenttypes.forms import generic_inlineformset_factory
from django.db.models import IntegerField, Sum, Case, Value, When

from blog.models import Vote

register = template.Library()


@register.inclusion_tag('snippets/__comment-comment-snippet.html')
def comments_on_comments(comments):
	comments = [{'comment':comment,'votes': count_votes(comment)} for comment in comments]
	return {
		"comments": comments,
		"vote_form":create_vote_form_class()()
	}

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



