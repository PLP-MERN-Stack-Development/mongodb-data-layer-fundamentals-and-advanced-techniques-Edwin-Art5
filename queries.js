const { mongoose, connectDB } = require('./db');

// Import the Book model
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  author: String,
  genre: String,
  published_year: Number,
  price: Number,
  in_stock: Boolean,
  pages: Number,
  publisher: String,
});

const Book = mongoose.model('Book', bookSchema);

// MAIN FUNCTION
async function runQueries() {
  try {
    await connectDB();

    console.log('--- Running MongoDB Queries ---\n');

    // Find all books in a specific genre
    const genre = 'Fiction';
    const fictionBooks = await Book.find({ genre });
    console.log(`Books in genre "${genre}":`, fictionBooks.length);

    // Find books published after a certain year
    const year = 1950;
    const booksAfterYear = await Book.find({ published_year: { $gt: year } });
    console.log(`\nBooks published after ${year}:`, booksAfterYear.length);

    // Find books by a specific author
    const author = 'George Orwell';
    const authorBooks = await Book.find({ author });
    console.log(`\nBooks by ${author}:`, authorBooks.length);

    // Update the price of a specific book
    const titleToUpdate = '1984';
    const newPrice = 15.99;
    await Book.findOneAndUpdate({ title: titleToUpdate }, { price: newPrice }, { new: true });
    console.log(`\nUpdated price of "${titleToUpdate}" to $${newPrice}`);

    // Delete a book by its title
    const titleToDelete = 'Moby Dick';
    await Book.deleteOne({ title: titleToDelete });
    console.log(`Deleted "${titleToDelete}" from collection.`);

    // Advanced Queries
   
    // Books that are in stock and published after 2010
    const modernBooks = await Book.find({ in_stock: true, published_year: { $gt: 2010 } });
    console.log(`\nBooks in stock & published after 2010:`, modernBooks.length);

    // Use projection (only title, author, and price)
    const projectedBooks = await Book.find({}, { title: 1, author: 1, price: 1, _id: 0 });
    console.log('\nProjected books (title, author, price only):');
    projectedBooks.forEach((b) => console.log(`${b.title} - ${b.author} ($${b.price})`));

    // Sort books by price ascending
    const sortedAsc = await Book.find({}).sort({ price: 1 });
    console.log('\nBooks sorted by price (ascending):');
    sortedAsc.forEach((b) => console.log(`${b.title} - $${b.price}`));

    // Sort books by price descending
    const sortedDesc = await Book.find({}).sort({ price: -1 });
    console.log('\nBooks sorted by price (descending):');
    sortedDesc.forEach((b) => console.log(`${b.title} - $${b.price}`));

    // Pagination (5 books per page)
    const page = 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const paginatedBooks = await Book.find({}).skip(skip).limit(limit);
    console.log(`\nBooks - Page ${page}:`);
    paginatedBooks.forEach((b, i) => console.log(`${skip + i + 1}. ${b.title}`));

    // AGGREGATION PIPELINE

    console.log('\n--- Aggregation Pipeline Results ---');

    // Average price of books by genre
    const avgPriceByGenre = await Book.aggregate([
      { $group: { _id: '$genre', averagePrice: { $avg: '$price' }, totalBooks: { $sum: 1 } } },
      { $sort: { averagePrice: -1 } },
    ]);
    console.log('\nAverage price by genre:');
    console.table(avgPriceByGenre);

    // Author with the most books
    const mostBooksByAuthor = await Book.aggregate([
      { $group: { _id: '$author', totalBooks: { $sum: 1 } } },
      { $sort: { totalBooks: -1 } },
      { $limit: 1 },
    ]);
    console.log('\nAuthor with the most books:');
    console.table(mostBooksByAuthor);

    // Group books by publication decade
    const booksByDecade = await Book.aggregate([
      {
        $group: {
          _id: { $subtract: [{ $divide: ['$published_year', 10] }, { $mod: [{ $divide: ['$published_year', 10] }, 1] }] },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          decade: { $concat: [{ $toString: { $multiply: ['$_id', 10] } }, 's'] },
          count: 1,
          _id: 0,
        },
      },
      { $sort: { decade: 1 } },
    ]);
    console.log('\nBooks grouped by publication decade:');
    console.table(booksByDecade);

    // INDEXING
    
    console.log('\n--- Indexing Demonstration ---');

    // Create an index on 'title' for faster searches
    await Book.collection.createIndex({ title: 1 });
    console.log('Index created on "title" field.');

    // Create a compound index on 'author' and 'published_year'
    await Book.collection.createIndex({ author: 1, published_year: -1 });
    console.log('Compound index created on "author" and "published_year".');

    // Demonstrate query performance with explain()
    const explainPlan = await Book.find({ title: '1984' }).explain('executionStats');
    console.log('\nExplain query performance:');
    console.log('Execution Time (ms):', explainPlan.executionStats.executionTimeMillis);
    console.log('Documents Examined:', explainPlan.executionStats.totalDocsExamined);
    console.log('Documents Returned:', explainPlan.executionStats.nReturned);

  } catch (error) {
    console.error('Error running queries:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

runQueries();
