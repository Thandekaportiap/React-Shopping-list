import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddShoppingList = ({ id }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate('/Login'); // Redirect to login if not authenticated
    }
  }, [id, navigate]);

  const [listName, setListName] = useState('');
  const [items, setItems] = useState([{ name: '', category: '', notes: '', quantity: '' }]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', category: '', notes: '', quantity: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shoppingList = {
      userId: id,
      listName,
      items,
    };

    axios.post('http://localhost:5000/shoppingLists', shoppingList)
      .then(result => {
        alert("Successfully added the shopping list!");
        navigate('/DisplayShoppingList');
      });
  };

  return (
    <section className='bg-cover bg-no-repeat'>
      <div className="addnew p-8 rounded shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#C087BF' }}>Add New Shopping List</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">List Name</label>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          {items.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block text-white">Item Name</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <label className="block text-white">Category</label>
              <select
                value={item.category}
                onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              >
                <option value="">Select Category</option>
                <option value="Grocery">Grocery</option>
                <option value="Household">Household</option>
                <option value="Clothing">Clothing</option>
                <option value="Other">Other</option>
              </select>
              <label className="block text-white">Notes</label>
              <input
                type="text"
                value={item.notes}
                onChange={(e) => handleItemChange(index, 'notes', e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <label className="block text-white">Quantity</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
          ))}

          <button type="button" onClick={addItem} className="text-blue-500 mb-4 text-2xl">
            Add Another Item
          </button>

          <button
            type="submit"
            className="w-full bg-[#C087BF] text-white py-2 rounded hover:bg-pink-500 transition duration-300"
          >
            Add Shopping List
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddShoppingList;
