from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# Merchant UPI ID (Replace with your actual UPI ID)
MERCHANT_UPI_ID = "yourupi@upi"

@app.route('/checkout', methods=['POST'])
def checkout():
    data = request.json
    total_amount = sum(item['price'] * item['quantity'] for item in data["cart"])

    # Generate UPI deep link (PhonePe, Google Pay, Paytm support this)
    upi_link = f"upi://pay?pa={MERCHANT_UPI_ID}&pn=AI Restaurant&mc=0000&tid={random.randint(10000,99999)}&tr=TXN{random.randint(10000,99999)}&tn=Food Order&am={total_amount}&cu=INR"

    return jsonify({
        "message": "Redirecting to payment",
        "total_amount": total_amount,
        "payment_link": upi_link
    })

if __name__ == '__main__':
    app.run(debug=True)





