import styles from './NavBar.module.css';

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <a href="/">Facsimile</a>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <a href="/sources">Data Sources</a>
        </li>
        <li>
          <a href="/settings">Settings</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
