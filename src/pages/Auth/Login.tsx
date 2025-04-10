
import styles from './Login.module.css';

function Login() {
  const handleGoogleLogin = () => {
    // Redirect to Google authentication endpoint
    window.location.href = 'http://localhost:3001/api/v1/auth/google';
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1>Facsimile</h1>
        <p>Connect your accounts and get started</p>
        
        <button 
          className={styles.googleButton} 
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
