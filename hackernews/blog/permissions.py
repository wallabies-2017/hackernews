from rest_framework import permissions

class PostIsOwnerOrReadOnly(permissions.BasePermission):
	'''
	Custom permission to allow owners of a Post object to edit it.
	'''
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		return request.user == obj.posted_by	

class CommentIsOwnerOrReadOnly(permissions.BasePermission):
	'''
	Custom permission to allow owners of a Comment object to edit it.
	'''
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		return request.user == obj.author	

class VoteIsOwnerOrReadOnly(permissions.BasePermission):
	'''
	Custom permission to allow owners of a Vote object to edit it.
	'''
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		return request.user == obj.user	
