from rest_framework import serializers
from .models import User, Team, Activity, Workout, Leaderboard
from bson import ObjectId


class ObjectIdField(serializers.Field):
    """Custom field to handle MongoDB ObjectId serialization"""
    def to_representation(self, value):
        return str(value)
    
    def to_internal_value(self, data):
        try:
            return ObjectId(data)
        except Exception:
            raise serializers.ValidationError('Invalid ObjectId')


class TeamSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    
    class Meta:
        model = Team
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())
    
    class Meta:
        model = User
        fields = '__all__'
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.team_id:
            data['team'] = str(instance.team_id)
        return data


class ActivitySerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = Activity
        fields = '__all__'
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.user_id:
            data['user'] = str(instance.user_id)
        return data


class WorkoutSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    
    class Meta:
        model = Workout
        fields = '__all__'


class LeaderboardSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())
    
    class Meta:
        model = Leaderboard
        fields = '__all__'
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.team_id:
            data['team'] = str(instance.team_id)
        return data
