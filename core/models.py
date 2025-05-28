from django.db import models
from django.contrib.auth import get_user_model
from mutagen.mp3 import MP3
from mutagen.easyid3 import EasyID3
import datetime



User = get_user_model()

class Music(models.Model):
    
    GENRE_CHOICES = [
    ("pop", "Pop"),
    ("hip-hop", "Hip Hop"),
    ("rnb", "R&B"),
    ("rock", "Rock"),
    ("afrobeat", "Afrobeat"),
    ("reggae", "Reggae"),
    ("electronic", "Electronic"),
    ("indie", "Indie"),
    ("gospel", "Gospel"),
    ("worship", "Worship"),
    ("christian-hiphop", "Christian Hip Hop"),
    ("praise", "Praise"),
    ("other", "Other"),
]
    music_title = models.CharField(max_length=255,blank=False)
    artist_name =  models.CharField(max_length=255,blank=False)
    genre = models.CharField(max_length=100,choices=GENRE_CHOICES, default='worship')
    album_name = models.CharField(max_length=100,blank=True)
    music_description = models.TextField(blank=False)
    tags = models.CharField(max_length=255,blank=False)
    music_file = models.FileField(blank=False,upload_to='media/music', default='music.mp3')
    up_loaded_at = models.DateTimeField(auto_now_add=True)
    duration = models.DurationField(null=True, blank=True)
    quality = models.CharField(max_length=50, null=True, blank=True)
    lyrics = models.TextField(blank=True)
    owner = models.ForeignKey(User,on_delete=models.CASCADE)
    featured = models.BooleanField(default=False,blank=True)
   

    def __str__(self):
     return f"{self.music_title} by {self.artist_name}"


    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Save first to have file path

        if self.music_file and self.music_file.path.endswith('.mp3'):
            audio = MP3(self.music_file.path, ID3=EasyID3)

            # Duration
            total_seconds = int(audio.info.length)
            self.duration = datetime.timedelta(seconds=total_seconds)

            # Quality (bitrate)
            if audio.info.bitrate:
                self.quality = f"{int(audio.info.bitrate / 1000)} kbps MP3"

            # Save updated fields
            super().save(update_fields=['duration', 'quality'])