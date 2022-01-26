import os
from flask import Flask, jsonify, request, Response
import flask
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)
cors = CORS(app)

@app.route('/api/predict', methods=['POST'])
def predict():
  try:
    if flask.request.method == 'POST':
      data = request.json['data']
      df = pd.DataFrame(data)

      prediction = model.predict(df)
      prediction = np.absolute(np.rint(prediction))
      
      return jsonify({
          'prediction': list(prediction)
      })
    else:
      return jsonify({
          'status': 'Please send request in POST'
      })

  except Exception as e:
    print('Error serving post request')
    return Response(
      jsonify({
        'status':'error, make sure ur data is in object name data',
        'error': e
      }), 
      status=404, 
      mimetype='application/json'
    )
  
if __name__ == "__main__":
    model = joblib.load('gboostv2.pkl')
    
    osPort = os.getenv("PORT")
    if osPort == None:
        port = 5000
    else:
        port = int(osPort)
    
    app.run(host='0.0.0.0', port=port)
    #app.run(debug=True, port=port)