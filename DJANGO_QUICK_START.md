### Django Start Guide

1. Navigate to the directory you would like to create a django project in.

2. Create a virtual environment.
	
	* `virtualenv env -p python3`

3. Activate your newly created virtual environment.
	
	* `source env/bin/activate`

4. Install django and all of its dependencies using `django-toolbelt`.  
	
	* `pip3 install django-toolbelt`

5. (new) Store your projects requirements in a file call `requirements.txt`.
	
	* `pip3 freeze > requirements.txt`

6. Create a django project using `django-admin`.
	
	* `django-admin startproject <name of project> [<directorey to create project in>]`
	
	ex. `django-admin startproject blog`

7. Create a local_settings.py file next to your settings file.
	
	* `touch <name of project>/local_settings.py`
	
	Put private/local settings values in this file like your `SECRET_KEY`

8. Create a local_settings.py.md file next to your settings file.
	
	* `touch <name of project>/local_settings.py.md`
	
	This file should mirror your `local_settings.py` file without the values.

9. Import `local_settings.py` into `settings.py`. Once the private/local values have been moved to the 
local_settings.py` file modify your settings file to import the local_settings file. Adding a line like 
the following should do the trick.

	* `from <project name>.local_settings import *`

	ex. `from blog.local_settings import *`



__Notes:__  
* Once you have created your project use the projcet's `manage.py` file to create new apps for the project.
* `requirements.txt` should be at the same level as `manage.py`(in your project's root) or at the same level as your projects root directory
* Using the `which` command on `python3` or `pip3` should print the path to your `env` folder.  
