const { MongoClient } = require("mongodb");
require("dotenv").config(); // Load environment variables from .env file

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("connected to DB");
  } catch (err) {
    console.log("there was an error " + err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

main();
