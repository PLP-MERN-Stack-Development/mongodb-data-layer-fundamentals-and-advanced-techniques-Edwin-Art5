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
````

2. **Set Up Environment Variables**

   * Copy `.env.example` to `.env`
   * Update the values with your own MongoDB URI, for example:

     ```bash
     MONGODB_URI=mongodb://localhost:27017/plp_bookstore
     ```

     or, if using MongoDB Atlas:

     ```bash
     MONGODBATLAS_URI=your-mongodb-atlas-connection-string
     ```

3. **Insert Sample Data**

   ```bash
   node insert_books.js
   ```

4. **Run Queries and Aggregations**

   ```bash
   node queries.js
   ```

---
