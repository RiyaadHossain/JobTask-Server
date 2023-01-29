const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const run = async () => {
    try {
        const db = client.db("Job-Task");
        const userCollection = db.collection("task-1");

        app.post("/get-data", async (req, res) => {
            const user = req.body;
            const result = await userCollection.findOne({});

            res.send(result);
        });

        app.post("/data-input", async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);

            res.send(result);
        });

        app.post("/data-update", async (req, res) => {
            const { name } = req.body;
            const updatedData = req.body
            const result = await userCollection.findOneAndUpdate({ name }, updatedData);

            res.send(result);
        });


    } finally {
    }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});