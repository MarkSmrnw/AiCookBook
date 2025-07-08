import os
import firebase_admin

from firebase_admin import credentials, firestore, db

CRED = credentials.Certificate(os.path.abspath("C:/FirebaseSecret/aicookbook-c4b94-firebase-adminsdk-fbsvc-f075cd8beb.json"))

def getAllChats(userID:str):
    ...