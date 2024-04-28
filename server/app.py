from flask import Flask, request, jsonify
from flask_cors import CORS
from youtube_transcript_api import YouTubeTranscriptApi as yta
import google.generativeai as genai




from flask import Flask,request,jsonify
from flask_cors import CORS
from flask_pymongo import pymongo
import easyocr
import base64
from datetime import datetime
from bson.objectid import ObjectId

app=Flask(__name__)

CORS(app)
client = pymongo.MongoClient('mongodb+srv://mprsem6:'+'mprsem6'+'@cluster0.ph8rdne.mongodb.net/')
db = client.get_database('MPRSEM6')
user_collection = pymongo.collection.Collection(db, 'user_collection')

@app.route("/")
def get_transcript():
    video_id = request.args.get('video_id', default='97V4BhuN2X8', type=str)
    try:
        data = yta.get_transcript(video_id)
        print(video_id)
        transcript = ""
        for value in data:
            for key, val in value.items():
                if key == "text":
                    transcript += val
        
        print(transcript)
        return jsonify({
            'text': transcript
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 400





@app.route("/signup", methods=['POST'])
def signup():
    body=request.json
    fname=body.get('fname')
    lname=body.get('lname')
    phone=body.get('phone')
    email=body.get('email')
    password=body.get('password')

    collegename=body.get('collegename')
    branch=body.get('branch')
    rollno=body.get('rollno')
    prn=body.get('prn')
    collegeemail=body.get('collegeemail')

    sem1=body.get('sem1')
    sem2=body.get('sem2')
    sem3=body.get('sem3')
    sem4=body.get('sem4')
    sem5=body.get('sem5')
    sem6=body.get('sem6')
    sem7=body.get('sem7')
    sem8=body.get('sem8')

    linkedin=body.get('linkedin')
    github=body.get('github')
    codechef=body.get('codechef')
    codeforces=body.get('codeforces')
    leetcode=body.get('leetcode')
    discord=body.get('discord')
    date=datetime.now().date()

    try:
        db['student'].create_index([('phone', pymongo.ASCENDING)], unique=True)
        result = db['student'].insert_one({
            "fname":fname,
            "lname":lname,
            "phone":phone,
            "email":email,
            "password":password,
            "collegename": collegename,
            "branch": branch,
            "rollno": rollno,
            "prn": prn,
            "collegeemail": collegeemail,
            "sem1": sem1,
            "sem2": sem2,
            "sem3": sem3,
            "sem4": sem4,
            "sem5": sem5,
            "sem6": sem6,
            "sem7": sem7,
            "sem8": sem8,
            "linkedin": linkedin,
            "github": github,
            "codechef": codechef,
            "codeforces": codeforces,
            "leetcode": leetcode,
            "discord": discord
        })
        return jsonify({
            'status': 'Success',
            "inserted_id":str(result.inserted_id)
        })
    except Exception as e:
        print(e)
        return jsonify({
            'status': 'Error occurred'
        })
    

@app.route("/login", methods=['POST'])
def login():
    try:
        body=request.json
        email=body.get('email')
        password=body.get('password')
        # print(phone)

        result_student = db['student'].find_one({'email': email})

        if (result_student['password']==password):
            id = str(result_student['_id'])
            return jsonify({
                'id':id,
                'status':'userFound',
                "email":email
            })
        else:
            return jsonify({
                'status':'userNotFound'
            })
    except Exception as e:
        print(e)
        return jsonify({
            'status': 'Error occurred'
        })

# Get individual Medical Personnel Details, CURRENTLY NOT REQD
@app.route("/getStudent/<id>",methods=['GET'])
def get_one_stud(id):
    # try:
        id_obj = ObjectId(id)
        stud=db['student'].find_one({'_id': id_obj})
        fname=stud['fname']
        lname=stud['lname']
        phone=stud['phone']
        email=stud['email']
        collegename=stud['collegename']
        branch=stud['branch']
        rollno=stud['rollno']
        prn=stud['prn']
        collegeemail=stud['collegeemail']
        sem1=stud['sem1']
        sem2=stud['sem2']
        sem3=stud['sem3']
        sem4=stud['sem4']
        sem5=stud['sem5']
        sem6=stud['sem6']
        sem7=stud['sem7']
        sem8=stud['sem8']
        github=stud['github']
        linkedin=stud['linkedin']
        codechef=stud['codechef']
        codeforces=stud['codeforces']
        leetcode=stud['leetcode']
        discord=stud['discord']
        
        return jsonify({
            "fname":fname,
            "lname":lname,
            "phone":phone,
            "email":email,
            "collegename": collegename,
            "branch": branch,
            "rollno": rollno,
            "prn": prn,
            "collegeemail": collegeemail,
            "sem1": sem1,
            "sem2": sem2,
            "sem3": sem3,
            "sem4": sem4,
            "sem5": sem5,
            "sem6": sem6,
            "sem7": sem7,
            "sem8": sem8,
            "linkedin": linkedin,
            "github": github,
            "codechef": codechef,
            "codeforces": codeforces,
            "leetcode": leetcode,
            "discord": discord
        })
    # except:
    #     return jsonify({
    #         'status':'Student not found'
    #     })

@app.route("/timetable", methods=['POST'])
def timetable():
    try:
        request_data = request.get_json()
        image_data_base64 = request_data['image']  # assuming image data is sent as base64 encoded string
        
        image_data_bytes = base64.b64decode(image_data_base64)
        
        reader = easyocr.Reader(['en'])
        result = reader.readtext(image_data_bytes)
        count = 0
        for (bbox, text, prob) in result:
            print(f'{text} ', end="")
            count += 1
            if count % 7 == 0:
                print()
        # for (bbox, text, prob) in result:
            # print(f'{text}',end="")
            # print(text+" ",end="")

        return jsonify({
            'status': 'Image received and processed successfully'
        })
    except Exception as e:
        # print(e)
        return jsonify({
            'status': 'Error occurred while processing the image'
        })

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=3001)