import { FaTrashAlt } from "react-icons/fa";
import React from "react";

const LineItem = ({ item, handleCheck, handleDelete }) => {
  return (
    <li className="item" key={item.id}>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={(id) => {
          handleCheck(item.id);
        }}
      />
      <label
        style={item.checked ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.item}
      </label>
      <FaTrashAlt
        role="button"
        tabIndex="0"
        aria-label={`Delete ${item.item}`}
        onClick={() => {
          handleDelete(item.id);
        }}
      />
    </li>
  );
};

export default LineItem;
