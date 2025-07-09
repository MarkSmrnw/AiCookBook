import os
import time
import firebase_admin

from firebase_admin import credentials, firestore

CRED = credentials.Certificate(os.path.abspath("C:/FirebaseSecret/aicookbook-c4b94-firebase-adminsdk-fbsvc-f075cd8beb.json"))
firebase_admin.initialize_app(CRED)

DB = firestore.client()

def getUserPreferences(USERID:str=None) -> dict:
    """
    This will return a dictionary of the Users preferences / allergies currently known.


    """

def getUserPreferedLanguage(USERID:str) -> str:
    """
    This will return a string of the users prefered language as a String

    If the user has no set language, it will default to english.
    
    Explination:
    - USERID : The USERID shared in your request."""

    settings_ref = DB.collection("UserSettings").document(USERID)
    settings = settings_ref.get()

    if settings.exists:
        print("Found user prefered language. ", settings.to_dict()["language"])
        return settings.to_dict()["language"]
    else:
        return "english"
    
def getUserPreferedNickname(USERID:str) -> str | None:
    """
    This will return the nickname the user wants to be called by.
    
    Explination:
    - USERID : The USERID shared in your request."""

    settings_ref = DB.collection("UserSettings").document(USERID)
    settings = settings_ref.get()

    if settings.exists:
        print("Found user prefered language. ", settings.to_dict()["name"])
        return settings.to_dict()["name"]
    else:
        return None

def getChatHistory(USERID:str, CHATID:str) -> dict:
    """
    This will return all previously send messages inside of the chat.
    The messages from the user will start with 'USER'
    The AI's messages will start with 'YOU'

    The messages are chronologically sorted, from oldest to newest.
    
    Explination:
    - USERID : The USERID shared in your request.
    - CHATID : The CHATID shared in your request."""

    print("CHAT HISTORY!")
    print(USERID)
    print(CHATID)

    r = {
            1:"USER >> Hallo!",
            2:"YOU >> Hallo Mark! Lass uns was zusammen kochen! Kannst du mir kurz von deinen Allergien erzählen, was du nicht essen kannst?",
            3:"USER >> Nur Erdnüsse, das wars.",
            4:"YOU >> Alles klar! Hast du eine idee was es heute so zu essen geben könnte?"
        }
    
    return r

if __name__ == "__main__":
    print("FIREBASE DEBUG!")

    #getUserPreferedLanguage("aCOnIRmhCxbawMjuPcdxHX5UVO72")
    getChatHistory("aCOnIRmhCxbawMjuPcdxHX5UVO72", "Chat1")

    print("loop to keep alive")
    while True:
        time.sleep(1)