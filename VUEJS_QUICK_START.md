## Adding Utils and Public
- in your project root create a directory named `utils` and a directory named `public`


## Utils

- in the `utils` folder create a file `middleware.py`
- in `middleware.py` add this code
```py
import sys


from django.utils.deprecation import MiddlewareMixin



class FlushWare( MiddlewareMixin ):
    def process_response( self, request, response ):
        sys.stdout.flush()
        sys.stderr.flush()
        return response

```


## Settings Adjustments

- create `dev_settings.py` next to your other settings file
- in `dev_settings.py` import all your settings from your settings file
- modify the MIDDLEWARE setting in your dev_settings file adding the middleware 
we just created to the list.
- `dev_settings.py` should look like this
```py
from hackernews.settings import *

MIDDLEWARE += [
    'utils.middleware.FlushWare',
]
```

## Update manage.py to use dev_settings.py


- now go into your manage.py file and adjust the settings file specified there
- change this
```py
# manage.py
if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hackernews.settings")
```
- to this
```py
# manage.py
if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hackernews.dev_settings")
```
- all we changed was the name of the settings module to use. From `"hackernews.settings"` to `"hackernews.dev_settings"`
- also add this to the bottom of manage.py
```py
    execute_from_command_line(sys.argv)
    # Add the following lines.
    sys.stdout.flush()
    sys.stderr.flush()
```
- this allows us to see any inital errors that occur on boot up(Hopefully).

- we did all of this so that we can see the error messages from django in the terminal

## Create Your Vuejs App

- now cd into your `public` directory
- create vue template in `public` directory
    `vue init wallabies-2017/django-webpack-simple`
- tell vue the relative path to manage.py

- run `npm install` to download the necessary packages
- use `npm run dev` to run your project
- we no longer need to run `python3 manage.py runserver`. That is taken care of for us.
