from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, AbstractUser

class MyAccountManager(BaseUserManager):
	def create_user(self, firstname, lastname, email, username, password=None):
		if not firstname:
			raise ValueError('Users must have first names')
		if not lastname:
			raise ValueError('Users must have last names')
		if not email:
			raise ValueError('Users must have emails')
		if not username:
			raise ValueError('Users must have usernames')

		user = self.model(
			firstname = firstname,
			lastname = lastname,
			email = self.normalize_email(email),
			username = username
		)
		user.set_password(password)
		user.save(using=self.db)
		return user

	def create_superuser(self, email, username, password):
		user = self.create_user(
			email = self.normalize_email(email),
			password = password,
			username = username
			)
		user.is_admin = True
		user.is_staff = True
		user.is_superuser = True
		user.save(using = self.db)
		return user

class Account(AbstractUser):
	email = models.CharField(verbose_name='email', max_length=60, unique=True)
	username = models.CharField(verbose_name='username', max_length=60, unique=True)
	date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
	last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
	is_admin = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)
	firstname = models.CharField(verbose_name='firstname', max_length=60)
	lastname = models.CharField(verbose_name='lastname', max_length=60)

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['firstname', 'lastname', 'username']

	def __str__(self):
    		return self.email

	def has_perms(self, perm, obj=None):
		return self.is_admin
	
	def has_module_perms(self, app_label):
		return True