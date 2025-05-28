from django.shortcuts import render,redirect
from .forms import CustomSignUp
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required

def Register_view(request):
    if request.method == 'POST':
        form = CustomSignUp(request.POST)
        
        if form.is_valid():
            form.save()
            messages.success(request,"Your account has been created successifully")
            return redirect('accounts:login')
        else:
            print(form.errors)

    else:
        form = CustomSignUp()
    return render(request,'accounts/signup.html',{'form':form})    


def Login_view(request):
    if request.method == 'POST':
        
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        user = authenticate(request, email=email, password = password)
        
        if user is not None :
          login(request,user)
          messages.success(request,"Your have logged in successifully")
          return redirect('core:home')
        else:
          
            messages.error(request,"Invalid login credentials") 
            return render(request, 'accounts/login.html', {'email': email})
    else:
        print('invalid')
        return render(request,'accounts/login.html' )   
            
def Logout_view(request):
    logout(request)
    messages.info(request,"You have logged out successifully")
    return redirect('accounts:login')  

@login_required
def profile_view(request):
          return render(request,'accounts/profile.html',{})    