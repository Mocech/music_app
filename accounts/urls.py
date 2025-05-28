from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('signup/',views.Register_view,name='register'),
    path('login/',views.Login_view,name='login'),
    path('logout/',views.Logout_view,name='logout'),
    path('profile/',views.profile_view,name='profile'),
]