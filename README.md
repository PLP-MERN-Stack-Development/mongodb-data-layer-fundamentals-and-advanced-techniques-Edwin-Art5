# How to Run the MongoDB Scripts

## Overview
This project contains Node.js scripts that connect to MongoDB to insert sample data and perform various queries, aggregations, and indexing operations.

---

## Setup Instructions

1. **Install Dependencies**
   Run the following command in your project directory:
   ```bash
   npm install mongoose dotenv
Create a .env File
In the root folder of your project, create a file named .env and add your MongoDB connection string:

bash
Copy code
MONGO_URI=mongodb://localhost:27017/plp_bookstore
If you are using MongoDB Atlas, replace the above with your Atlas connection URI.

Ensure MongoDB is Running
Start your MongoDB server locally or make sure your Atlas cluster is online.

Running the Scripts
1. Insert Sample Books
Run the following command to insert sample book data into your database:

bash
Copy code
node insert_books.js
This script connects to MongoDB, clears existing records, and inserts new sample books.

You can view the inserted data in MongoDB Compass under the database plp_bookstore → collection books.

2. Run Queries and Aggregations
To execute all query, aggregation, and indexing tasks, run:

bash
Copy code
node queries.js
This script performs:

Basic queries (by genre, author, year, etc.)

Updates and deletions

Aggregation pipelines (average prices, most frequent author, books by decade)

Index creation for faster searches

Results will be displayed in the terminal.

Done
After running both scripts, your MongoDB database will be populated and all queries and aggregations will execute successfully.

# 📘 MongoDB – Data Layer Fundamentals and Advanced Techniques

This project demonstrates the use of MongoDB for data management, including basic CRUD operations, aggregation pipelines, and indexing techniques.  
It includes scripts for connecting to MongoDB, inserting data, and running various queries.

---

## 🧩 Files Included

- **db.js** – Handles MongoDB connection using Mongoose.  
- **insert_books.js** – Inserts sample book data into the `books` collection.  
- **queries.js** – Contains MongoDB queries, aggregations, and indexing examples.  
- **README.md** – Instructions on how to run the scripts.  
- **.env.example** – Sample environment file showing the required variables.

---

## ⚙️ Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install mongoose dotenv
Create Your .env File

Make a copy of .env.example and rename it to .env

Fill in your MongoDB connection string(s) inside the .env file:

env
Copy code
MONGODBATLAS_URI=your_mongodb_atlas_connection_string
MONGODB_URI=mongodb://localhost:27017/plp_bookstore
Ensure MongoDB is Running

If you’re using MongoDB Atlas, make sure your cluster is active.

If using local MongoDB, ensure the MongoDB service is started.

🚀 How to Run the Scripts
1. Insert Sample Books
Run the script below to insert book data into the database:

bash
Copy code
node insert_books.js
2. Run Queries and Aggregations
Execute this script to perform all the queries, aggregations, and indexing:

bash
Copy code
node queries.js