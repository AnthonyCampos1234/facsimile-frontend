import styles from './Settings.module.css';

interface SettingsProps {
  user: {
    name: string;
    email: string;
    picture: string;
  } | null;
  onLogout: () => void;
}

function Settings({ user, onLogout }: SettingsProps) {
  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Settings</h1>

        <div className={styles.section}>
          <h2>Profile</h2>
          <div className={styles.profileInfo}>
            <img
              src={user.picture}
              alt={user.name}
              className={styles.profilePicture}
            />
            <div className={styles.userInfo}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Account</h2>
          <button onClick={onLogout} className={styles.logoutButton}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
