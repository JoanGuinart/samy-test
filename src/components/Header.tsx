import styles from "@styles/Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <img className="logo" src="/samy-logo.svg" alt="SAMY Enterprise Logo" />
      <form>
        <input
          className="e1"
          type="text"
          placeholder="You're looking for something?"
        />
        <img src="/search-icon.svg" alt="" />
      </form>
    </header>
  );
};

export default Header;
