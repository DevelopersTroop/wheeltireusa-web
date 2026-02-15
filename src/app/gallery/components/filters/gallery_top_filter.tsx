import React, { useState } from "react";

const GalleryTopFilter: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>("default");

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="p-2">
      <select
        className="p-2 border rounded outline-none gap-24"
        id="sort"
        value={sortOption}
        onChange={handleSortChange}
      >
        <option value="default">Sort by Year (New to Old)</option>
        <option value="sort_by_recently_added">SORT BY RECENTLY ADDED</option>
        <option value="sort_by_year_new_to_old">
          SORT BY YEAR (NEW TO OLD)
        </option>
        <option value="sort_by_year_old_to_new">
          SORT BY YEAR (OLD TO NEW)
        </option>
      </select>
    </div>
  );
};

export default GalleryTopFilter;
