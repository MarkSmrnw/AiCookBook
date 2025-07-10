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

    msgs_ref = DB.collection("UserChats").document(USERID).collection(CHATID).document("messages")
    msgs = msgs_ref.get()

    if msgs.exists:
        return msgs.to_dict()
    
    return {}

def getUserNotes(USERID:str) -> dict:
    """
    This will return a dict of all notes about the user.
    
    Explination:
    - USERID : The USERID shared in your request."""

    print("User notes memory called")

    mem_ref = DB.collection("UserMemory").document(USERID)
    mem = mem_ref.get()

    if mem.exists:
        print(mem.to_dict())
        return mem.to_dict()
    
    return {}

def setUserNotes(USERID:str, NOTE:str="", NOTES:list[str]=[]) -> bool:
    """
    This will write a note in the users memory.
    Only write notes when you have not added.
    
    Explination:
    - USERID : The USERID shared in your request."""

    print("note down called")

    try:
        mem_ref = DB.collection("UserMemory").document(USERID)
        mem_doc = mem_ref.get()

        if mem_doc.exists:
            data = mem_doc.to_dict()
            print("mem exsists")
        else:
            data = {}
        
        start_index = len(data)

        if not NOTE=="":
            print("single note")
            print(NOTE)

            data[str(start_index)] = NOTE
        elif not NOTES==[]:
            print("MULTIPLE NOTES")
            print(NOTES)

            for i, item in enumerate(NOTES):
                print(item)
                data[str(start_index + i)] = item
        else:
            return False

        print("Finished data: ", data)
        mem_ref.set(document_data=data)
        return True

    except Exception as E:
        print("ERROR in setUserNotes!")
        print(str(E))
        return False
    
def removeUserNotes(USERID:str, INDEX:int, INDEXS:list=[]):
    """
    Removes the note in the memory at the given index
    
    Explimation:
    - USERID : The USERID shared in your request.
    - INDEX : The index for the note that should be removed.
    """

    try:
        mem_ref = DB.collection("UserMemory").document(USERID)
        mem_doc = mem_ref.get()

        if not mem_doc.exists:
            print("No Notes for user\n\n")
            return False
        
        mem = mem_doc.to_dict()
        print("Original MEM", mem)

        notes_list = [(int(k), v) for k, v in mem.items()]
        notes_list.sort(key=lambda x:x[0])

        print("Sorted notes: ", notes_list)

    except Exception as E:
        print("ERROR!")
        print(str(E))
    

if __name__ == "__main__":
    print("FIREBASE DEBUG!")

    #"aCOnIRmhCxbawMjuPcdxHX5UVO72"

    #setUserNotes("aCOnIRmhCxbawMjuPcdxHX5UVO72", NOTES=["dislikes olives", "No Allergies"])
    removeUserNotes("aCOnIRmhCxbawMjuPcdxHX5UVO72", INDEX=1)

    print("loop to keep alive")
    while True:
        time.sleep(1)