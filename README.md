# 🚀 Quickcrypt

Quickcrypt is a crypto trading simulator that allows users to place simulated buy/sell orders for various cryptocurrencies like BTC/USDT. It fetches real-time market prices, simulates order placement, shows open orders and order history—mimicking the functionality of modern exchanges like CoinDCX.


## 🔗 Live Demo

🌐 **[Try Quickcrypt Live](https://quickcrypt.netlify.app/)**

---

## 🎥 Demo Video

📺 **[Watch the Demo Video](https://drive.google.com/file/d/11pJR0FtC1hJOnBiEsB8APBJRa4ZBg8xq/view?usp=sharing)**

---

## ✨ Features

- 🟢 Real-time BTC/USDT price display
- 🛒 Place simulated buy/sell orders
- 📋 View Open Orders and cancel them
- 🕓 Order History with status tracking
- 🧾 Tabbed UI similar to CoinDCX
- 📱 Fully responsive
- 🔐 Users input API key and Secret key on login
- 🔓 API key and Secret key are deleted from database on logout

---

## 🛠️ How It Works
### 🔐 Test Credentials (For Demo Purposes) 
- **COINDCX_API_KEY** = "6e9bcb7bdd30c71d1117a0fa02b53982d4a0334efdebd416"
- **COINDCX_API_SECRET** = "c0e1c459bc3e6d5851677acc825c604475fc008f75d7ea8dacee9f6ced1f662a"

----

### ⚙️ App Functionality
- Fetches current price of BTC/USDT using the CoinDCX API
- Users log in and provide their CoinDCX API key and secret key
- Keys are securely stored in Firestore during the session
- Users can place simulated buy/sell orders, stored in the backend
- Orders are separated into Open Orders and Order History
- Canceling an order removes it from Open Orders
- Logging out securely deletes the user's API key and secret key from Firestore

---

## 📦 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **APIs:** CoinDCX
- **UI Libraries:** Shadcn/UI or custom Tailwind components
- **Auth and Database:** Firebase Authentication and Firestore Database

---



## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/devendra0704/QuickCrypt
cd quickcrypt
```
