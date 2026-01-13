from django.core.management.base import BaseCommand
from octofit_tracker.models import Team, User, Activity, Workout, Leaderboard
from django.utils import timezone
from datetime import date
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data (workaround for ObjectIdField hashability issue)
        for model in [Leaderboard, Activity, Workout, User, Team]:
            for obj in model.objects.all():
                obj.delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel)
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc)

        # Create activities
        Activity.objects.create(user=tony, type='Running', duration=30, date=date.today())
        Activity.objects.create(user=steve, type='Cycling', duration=45, date=date.today())
        Activity.objects.create(user=bruce, type='Swimming', duration=60, date=date.today())
        Activity.objects.create(user=clark, type='Yoga', duration=20, date=date.today())

        # Create workouts
        Workout.objects.create(name='Super Strength', description='Strength training for heroes', suggested_for='Marvel')
        Workout.objects.create(name='Flight Training', description='Aerobic and flight skills', suggested_for='DC')

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=150)
        Leaderboard.objects.create(team=dc, points=120)

        # Ensure unique index on email for users
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']
        db.users.create_index([('email', 1)], unique=True)
        self.stdout.write(self.style.SUCCESS('Database populated with test data.'))
