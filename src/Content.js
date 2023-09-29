import React from "react";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const Content = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: true,
      item: "One half pound of Cocoa covered Almnonds Unsalted",
    },
    { id: 2, checked: false, item: "Item 2" },
    { id: 3, checked: false, item: "Item 3" },
  ]);

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    localStorage.setItem('shoppinglist', JSON.stringify(listItems));
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems);
    localStorage.setItem('shoppinglist', JSON.stringify(listItems));
  }

  return (
    <main>
      {items.length ? (
      <ul>
        {items.map((item) => (
          <li className="item" key={item.id}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(id) => {
                handleCheck(item.id);
              }}
            />
            <label
              style={(item.checked) ? { textDecoration:'line-through' }: null}
              onDoubleClick={()=> handleCheck(item.id)}
            >{item.item}</label>
            <FaTrashAlt
              role="button"
              tabIndex="0"
              onClick={()=>{handleDelete(item.id)}} />
          </li>
        ))}
      </ul>
      )
      : <p style={{marginTOP: '2rem'}}>Empty List.</p>
      }
    </main>
  );
};

export default Content;
