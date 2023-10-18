const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/brands', (req, res) => {
    res.send(
        [
            {
                "id": 1,
                "name": "Ford",
                "image": "https://i.ibb.co/y0Mh9PJ/ford-logo-removebg-preview.png"
            },
            {
                "id": 2,
                "name": "Toyota",
                "image": "https://example.com/toyota.jpg"
            },
            {
                "id": 3,
                "name": "BMW",
                "image": "https://example.com/bmw.jpg"
            },
            {
                "id": 4,
                "name": "Mercedes-Benz",
                "image": "https://example.com/mercedes.jpg"
            },
            {
                "id": 5,
                "name": "Honda",
                "image": "https://example.com/honda.jpg"
            },
            {
                "id": 6,
                "name": "Volkswagen",
                "image": "https://example.com/vw.jpg"
            }
        ]

    )
})

app.listen(port, () => {
    console.log(`DriveElegance server is running on port ${port}`);
})