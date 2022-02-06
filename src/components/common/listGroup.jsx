import React from "react";

const ListGroup = ({
  items,
  onItemChange,
  selectedItem,
  textProperty,
  valueProperty,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemChange(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
