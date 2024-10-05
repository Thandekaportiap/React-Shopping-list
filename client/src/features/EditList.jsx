import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateItem } from '../features/Shopping/ShoppingListSlice';

const EditShoppingList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [listName, setListName] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchShoppingList = async () => {
      const result = await axios.get(`http://localhost:5000/shoppingLists/${id}`);
      setListName(result.data.listName);
      setItems(result.data.items);
    };
    fetchShoppingList();
  }, [id]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedList = {
      id,
      listName,
      items,
    };

    const result = await axios.put(`http://localhost:5000/shoppingLists/${id}`, updatedList);
    dispatch(updateItem(result.data));
    
    alert("Successfully updated the shopping list!");
    navigate('/DisplayShoppingList');
  };

  return (
    <section>
      <div className="addnew p-8 rounded shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Shopping List</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">List Name</label>
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
              <label className="block">Item Name</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <label className="block">Category</label>
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
              <label className="block">Notes</label>
              <input
                type="text"
                value={item.notes}
                onChange={(e) => handleItemChange(index, 'notes', e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          ))}
          <button type="submit" className="w-full bg-[#C087BF] text-white py-2 rounded hover:bg-pink-500 transition duration-300">
            Update Shopping List
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditShoppingList;
