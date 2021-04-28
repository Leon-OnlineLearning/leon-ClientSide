import {ChangeEvent, useState} from "react"

const useSearch = (onSearch: (term:string) => Promise<any>) : [string, any[], (e: ChangeEvent<HTMLInputElement>) => void, () => Promise<void>] => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleOnSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOnSearch = async () => {
    const results = await onSearch(searchTerm);
    setSearchResults(results);
  };

  return [searchTerm, searchResults, handleOnSearchTermChange, handleOnSearch]
}

export default useSearch;
