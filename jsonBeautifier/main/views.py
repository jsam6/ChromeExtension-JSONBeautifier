# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

import json, re
import traceback

@csrf_exempt 
# Beautify
def index(request):

    ajax_return = "hello world"

    json_input = request.POST.get("json_input", "")
    # json_input = str(json_input)
    
    try:
        json_obj = json.loads(json_input)
        json_obj = json.dumps(json_obj, sort_keys=True, indent=4)
    # except ValueError as e:
    #     line = re.search(r"line\s(\d)+", str(e))
    #     line = re.sub(r"line ", "", line.group(0))
    #     column = re.search(r"column\s(\d)+", str(e))
    #     column = re.sub(r"column ", "", column.group(0))

    #     json_obj = str(line) + " " + str(column)


    except Exception as e:
        json_obj = str(e)
        # json_obj = traceback.format_exc()
    
    # json_type = type(json_input)
    # json_obj_type = type(json_obj)

    context = {

    }
    return HttpResponse(json_obj)
    # return render(request, "main/popup.html", context)


@csrf_exempt 
# Minify
def minify(request):
    ajax_return = "hello world"

    json_input = request.POST.get("json_input", "")
    # json_input = str(json_input)
    
    try:
        json_obj = json.loads(json_input)
        json_obj = json.dumps(json_obj, separators=(',', ':'))
    except Exception as e:
        json_obj = str(e)
    
    # json_type = type(json_input)
    # json_obj_type = type(json_obj)

    context = {

    }
    return HttpResponse(json_obj)
    # return render(request, "main/popup.html", context)

# json.dumps(json_string, separators=(',', ':'))
