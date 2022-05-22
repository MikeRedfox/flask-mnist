# Flask imports
from flask import Flask, render_template, request, redirect, url_for, jsonify

# Model imports
import numpy as np
from PIL import Image
import cv2
import tensorflow as tf

# decode image import
import base64
import os
import re
from io import StringIO, BytesIO

import uvicorn

app = Flask(__name__)

ris = [""]


@app.route("/hook", methods=["POST", "GET"])
def get_image():

    if request.method == "POST":
        data_url = request.values["imageBase64"]
        offset = data_url.index(",") + 1
        img_bytes = base64.b64decode(data_url[offset:])
        img = Image.open(BytesIO(img_bytes))
        img = np.array(img)
        res = cv2.resize(img, dsize=(28, 28), interpolation=cv2.INTER_CUBIC)
        img = res[:, :, 0]
        img = np.invert(np.array([img]))
        model = tf.keras.models.load_model("mnist")
        prediction = np.argmax(model.predict(img))
        ris[0] = str(prediction)
        return ""
    else:
        message = {"result": ris[0]}
        return jsonify(message)


@app.route("/")
def canvas():
    return render_template("base.html")


if __name__ == "__main__":
    app.run(debug=True)
