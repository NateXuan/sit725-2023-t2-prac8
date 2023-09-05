const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://natexuan0805:B1VLM0Jk2VyiW3TA@cluster0.md8uytc.mongodb.net/myDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

module.exports = client;
