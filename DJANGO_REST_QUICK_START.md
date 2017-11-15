1. Install Django REST framework
	'pip install djangorestframework'
	'pip install markdown'       # Markdown support for the browsable API.
	'pip install django-filter'  # Filtering support

2. Add 'rest_framework' to your INSTALLED_APPS setting.

	ex. INSTALLED_APPS = (
    	...
    	'rest_framework',
		)

3. If you're intending to use the browsable API you'll probably also want to add REST framework's login and logout views. Add the following to your root urls.py file.

	ex. `urlpatterns = [
    	...
    	url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
		]`

4. Anything further can be found at http://www.django-rest-framework.org/#installation		
