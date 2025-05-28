from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('',views.home_view,name='home'),
    path('newSong/',views.AddMusic_view,name='create'),
    path('songs/',views.browse_music_view,name='browse'),
    path('music/<int:pk>/',views.single_music_view,name='song'),
]