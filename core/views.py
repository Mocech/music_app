from django.shortcuts import render, redirect, get_object_or_404
from .forms import AddMusic
from .models import Music
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from random import sample
from django.db.models import Q

def home_view(request):
    
    featured = list(Music.objects.filter(featured=True))
    
    if not featured:
        messages.error(request, "No featured songs available at the moment.")
    if len(featured) > 6:
     featured = sample(featured, 6)
     
    return render(request,'index.html',{'featured_songs':featured})

@login_required
def AddMusic_view(request):
    if request.method == 'POST':
      form = AddMusic(request.POST,request.FILES)
      if form.is_valid():
          new_music_instance = form.save(commit=False)
          new_music_instance.owner = request.user
          new_music_instance.save()
          messages.success(request,'Song has been successifully added')
          return redirect('core:home')
      else:
          messages.error(request,'Please correct the errors below') 
          
      
    else:
        form = AddMusic()
        
    return render(request,'AddMusic.html',{'form':form})    
            
           


def browse_music_view(request):
    category = request.GET.get('genre')
    search = request.GET.get('search')

    # Start with all Music objects
    music_qs = Music.objects.all()

    # Filter by genre if category is provided
    if category:
        music_qs = music_qs.filter(genre=category)

    # Filter by search term if provided (searching in title or artist)
    if search:
        music_qs = music_qs.filter(
            Q(music_title__icontains=search) |
            Q(artist_name__icontains=search)
        )

    context = {
        'form': music_qs,
        'selected_genre': category,
        'genre_choices': Music.GENRE_CHOICES,
        'search_term': search or '',
    }
    return render(request, 'browse.html', context)

          
def single_music_view(request, pk):
    
    song = get_object_or_404(Music,pk=pk)
    related_songs = list(Music.objects.filter(owner=song.owner).exclude(pk=song.pk))
    
    if len(related_songs) > 3:
     related_songs = sample(related_songs, 3)
     
    context ={
        'form':song,
        'related_songs':related_songs
    }
    
    return render(request,'single_music.html',context)