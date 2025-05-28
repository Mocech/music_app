from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser


class CustomSignUp(UserCreationForm):
    
   password1 = forms.CharField(required=True, widget=forms.PasswordInput(attrs={
        'id':'password', 'placeholder':'Create a passwordd', 'name':'password' 
    }))
   
   password2 = forms.CharField(required=True, widget=forms.PasswordInput(attrs={
       'id':'confirmPassword', 'placeholder':'Confirm your password', 'name':'confirm-password' 
    }))
   
   class Meta: 
       
        model = CustomUser
        fields = ['email','name','password1','password2']
        
        widgets = {
            'email': forms.EmailInput(attrs={'id':'email', 'placeholder':'Enter your email','name':'email'}),
            'name': forms.TextInput(attrs={'id':'fullname','placeholder':'Enter your full name', 'name':'fullname'}),
        }  
        

    