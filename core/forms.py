from django import forms
from .models import Music
from .utills import cleaned_lyrics_text,clean_music_file_audio

class AddMusic(forms.ModelForm):
    
    
        class Meta:
          model = Music
          fields = ['music_title','lyrics','artist_name','genre','album_name','music_description','tags','music_file']
          
          widgets = {
              
              'music_title':forms.TextInput(attrs={
                 'id':'title','placeholder':'Enter song title','name':'title' 
              }),
              'artist_name':forms.TextInput(attrs={
                 'id':'artist','placeholder':'Enter artist name','name':'artist' 
              }),
             'genre':forms.Select(attrs={
                 'id':'genre','name':'genre' 
              }),
             'tags':forms.TextInput(attrs={
                 'id':'tags','placeholder':'Add tags separated by commas (e.g., chill, upbeat, instrumental)','name':'tags' 
              }),
             'music_file':forms.FileInput(attrs={
                 'id':'music-file','name':'music-file','label':'Browse'
              }),
             'album_name':forms.TextInput(attrs={
                 'id':'album','name':'album','placeholder':'Enter album name (optional)'
              }),
             'music_description':forms.Textarea(attrs={
                 'id':'description','placeholder':'Tell us about your music... (optional)','name':'description','rows':"4" 
              }),
             'lyrics':forms.Textarea(attrs={
                 'id':'lyrics','rows':'12',
                 'placeholder': """Enter your song lyrics here...

                            Verse 1:
                            Your lyrics go here
                            Line by line

                            Chorus:
                            Your chorus lyrics

                            Verse 2:
                            More lyrics..."""

              }),
          }
          
        def clean_music_file(self):
            music_file = self.cleaned_data.get('music_file')

            return clean_music_file_audio(music_file)
        
        def clean_lyrics(self):
            raw_lyrics = self.cleaned_data.get('lyrics')
          
            return cleaned_lyrics_text(raw_lyrics)
            
            
                