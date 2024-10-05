import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoppingLists, removeItem } from '../features/Shopping/ShoppingListSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';

const DisplayShoppingList = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoppingLists = useSelector((state) => state.shoppingList.items);

  useEffect(() => {
    if (id) {
      dispatch(fetchShoppingLists(id));
    } else {
      navigate('/Login');
    }
  }, [id, dispatch, navigate]);

  const handleDelete = async (listId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this shopping list?");
    if (confirmDelete) {
      await axios.delete(`http://localhost:5000/shoppingLists/${listId}`);
      dispatch(removeItem(listId));
      alert("Shopping list deleted successfully!");
    }
  };

  const handleEdit = (listId) => {
    navigate(`/edit/${listId}`);
  };

  const handleShare = (list) => {
    const textToShare = `Shopping List: ${list.listName}\n` + list.items.map(item => `${item.name} - Quantity: ${item.quantity}`).join('\n');
    navigator.clipboard.writeText(textToShare).then(() => {
      alert('Shopping list copied to clipboard!');
    });
  };

  const handlePDFExport = (list) => {
    const doc = new jsPDF();
    doc.text(`Shopping List: ${list.listName}`, 10, 10);
    list.items.forEach((item, index) => {
      doc.text(`${item.name} - Quantity: ${item.quantity}`, 10, 20 + (index * 10));
    });
    doc.save(`${list.listName}.pdf`);
  };

  const groupedLists = shoppingLists.reduce((acc, list) => {
    if (!acc[list.listName]) {
      acc[list.listName] = [];
    }
    acc[list.listName].push(list);
    return acc;
  }, {});

  return (
    <section>
      <div className='mt-6 flex flex-col justify-center items-center'>
        <p className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-pink-500 my-4">Shopping Lists</p>
        {Object.keys(groupedLists).length === 0 ? (
          <div className="text-center col-span-3 text-4xl text-red-700">
            No Shopping Lists available. Add your first Shopping List!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(groupedLists).map(([listName, lists]) => (
              <div key={listName} className="max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-5">
                  <h2 className="text-xl font-bold mb-4">{listName}</h2>
                  <ul className="list-disc pl-5">
                    {lists.map((list) => (
                      <li key={list.id} className="mb-2">
                        <strong>{list.listName}</strong>
                        <button onClick={() => handleEdit(list.id)}>Edit</button>
                        <button onClick={() => handleDelete(list.id)}>Delete</button>
                        <button onClick={() => handleShare(list)} className="ml-2">Share</button>
                        <button onClick={() => handlePDFExport(list)} className="ml-2">Export PDF</button>
                        {list.items && list.items.length > 0 && (
                          <ul className="list-inside list-disc">
                            {list.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                {item.name} - Quantity: {item.quantity}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayShoppingList;
