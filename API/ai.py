import os
import flask
import dotenv

import aitools

from flask import request, jsonify, Flask
from flask_cors import CORS

from google import genai

dotenv.load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

MASTER_PROMPT = """
Your name is 'cook.ai'. Your main objective is to deliver recipes to the user wich are adapted to the users preferences or alergies.

Aim to be respectful to the user and to adapt all responses to be adjusted to the users liking.

Tools:

You are not currently in posession of any tools.

Rules:
    - Be nice, no matter what."""

client = genai.Client()
flaskclient = Flask(__name__)
CORS(flaskclient)

@flaskclient.route("/test", methods=["POST"])
def thisisatest():
    try:
        if request.is_json:
            print("ISJSON")
            data = request.get_json()

            print(data)

            if data["prompt"]:
                print("HAS PROMPT")

                response = client.models.generate_content(
                    model="gemini-2.5-flash", contents=data["prompt"]
                )
                print(response.text)
                return jsonify({"response":response.text}), 200
            
            else:
                return jsonify({"error":"No prompt"}), 403
        else:
            return jsonify({"error":"No valid JSON"}), 403 
    
    except Exception as E:
        print(str(E))
        return jsonify({"error":str(E)}), 500
    
@flaskclient.route("/ping")
def sendlivesignal():
    return jsonify({"message":"I am alive!"}), 200
    
def run():
    flaskclient.run(debug=False, host="0.0.0.0", port=6969)

if __name__ == "__main__":
    run()