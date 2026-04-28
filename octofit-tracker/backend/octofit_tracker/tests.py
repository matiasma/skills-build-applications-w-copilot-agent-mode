
from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse

class APITestCase(TestCase):
	def setUp(self):
		self.client = APIClient()

	def test_api_root(self):
		response = self.client.get(reverse('api-root'))
		self.assertEqual(response.status_code, 200)

	def test_users_endpoint(self):
		response = self.client.get(reverse('user-list'))
		self.assertEqual(response.status_code, 200)

	def test_teams_endpoint(self):
		response = self.client.get(reverse('team-list'))
		self.assertEqual(response.status_code, 200)

	def test_activities_endpoint(self):
		response = self.client.get(reverse('activity-list'))
		self.assertEqual(response.status_code, 200)

	def test_leaderboard_endpoint(self):
		response = self.client.get(reverse('leaderboard-list'))
		self.assertEqual(response.status_code, 200)

	def test_workouts_endpoint(self):
		response = self.client.get(reverse('workout-list'))
		self.assertEqual(response.status_code, 200)
