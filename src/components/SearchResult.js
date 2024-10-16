import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You Clicked on ${result}!`)}
    >
      {result}
    </div>
  );
};