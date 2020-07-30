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
  title = "none",
  list = [],
  select,
  selected,
}) {
  const { listOpen, toggleList } = useDropdown();
  const ListItem = ({ item }) => (
    <button
      type="button"
      className="dd-list-item"
      key={item.id}
      onClick={() => {
        select({ id: item.id, name: item.name });
        toggleList();
      }}
    >
      {`${item.name} `}{" "}
      {selected.id === item.id && <FontAwesomeIcon icon={faCheck} />}
    </button>
  );
  const listItems = list.map((item) => <ListItem item={item} />);

  // decide what text to show in dd-header
  let titleText = title;
  if (selected.id) {
    // if something is selected, use the selected name as title text of dd
    titleText = list.filter((item) => item.id === selected.id)[0].name;
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
        {/* show list of items when list open */}
        {listOpen && (
          <div role="list" className="dd-list">
            <div className="dd-scroll-list">{listItems}</div>
          </div>
        )}
      </div>
    </>
  );
}
