const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gxsfvvy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        await client.connect();

        // products-collection
        const productCollection = client.db("productDB").collection("product");
        const userCollection = client.db("userDB").collection("user");

        // Get all products
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // get products by id
        app.get('/products-id/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await productCollection.findOne(query);
            res.send(result);
        })

        // Get products by brand name
        app.get('/products-brand/:brand', async (req, res) => {
            const brandName = req.params.brand;
            const query = { brand: brandName };
            const cursor = productCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        // Add Product
        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product);
            res.send(result);
        })

        // Get all users
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // Get user by email
        app.get('/users/:email', async (req, res) => {
            const userEmail = req.params.email;
            const query = { email: userEmail };
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        // Update Cart
        app.put('/users/:email', async (req,res) => {
            const userEmail = req.params.email;
            const user = req.body;
            console.log(user);
            const filter = { email: userEmail };
            const options = { upsert: true };
            const updatedUser = {
                $set: {
                    cart: user.cart
                }
            }
            const result = await userCollection.updateOne(filter,updatedUser,options);
            res.send(result);
        })


        // Add a new user
        app.post('/users', async (req, res) => {
            const newUser = req.body;

            const cursor = userCollection.find();
            const allUsers = await cursor.toArray();
            const alreadyCreated = allUsers.find(user => user.email === newUser.email);

            if (!alreadyCreated) {
                const result = await userCollection.insertOne(newUser);
                res.send(result);
            }
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/brands', async (req, res) => {
    res.send(
        [
            {
                "id": 1,
                "name": "Ford",
                "image": "https://i.ibb.co/QYYB21y/ford.png"
            },
            {
                "id": 2,
                "name": "Toyota",
                "image": "https://i.ibb.co/z7Ljf1s/toyota.png"
            },
            {
                "id": 3,
                "name": "BMW",
                "image": "https://i.ibb.co/wNN22GZ/bmw.png"
            },
            {
                "id": 4,
                "name": "Mercedes-Benz",
                "image": "https://i.ibb.co/wYjpktP/mercedez.png"
            },
            {
                "id": 5,
                "name": "Volkswagen",
                "image": "https://i.ibb.co/JknKXWj/volkswagen.png"
            },
            {
                "id": 6,
                "name": "Honda",
                "image": "https://i.ibb.co/K7DFvsg/honda.png"
            }
        ]

    )
})


app.listen(port, () => {
    console.log(`DriveElegance server is running on port ${port}`);
})