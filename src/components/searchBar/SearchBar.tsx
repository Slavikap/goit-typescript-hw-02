import { useState, FC, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (searchQuery: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.error("You need to enter text to search for an image");
      return;
    }
    onSubmit(query);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <header className={css["header-search"]}>
      <form onSubmit={handleSubmit} className={css["header-form"]}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
          className={css["input-header"]}
        />
        <button type="submit" className={css["button-header"]}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;