from flask import Flask, request, jsonify
from flask_cors import CORS
from youtube_transcript_api import YouTubeTranscriptApi as yta

app = Flask(__name__)
CORS(app)

@app.route("/")
def get_transcript():
    video_id = request.args.get('video_id', default='97V4BhuN2X8', type=str)
    
    try:
        data = yta.get_transcript(video_id)
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)
