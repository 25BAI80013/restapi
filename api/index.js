const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allows React to access this API
app.use(express.json());

let cards = [
    { id: 1, suit: "Hearts", value: "Ace", collection: "Vintage" },
    { id: 2, suit: "Diamonds", value: "Queen", collection: "Royal" }
];

app.get('/api/cards', (req, res) => res.json(cards));

app.post('/api/cards', (req, res) => {
    const newCard = { id: Date.now(), ...req.body };
    cards.push(newCard);
    res.status(201).json(newCard);
});

// DELETE a card by ID
app.delete('/api/cards/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = cards.length;
    
    // Filter the array to remove the card with the matching ID
    cards = cards.filter(card => card.id.toString() !== id.toString());

    if (cards.length < initialLength) {
        res.status(200).json({ message: "Card deleted successfully" });
    } else {
        res.status(404).json({ message: "Card not found" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));