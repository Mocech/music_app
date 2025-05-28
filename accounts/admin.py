from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser  # Link to your custom user model

    # Display columns in user list
    list_display = ('email', 'name', 'is_verified', 'is_staff', 'is_superuser', 'date_joined')
    # Filters available in sidebar
    list_filter = ('is_verified', 'is_staff', 'is_superuser')
    # Searchable fields
    search_fields = ('email', 'name')
    # Default ordering
    ordering = ('-date_joined',)

    # Field layout for viewing/editing users
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('name',)}),
        (_('Permissions'), {'fields': (
            'is_verified', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'
        )}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

    # Field layout for adding new users in admin
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2'),
        }),
    )

    actions = ['verify_users']

    def verify_users(self, request, queryset):
        updated = queryset.update(is_verified=True)
        self.message_user(request, f"{updated} user(s) were successfully marked as verified.")
    verify_users.short_description = "Mark selected users as verified"


admin.site.register(CustomUser, CustomUserAdmin)
