import React, { useState, useEffect } from 'react';

function App() {
  const [cards, setCards] = useState([]);
  
  // State to hold new card data from the form
  const [formData, setFormData] = useState({
    suit: '',
    value: '',
    collection: ''
  });

  // 1. Load cards on startup
  useEffect(() => {
    fetch('http://localhost:5000/api/cards')
      .then(res => res.json())
      .then(data => setCards(data));
  }, []);

  // 2. Handle "Add Card" submission
  const handleAddCard = async (e) => {
    e.preventDefault(); // Prevents page reload
    
    const response = await fetch('http://localhost:5000/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const newCard = await response.json();
      setCards([...cards, newCard]); // Add new card to the list instantly
      setFormData({ suit: '', value: '', collection: '' }); // Clear the form
    }
  };

  // 3. Handle "Delete Card"
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/cards/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      setCards(cards.filter(card => card.id !== id));
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Card Collection Manager</h1>

      {/* --- ADD CARD FORM --- */}
      <section style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd' }}>
        <h3>Add New Card</h3>
        <form onSubmit={handleAddCard}>
          <input 
            placeholder="Suit (e.g. Hearts)" 
            value={formData.suit}
            onChange={(e) => setFormData({...formData, suit: e.target.value})}
            required 
          />
          <input 
            placeholder="Value (e.g. Ace)" 
            value={formData.value}
            onChange={(e) => setFormData({...formData, value: e.target.value})}
            required 
          />
          <input 
            placeholder="Collection" 
            value={formData.collection}
            onChange={(e) => setFormData({...formData, collection: e.target.value})}
            required 
          />
          <button type="submit" style={{ marginLeft: '10px' }}>Add Card</button>
        </form>
      </section>

      {/* --- DISPLAY CARDS --- */}
      <div style={{ display: 'grid', gap: '10px' }}>
        {cards.map(card => (
          <div key={card.id} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>{card.value}</strong> of <strong>{card.suit}</strong> 
              <span style={{ marginLeft: '15px', color: '#666' }}>({card.collection})</span>
            </div>
            <button onClick={() => handleDelete(card.id)} style={{ color: 'red' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;