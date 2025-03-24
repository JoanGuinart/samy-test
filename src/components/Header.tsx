import styles from "@styles/Header.module.scss";
import { useState } from "react";

const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <header className={styles.header}>
      <img className="logo" src="/samy-logo.svg" alt="SAMY Enterprise Logo" />
      <form>
        <input
          className="e1"
          type="text"
          value={searchTerm}
          placeholder="You're looking for something?"
          onChange={handleSearchChange}
        />
        <img src="/search-icon.svg" alt="search icon" />
      </form>
    </header>
  );
};

export default Header;
