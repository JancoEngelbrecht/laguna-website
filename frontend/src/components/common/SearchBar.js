import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div className="flex mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded-l"
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white p-2 rounded-r"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;