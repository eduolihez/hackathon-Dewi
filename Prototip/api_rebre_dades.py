# api_flask.py

from flask import Flask, request, jsonify # type: ignore
from datetime import datetime

from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ➤ AIXÒ permet que la teva app Next.js accedeixi a l'API


# Guardarem l'ultima dada rebuda
dades_rebudes = []

@app.route('/')
def index():
    return "API Arduino activa! Usa /dades amb POST per enviar dades."

@app.route('/dades', methods=['POST'])
def rebre_dades():
    try:
        data = request.get_json()

        # Afegim data de recepció
        data['timestamp'] = datetime.utcnow().isoformat()

        # Afegim les dades a la llista (últimes 100 només)
        dades_rebudes.append(data)  # AQUI es guarden
        if len(dades_rebudes) > 100:
            dades_rebudes.pop(0)

        print("📥 Dades rebudes:", data)
        return jsonify({"status": "ok", "rebudes": data}), 200

    except Exception as e:
        return jsonify({"status": "error", "missatge": str(e)}), 400

@app.route('/dades', methods=['GET'])
def obtenir_dades():
    return jsonify(dades_rebudes[-10:]), 200  # últimes 10 dades

if __name__ == '__main__':
    app.run(debug=True, port=5000)

"""
API local que rep dades des del Python que llegeix l'Arduino.

- Rep peticions POST amb dades com litres, temperatura o cabal.
- Mostra les dades rebudes per consola.
- Serveix per fer proves i enviar dades després a una app.

URL per enviar dades: http://localhost:5000/dades

# python api_rebre_dades.py
"""

