from django.shortcuts import render
from django.http import HttpResponse
import json
# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from . import mainbot
@csrf_exempt
def index(request):
    if request.method == "GET":
        print("GET REQ INIT")
        return HttpResponse("HELLO THIS IS A RESPONSE")
    elif request.method == "POST":
        val=json.loads(request.body)
        print("POST requested")
        print(val['text'])
        botResponse=mainbot.bot_response(val['text'])
        
        return HttpResponse(botResponse)
        