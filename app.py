from flask import Flask, jsonify, render_template, request
import json
import pickle
import numpy as np

# Flask setup
app = Flask(__name__)

# Load the prediction model
model = pickle.load(open('static/ml_model/lr.pkl','rb'))

#################################################
# Routes
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route('/api', methods=['POST','GET'])
def predict():
    #make a new prediction 
    if request.method == "POST":
        data = request.get_json()
        data_list = list(data.values())
        new_data = np.array(data_list).reshape((1, -1))
        prediction = (model.predict(new_data))
        prediction_list = np.array(prediction).tolist()
        prediction_value = round(prediction_list[0][0],2)
        return jsonify(prediction_value)

    else: 
        return jsonify("no data")

if __name__ == "__main__":
    app.run(port=9999, debug=True)
