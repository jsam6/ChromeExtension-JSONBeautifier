from django.conf.urls import url, include
from . import views

urlpatterns = [
 	# url(r'^index/', views.index, name="index"),
 	url(r'^$', views.index, name="main-index"),
 	url(r'^minify/$', views.minify, name="main-minify"),
]