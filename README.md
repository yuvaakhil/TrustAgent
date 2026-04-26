```markdown
# 📄 TrustAgent – AI-Based Secure Document Sharing System

## 🔐 Overview

TrustAgent is an AI-powered secure document management and sharing system built using a Telegram Bot interface.

It allows users to:
- Upload documents
- Detect document type using AI + OCR
- Store files securely on IPFS
- Anchor proof on blockchain
- Generate time-limited secure links with QR codes

The system ensures tamper-proof verification, secure sharing, and intelligent document handling.

---

## 🚀 Features

- 📤 Upload documents via Telegram  
- 🤖 AI-based document type detection (OCR + Classification)  
- 🧠 Intelligent intent detection (Agentic behavior)  
- ☁️ Secure storage using IPFS  
- ⛓ Blockchain anchoring using Stellar  
- 🔐 Time-limited secure share links  
- 📷 QR code generation  
- 🗑 Document deletion  
- 📂 View stored documents  
- 🛡 Tamper-proof verification via blockchain hash  

---

## 🧠 How It Works

1. User uploads document via Telegram bot  
2. OCR extracts text  
3. AI classifier detects document type  
4. File uploaded to IPFS  
5. CID anchored to Stellar blockchain  
6. Metadata stored in MongoDB  
7. Secure expiring link generated  
8. QR code generated  

---

## 🏗 Architecture

User (Telegram)  
⬇  
Telegraf Bot (Node.js)  
⬇  
Express Backend API  
⬇  
OCR + AI Classification  
⬇  
IPFS (Pinata)  
⬇  
Stellar Blockchain  
⬇  
MongoDB  

---

## 🛠 Technologies Used

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  

### AI & Processing
- OCR  
- AI Classification  
- Intent Detection Agent  

### Storage
- IPFS (Pinata)  

### Blockchain
- Stellar Network  

### Bot Framework
- Telegraf  

---

## 📂 Project Structure

```

backend/
│
├── agent/
│   └── intentAgent.js
├── db/
│   └── mongo.js
├── models/
│   └── Document.js
├── routes/
│   ├── upload.routes.js
│   ├── share.routes.js
│   ├── delete.routes.js
│   └── update.routes.js
├── services/
│   ├── ocr.service.js
│   ├── classify.service.js
│   ├── ipfs.service.js
│   ├── stellar.service.js
├── utils/
│   └── validateDocType.js
├── bot.js
├── server.js
└── .env

```

---

## 🔑 Environment Variables

Create a `.env` file:

```

TELEGRAM_BOT_TOKEN=your_bot_token
MONGO_URI=your_mongo_uri
PINATA_JWT=your_pinata_jwt
STELLAR_PUBLIC_KEY=your_public_key
STELLAR_SECRET_KEY=your_secret_key

```

---

## ⚙️ Installation

```

git clone [https://github.com/yuvaakhil/TrustAgent.git](https://github.com/yuvaakhil/TrustAgent.git)
cd TrustAgent/backend
npm install

```

---

## ▶️ Run the Project

Start backend:
```

node server.js

```

Start Telegram bot:
```

node bot.js

```

---

## 👨‍💻 Author

**Yuva Akhil Pattela**  
Final Year B.Tech Project
```
