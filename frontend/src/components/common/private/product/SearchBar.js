import React from 'react';

const SearchBar = ({ searchQuery, onSearchQueryChange }) => {
  const handleSearchInputChange = (e) => {
    onSearchQueryChange(e.target.value);
  };

  return (
    <div className="flex mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="border p-2 rounded-l"
      />
      <button
        onClick={() => onSearchQueryChange('')} // Clear search query
        className="bg-blue-500 text-white p-2 rounded-r"
      >
        Clear
      </button>
    </div>
  );
};

export default SearchBar;