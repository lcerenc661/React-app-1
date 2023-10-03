import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";

import { useState, useEffect } from "react";

function App() {
  const API_URL = "http://localhost:3500/items";
  const [items, setItems] = useState( []);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoadiang] = useState(true);

  // If the dependecy changes [], the arrow function excecutes
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error('Did not recived expected data');
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err){
        console.log(err.stack);
        setFetchError(err.message);
      } finally {
        setIsLoadiang(false)
      } 
    }
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const addNewItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
  };

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    console.log(newItem);
    //add Item
    addNewItem(newItem);
    setNewItem("");
    console.log("submitted");
  };
  return (
    <div className="App">
      <Header title="Groceries List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`} </p>}
        {!fetchError && !isLoading &&
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
        }
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
