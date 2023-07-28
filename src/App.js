import { Children, useState } from "react";
import "./App.css";
import { FaPlus, FaMinus, FaTrash, FaCheck } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [text, setText] = useState("");
  const [newItem, setNewItem] = useState([]);

  function handleAddItem(item) {
    setNewItem((items) => [...items, item]);
  }

  function handleDeleteItem(name) {
    setNewItem((items) => items.filter((item) => item.name !== name));
  }

  function handleToggleItem(name) {
    setNewItem((items) =>
      items.map((item) =>
        item.name === name ? { ...item, selected: !item.selected } : item
      )
    );
  }

  return (
    <div className="main">
      <div className="container">
        <Form
          text={text}
          handleText={setText}
          setText={setText}
          handleAddItem={handleAddItem}
        />
        <PackingList
          items={newItem}
          handleDeleteItem={handleDeleteItem}
          handleToggleItem={handleToggleItem}
        />
      </div>
    </div>
  );
}

function Form({ text, handleText, setText, handleAddItem }) {
  // const [submit, setSubmit] = useState(data);

  function handleSubmit(e) {
    e.preventDefault();
    if (!text) return;
    const newItem = { name: text, quantity: 1, selected: false };
    handleAddItem(newItem);
    // console.log(newItem);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form">
        <input
          className="text-box"
          type="text"
          placeholder="Enter an item"
          value={text}
          onChange={(e) => handleText(e.target.value)}
        ></input>
        <button className="button-5">Submit</button>
      </div>
    </form>
  );
}

function PackingList({ items, handleDeleteItem, handleToggleItem }) {
  // const shoppingItem = data;

  return items.map((item) => (
    <ul className="list" key={item.name}>
      <Item
        item={item}
        handleDeleteItem={() => handleDeleteItem(item.name)}
        handleToggleItem={handleToggleItem}
      />
    </ul>
  ));
}

function Item({ item, handleDeleteItem, handleToggleItem }) {
  const [quantity, setQuantity] = useState(1);

  function handleQuantityPlus() {
    setQuantity((e) => e + 1);
  }
  function handleQuantityMinus() {
    if (quantity > 0) setQuantity((e) => e - 1);
  }

  return (
    <li className="items">
      <div className="description">
        <Button onClick={() => handleToggleItem(item.name)}>
          {item.selected ? (
            <FontAwesomeIcon icon={faXmarkSquare} style={{ fontSize: 18 }} />
          ) : (
            <FaCheck style={{ fontSize: 18 }} />
          )}
        </Button>
        <span style={item.selected ? { textDecoration: "line-through" } : {}}>
          {item.name}
        </span>
        <Button onClick={handleDeleteItem}>
          <FaTrash style={{ fontSize: 18 }} />
        </Button>
      </div>
      <div className="quantity">
        <Button onClick={handleQuantityMinus}>
          <FaMinus style={{ fontSize: 18 }} />
        </Button>
        <span>{quantity}</span>
        <Button onClick={handleQuantityPlus}>
          <FaPlus style={{ fontSize: 18 }} />
        </Button>
      </div>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
export default App;
