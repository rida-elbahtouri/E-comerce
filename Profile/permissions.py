from rest_framework import permissions

class UpdateOwnData(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        """check user """
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.id==request.user.id