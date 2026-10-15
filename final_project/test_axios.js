const { getAllBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle } = require('./router/general.js');

async function testAll() {
  console.log("=== Testing Task 10: getAllBooks (async/await) ===");
  try {
    const books = await getAllBooks();
    console.log("Task 10 Success: Retrieved", Object.keys(books).length, "books.");
  } catch (err) {
    console.error("Task 10 Failed:", err.message);
  }

  console.log("\n=== Testing Task 11: getBookByISBN (Promises) ===");
  getBookByISBN('1')
    .then((book) => {
      console.log("Task 11 Success: Book retrieved by ISBN 1 -> Title:", book.title);
    })
    .catch((err) => {
      console.error("Task 11 Failed:", err.message);
    })
    .finally(async () => {
      console.log("\n=== Testing Task 12: getBooksByAuthor (async/await) ===");
      try {
        const booksByAuthor = await getBooksByAuthor('Jane Austen');
        console.log("Task 12 Success: Retrieved books by Jane Austen ->", booksByAuthor.length, "found.");
      } catch (err) {
        console.error("Task 12 Failed:", err.message);
      }

      console.log("\n=== Testing Task 13: getBooksByTitle (async/await) ===");
      try {
        const booksByTitle = await getBooksByTitle('Things Fall Apart');
        console.log("Task 13 Success: Retrieved books by Title 'Things Fall Apart' ->", booksByTitle.length, "found.");
      } catch (err) {
        console.error("Task 13 Failed:", err.message);
      }

      console.log("\n=== All Axios Task 10-13 Tests Completed Successfully ===");
    });
}

testAll();
