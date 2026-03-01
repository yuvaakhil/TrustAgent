
📄 TrustAgent – AI-Based Secure Document Sharing System

🔐 Overview

TrustAgent is an AI-powered secure document management and sharing system built using a Telegram Bot interface.
It allows users to upload documents, automatically detect document type using AI + OCR, store files securely on IPFS, anchor proof on blockchain, and generate time-limited secure access links with QR codes.

The system ensures tamper-proof verification, secure sharing, and intelligent document handling.


---

🚀 Features

📤 Upload documents via Telegram

🤖 AI-based document type detection (OCR + Classification)

🧠 Intelligent intent detection (Agentic behavior)

☁️ Secure storage using IPFS

⛓ Blockchain anchoring using Stellar

🔐 Time-limited secure share links

📷 QR code generation for easy access

🗑 Document deletion

🧾 Automatic or manual document naming

📂 View stored documents

🛡 Tamper-proof verification via blockchain hash



---

🧠 How It Works

1. User uploads document via Telegram bot


2. OCR extracts text from document


3. AI classifier detects document type


4. File is uploaded to IPFS


5. CID is anchored to Stellar blockchain


6. Metadata is stored in MongoDB


7. Secure expiring link is generated


8. QR code is generated for easy access




---

🏗 Architecture

User (Telegram)
⬇
Telegraf Bot (Node.js)
⬇
Express Backend API
⬇
OCR Service + AI Classification
⬇
IPFS (Pinata) Storage
⬇
Stellar Blockchain (Transaction Anchor)
⬇
MongoDB (Metadata Storage)


---

🛠 Technologies Used

Backend

Node.js

Express.js

MongoDB

Mongoose


AI & Processing

OCR (Text extraction)

AI Classification Service

Intent Detection Agent


Storage

IPFS (via Pinata)


Blockchain

Stellar Network

Blockchain transaction anchoring


Bot Framework

Telegraf (Telegram Bot API)


Other Tools

Axios

Multer

QRCode

dotenv



---

📂 Project Structure

backend/
│
├── agent/
│   └── intentAgent.js
│
├── db/
│   └── mongo.js
│
├── models/
│   └── Document.js
│
├── routes/
│   ├── upload.routes.js
│   ├── share.routes.js
│   ├── delete.routes.js
│   └── update.routes.js
│
├── services/
│   ├── ocr.service.js
│   ├── classify.service.js
│   ├── ipfs.service.js
│   ├── stellar.service.js
│
├── utils/
│   └── validateDocType.js
│
├── bot.js
├── server.js
└── .env


---

🔑 Environment Variables

Create a .env file:

TELEGRAM_BOT_TOKEN=your_bot_token
MONGO_URI=your_mongo_uri
PINATA_JWT=your_pinata_jwt
STELLAR_PUBLIC_KEY=your_public_key
STELLAR_SECRET_KEY=your_secret_key


---

⚙️ Installation

git clone https://github.com/yourusername/trustagent.git
cd trustagent/backend
npm install


---

▶️ Run the Project

Start backend:

node server.js

Start Telegram bot:

node bot.js


---

🔐 Security Model

Files stored on IPFS (decentralized storage)

Only CID hash anchored on blockchain

Secure expiring links

No public permanent URL

Tamper detection via blockchain verification

MongoDB stores only metadata



---

🧠 Why It Is Agentic AI

TrustAgent qualifies as Agentic AI because:

It detects user intent

It decides workflow dynamically

It processes documents autonomously

It triggers multiple services automatically

It handles fallback cases (unknown document type)

It interacts conversationally



---

📊 Use Cases

Secure academic document sharing

Government ID verification

Resume sharing with time limits

Gate pass systems

Enterprise document access control

Tamper-proof document validation



---

🔮 Future Scope

Web dashboard interface

Multi-platform support (WhatsApp integration)

Biometric verification

Encryption before IPFS upload

AI fraud detection

Document watermarking



---

🎯 Conclusion

TrustAgent combines AI, blockchain, decentralized storage, and secure sharing into a unified system.
It provides tamper-proof document handling with intelligent automation, making it suitable for secure digital ecosystems.


---

📚 References

Stellar Blockchain Documentation

IPFS / Pinata Documentation

OCR Engine Documentation

AI Classification Techniques

Telegram Bot API



---

👨‍💻 Author

Yuva Akhil Pattela
Final Year B.Tech Project
