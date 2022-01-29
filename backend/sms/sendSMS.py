from twilio.rest import Client 
import os
from dotenv import load_dotenv

load_dotenv()


account_sid = os.getenv("account_sid")
auth_token = os.getenv("auth_token")
client = Client(account_sid, auth_token) 


def send(phone, message):
    print("Sending SMS to: " + phone + " with message: " + message)
    message = client.messages.create(  messaging_service_sid='MG6fecada2030f28c4aef97e49d7b8eb3a', 
                                            body=message, 
                                            to=phone) 
    print(message.sid)
