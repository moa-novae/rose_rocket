import { useState } from "react";
export default function useDropdown() {
  const [listOpen, setListOpen] = useState(false);
  const toggleList = () => {
    setListOpen((prev) => !prev);
  };
  return { listOpen, toggleList };
}
