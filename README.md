# README #

This README would normally document whatever steps are necessary to get your application up and running.

### Requirements ###

* python on django
* angular 6+

### Set up ###

* Summary of set up
* Configuration:

    Project setup
    
            Custom installation:
            Django:
                -> go into empl dir
                -> python -m virtualenv venv
                -> source venv/bin/activate
                -> pip install -r requirements.txt
                -> configure database name, user, password in redington_uber/settings.py
                    DATABASES = {
                        'default': {
                            'ENGINE': 'django.db.backends.mysql', 
                            'NAME': 'empl',
                            'USER': '<user>',
                            'PASSWORD': '<password>',
                            'HOST': 'localhost',
                            'PORT': '3306',
                        }
                    }
                -> python manage.py migrate
                -> python manage.py runserver 8000
            Angular:  
                -> go into frontend dir
                -> npm install
                -> ng serve
                       
* Integrations
        
            Deployment to django folder:
            -> go to frontend
            -> run deploy.sh
        
   
* Project Structure
    - empl
    - account
    - department
    - employee
    - fieldkeys
    - frontend
    - media
    - static
    - templates


