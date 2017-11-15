from hackernews.settings import *

MIDDLEWARE += [
    'utils.middleware.FlushWare',
]

LOGIN_SUCCESS_URL = '/'