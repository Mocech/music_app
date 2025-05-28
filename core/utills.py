from django import forms
from django.core.exceptions import ValidationError


#lyrics cleaning
def cleaned_lyrics_text(raw_lyrics):
    lines = [line.strip() for line in raw_lyrics.strip().split('\n') if line.strip()]
    
    return '\n'.join(lines)

#music song clean up

def clean_music_file_audio(raw_music_file):
     # Check if a file was uploaded
            if not raw_music_file:
                raise forms.ValidationError("Please upload a music file.")

            # File size check (50MB = 50 * 1024 * 1024 bytes)
            if raw_music_file.size > 50 * 1024 * 1024:
                raise forms.ValidationError("File size should not exceed 50MB.")

            # File extension/type check
            valid_extensions = ['.mp3', '.wav', '.flac']
            if not any(raw_music_file.name.lower().endswith(ext) for ext in valid_extensions):
                raise forms.ValidationError("Only MP3, WAV, and FLAC files are allowed.")

            return raw_music_file
         
