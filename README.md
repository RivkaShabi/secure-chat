

##  Secure Chat - Project Setup Guide

*  **Backend** — located in `secure-chat-server`
*  **Frontend** — located in `secure-chat-client`

---

###  Prerequisites

Make sure the following versions are installed on your machine (this setup works successfully with them):

* **Node.js**: `v20.18.1`
* **npm**: `11.1.0`

To check your versions, run:

```
node -v
npm -v
```

---

## 🛠 Backend Setup (`secure-chat-server`)

### 1. Install dependencies

Navigate to the backend folder and install required packages:

```
cd secure-chat-server
npm install
```

### 2. Start MongoDB

Ensure that MongoDB is installed and running locally.

### 3. Run the server

Navigate into the `src` folder and run the server:

```
cd src
node index.js
```

By default, the server runs on:

```
https://localhost:3001/
```

---

##  Frontend Setup (`secure-chat-client`)

### 1. Install dependencies

Navigate to the frontend folder and install required packages:

```
cd ../secure-chat-client
npm install
```

### 2. Start the development server

```
npm run start
```

Then open your browser and go to:

```
http://localhost:3000/
```



##  Important Notes

* Make sure the backend server is **already running** at `https://localhost:3001/` before starting the frontend.
* Also, verify that **MongoDB is connected and available** locally.


------------

## Run the Seeding Script
* Once the seeding.js script is ready, you can run it using Node.js. In your terminal, navigate to the project directory and run:

```
node seeding.js

```


-----------


###  Design Decisions

####  Encryption Algorithms

This project uses the **AES (Advanced Encryption Standard)** algorithm to **encrypt messages** between clients.

* AES is known for being fast, efficient, and highly secure, making it ideal for real-time message encryption.
* Encryption and decryption are handled using the `crypto-js` library, both on the client and server sides, with a pre-shared encryption key.

In addition, **bcrypt** is used for **password hashing** in case a user registration or login system is implemented.

* bcrypt securely hashes passwords before storing them in the database, ensuring they are not stored in plain text.

####  Architecture Overview

* The server is built using **Node.js** with the **Express** framework, providing a lightweight API for managing message flow and event handling.
* Communication is secured via **HTTPS**, using a digital certificate (`.crt`) and a private key (`.key`) to protect against man-in-the-middle attacks.
* Clients receive messages from the server using **SSE (Server-Sent Events)**, a technology for real-time, server-to-client communication.
  The `eventsource` library is used on the client side to handle SSE.
* Messages are sent to the server via HTTP POST requests using the `axios` library.

####  Key Libraries Used

* **crypto-js** – for encrypting and decrypting messages using AES.
* **axios** – for sending HTTP requests from the client to the server.
* **eventsource** – for receiving real-time messages from the server using SSE.
* **helmet** – to improve server security through proper HTTP headers.
* **cors** – to enable cross-origin requests during development.
* **dotenv** – to manage sensitive configuration variables in a secure `.env` file.
* **bcrypt** – for securely hashing user passwords.
* **mongoose** – for interacting with a MongoDB database if user or message storage is needed.

####  Design Goals

* Ensure **high security** in both data transmission and storage.
* Use **modern, lightweight solutions** that are easy to maintain.
* Enable **real-time communication** between clients via SSE with minimal overhead.
* Separate functional components (encryption, sending, receiving, authentication) to make testing and debugging easier.

---


#### Limitations and Trade-offs


Due to time constraints, not all test files were fully implemented.
To accelerate the process and focus on key functionalities, I used AI assistance to help generate parts of the test logic and structure.
Some unit and integration tests are still partial or missing.



