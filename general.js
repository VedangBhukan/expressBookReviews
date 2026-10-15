/**
 * Express Book Review Application - General Router & Axios Client Functions
 * Coursera Final Project - Tasks 10-13 (Question 11)
 *
 * Implements asynchronous book retrieval operations using Axios against the running Express API.
 */

const axios = require('axios');

// Base URL for the Express API server
const BASE_URL = 'http://localhost:5000';

// ============================================================================
// Tasks 10-13: Book Retrieval Operations using Axios
// ============================================================================

/**
 * Task 10: Get the list of all books available in the shop
 * Using async/await with Axios
 * Target endpoint: GET http://localhost:5000/
 */
const getAllBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllBooks:', error.message);
    throw error;
  }
};

/**
 * Task 11: Get book details based on ISBN
 * Using Promises (.then() / .catch()) with Axios
 * Target endpoint: GET http://localhost:5000/isbn/:isbn
 */
const getBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/isbn/${encodeURIComponent(isbn)}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(`Error in getBookByISBN for ISBN ${isbn}:`, error.message);
        reject(error);
      });
  });
};

/**
 * Task 12: Get book details based on Author
 * Using async/await with Axios
 * Target endpoint: GET http://localhost:5000/author/:author
 */
const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
    return response.data;
  } catch (error) {
    console.error(`Error in getBooksByAuthor for '${author}':`, error.message);
    throw error;
  }
};

/**
 * Task 13: Get book details based on Title
 * Using async/await with Axios
 * Target endpoint: GET http://localhost:5000/title/:title
 */
const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    console.error(`Error in getBooksByTitle for '${title}':`, error.message);
    throw error;
  }
};

// Mount / export the public Express router if required as a router
let generalRouter;
try {
  generalRouter = require('./final_project/router/general.js').general;
} catch (e) {
  // Graceful fallback if imported standalone without router structure
  generalRouter = null;
}

// Module exports
module.exports = {
  general: generalRouter,
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};

// ============================================================================
// Direct Execution Demonstration
// When run directly with `node general.js`, execute all four operations
// ============================================================================
if (require.main === module) {
  (async () => {
    console.log('=== Testing Axios Book Retrieval Operations (Tasks 10-13) ===\n');

    try {
      // Test Task 10: Get all books
      console.log('--- Task 10: getAllBooks (async/await) ---');
      const allBooks = await getAllBooks();
      console.log('Success! Retrieved book list:');
      console.log(JSON.stringify(allBooks, null, 2));

      // Test Task 11: Get book by ISBN
      console.log('\n--- Task 11: getBookByISBN (Promises) ---');
      const bookByISBN = await getBookByISBN('1');
      console.log('Success! Book details for ISBN 1:');
      console.log(JSON.stringify(bookByISBN, null, 2));

      // Test Task 12: Get books by Author
      console.log('\n--- Task 12: getBooksByAuthor (async/await) ---');
      const booksByAuthor = await getBooksByAuthor('Jane Austen');
      console.log('Success! Books by author Jane Austen:');
      console.log(JSON.stringify(booksByAuthor, null, 2));

      // Test Task 13: Get books by Title
      console.log('\n--- Task 13: getBooksByTitle (async/await) ---');
      const booksByTitle = await getBooksByTitle('Things Fall Apart');
      console.log('Success! Books with title "Things Fall Apart":');
      console.log(JSON.stringify(booksByTitle, null, 2));

      console.log('\n=== All Tasks 10-13 executed successfully against the live API! ===');
    } catch (err) {
      console.error('Request failed:', err.message);
      console.error('Note: Ensure the Express server is running on http://localhost:5000 before running tests.');
    }
  })();
}
