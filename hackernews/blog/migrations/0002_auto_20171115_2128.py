# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-15 21:28
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='updated_at',
            field=models.DateTimeField(default=datetime.datetime(2017, 11, 15, 21, 28, 37, 978568, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='post',
            name='updated_at',
            field=models.DateTimeField(default=datetime.datetime(2017, 11, 15, 21, 28, 47, 974766, tzinfo=utc)),
            preserve_default=False,
        ),
    ]