from django.db import models
from django.utils import timezone
from django.contrib.auth.models import UserManager,PermissionsMixin,AbstractBaseUser 


class CustomUserManager(UserManager):
    def _create_user(self,email,password,**extra_fields):
        if not email:
            raise ValueError('You must provide a valid email address') 
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)#instance of CustomUser model above
        user.set_password(password)
        user.save(using=self._db)
        
        return user

    def create_user(self,email,password=None,**extra_fields):   
        extra_fields.setdefault('is_staff',False)
        extra_fields.setdefault('is_superuser', False)
        
        return self._create_user(email,password,**extra_fields) 


    def create_superuser(self,email,password=None,**extra_fields):   
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_verified', True)
       
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        
        return self._create_user(email,password,**extra_fields) 

class CustomUser(AbstractBaseUser,PermissionsMixin):
    

  email = models.EmailField(unique=True,verbose_name='Email Address',null=False,blank=False)
  name = models.CharField(max_length=255, default='', blank=True)

  
  is_verified = models.BooleanField(default= True)
  is_active = models.BooleanField(default=True)
  is_superuser = models.BooleanField(default=False)
  is_staff = models.BooleanField(default=False)
  
  date_joined = models.DateTimeField(default=timezone.now)
  last_login = models.DateTimeField(blank=True,null=True) 

  
  objects = CustomUserManager() 
  
  
  USERNAME_FIELD ='email'
  EMAIL_FIELD = 'email'
  REQUIRED_FIELDS = []
  

