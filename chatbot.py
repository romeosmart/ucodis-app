# chatbot.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permet à Node.js d'accéder à Flask depuis un autre port

@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.json
    message = data.get("message", "").lower()
    reply = ""

    # Réponses automatiques simples
    if "dynamic" in message or "prix" in message:
        reply = "Le prix de Boissons Dynamic est : 2.5€ l'unité, 24€ le carton."
    elif "commandé" in message or "commande" in message:
        return jsonify({"replyType": "commande"})
    elif "bonjour" in message or "salut" in message:
        reply = "Bonjour ! 😊 Comment puis-je vous assister aujourd'hui ?"
    elif "contact" in message:
        reply = "Vous pouvez nous contacter au : +261 33 26 868 15 📞"
    else:
        reply = "Merci pour votre message ! Notre équipe vous répondra dans les plus brefs délais."

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000, debug=True)
