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
  list = ["1", "2", "3"],
}) {
  const { listOpen, toggleList } = useDropdown();
  const ListItem = ({ item }) => (
    <button
      type="button"
      className="dd-list-item"
      key={item}
      // onClick={}
    >
      {`${item} `} {item.selected && <FontAwesomeIcon icon={faCheck} />}
    </button>
  );
  const listItems = list.map((item) => <ListItem item={item} />);
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
          <div className="dd-header-title">{title}</div>
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
