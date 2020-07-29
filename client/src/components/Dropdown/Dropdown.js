import React from "react";
import useDropdown from "./UseDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "./Dropdown.scss";
export default function Dropdown({
  title = "placeholder",
  list = [],
  toggle,
  single,
  select,
}) {
  const { listOpen, toggleList } = useDropdown();
  const ListItem = ({ item }) => (
    <button
      type="button"
      className="dd-list-item"
      key={item.id}
      onClick={() => {
        if (single) {
          select(item.id);
        } else {
          toggle(item.id);
        }
      }}
    >
      {`${item.name} `} {item.selected && <FontAwesomeIcon icon={faCheck} />}
    </button>
  );
  const listItems = list.map((item) => <ListItem item={item} />);
  const selectedItemsCount = list.reduce(
    (accu, item) => (item.selected ? accu + 1 : accu),
    0
  );
  // decide what text to show in dd-header
  let titleText = title;
  if (selectedItemsCount === 1) {
    titleText = list.filter((item) => item.selected)[0].name;
  } else if (selectedItemsCount > 1) {
    titleText = "Multiple Selected";
  }
  return (
    <>
      {/* when list open, show transparent backdrop under dd that closes dd when clicked on  */}
      {listOpen && <div className="dd-backdrop" onClick={toggleList}></div>}
      <div className="dd-wrapper">
        <button
          type="button"
          className="dd-header"
          onClick={() => toggleList()}
        >
          <div className="dd-header-title">{titleText}</div>
          {listOpen ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </button>

        {listOpen && (
          <div role="list" className="dd-list">
            <div className="dd-scroll-list">{listItems}</div>
          </div>
        )}
      </div>
    </>
  );
}
