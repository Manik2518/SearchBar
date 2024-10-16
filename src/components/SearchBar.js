// import { useState, useCallback , useRef } from "react";
// import { FaSearch } from "react-icons/fa";

// import "./SearchBar.css";

// const throttle = (func, delay) => {
//     let lastCall = 0;
  
//     return (...args) => {
//       const now = Date.now();
//       if (now - lastCall >= delay) {
//         lastCall = now;
//         func(...args);
//       }
//     };
//   };
// export const SearchBar = ({ setResults }) => {
//   const [input, setInput] = useState("");


//   const throttledFetchDataRef = useRef();

//   const fetchData = useCallback((value) => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((json) => {
//         const results = json.filter((user) => {
//           return (
//             value &&
//             user &&
//             user.name &&
//             user.name.toLowerCase().includes(value)
//           );
//         });
//         setResults(results);
//       });
//   },[setResults]);

//   if (!throttledFetchDataRef.current) {
//     throttledFetchDataRef.current = throttle(fetchData, 2000); // 2000 ms limit
//   }

//   const handleChange = (value) => {
//     setInput(value);
//     throttledFetchDataRef.current(value);
//   };

//   return (
//     <div className="input-wrapper">
//       <FaSearch id="search-icon" />
//       <input
//         placeholder="Type to search..."
//         value={input}
//         onChange={(e) => handleChange(e.target.value)}
//       />
//     </div>
//   );
// };

// Debouncing

import { useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

const debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

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

  const debouncedFetchData = useCallback(debounce(fetchData, 500), [fetchData]);

  const handleChange = (value) => {
    setInput(value);
    debouncedFetchData(value); 
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