import { useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
// import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = useCallback((value) => {
    if (!value) {
      setResults([]); // Clear results if input is empty
      return;
    }

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            user.name &&
            user.name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResults(results);
      });
  }, [setResults]);

  // const debouncedFetchData = useDebounce(fetchData, 500);
  const throttledFetchData = useThrottle(fetchData, 2000);

  const handleChange = (value) => {
    setInput(value);
    throttledFetchData(value); 
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};