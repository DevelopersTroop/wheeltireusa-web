import React from "react";

interface AccessoriesSearchByKeyProps {
  searchKey: string;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
}

const AccessoriesSearchByKey: React.FC<AccessoriesSearchByKeyProps> = ({
  searchKey,
  setSearchKey,
}) => {
  return (
    <div>
      <div>
        <p className="text-lg font-medium text-gray-800">Search by Keyword</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className={
            "w-full border-b border-gray-300 bg-transparent px-3 outline-none"
          }
        />
      </div>
    </div>
  );
};

export default AccessoriesSearchByKey;
