import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }: { searchTerm: string, setSearchTerm: (term: string) => void }) => {
  return (
    <div className="flex items-center gap-2 border-b pb-2 w-full">
      <Search className="w-5 h-5 text-gray-500" />
      <Input
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SearchBar;