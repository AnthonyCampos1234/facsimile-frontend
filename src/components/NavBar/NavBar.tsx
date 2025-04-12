import { useState, useRef, useEffect } from 'react';
import styles from './NavBar.module.css';

interface NavBarProps {
  user: {
    name: string;
    email: string;
    picture: string;
  } | null;
  onLogout: () => void;
}

function NavBar({ user, onLogout }: NavBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <a href="/">Facsimile</a>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <a href="/">Chat</a>
        </li>
        <li>
          <a href="/sources">Data Sources</a>
        </li>
        <li>
          <a href="/settings">Settings</a>
        </li>
        {user && (
          <li className={styles.profile}>
            <button
              ref={buttonRef}
              onClick={() => setShowDropdown(!showDropdown)}
              className={styles.profileButton}
            >
              <img
                src={user.picture}
                alt={user.name}
                className={styles.profilePicture}
              />
            </button>
            {showDropdown && (
              <div ref={dropdownRef} className={styles.dropdown}>
                <div className={styles.dropdownInfo}>
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.userEmail}>{user.email}</span>
                </div>
                <button onClick={onLogout} className={styles.logoutButton}>
                  Log out
                </button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
