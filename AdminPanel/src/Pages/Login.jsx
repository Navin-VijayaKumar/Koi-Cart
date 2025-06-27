import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin123@admin.com' && password === 'admin123') {
      navigate('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
      padding: '0 1rem'
    },
    formContainer: {
      width: '100%',
      maxWidth: '28rem',
    },
    form: {
      backgroundColor: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      borderRadius: '0.5rem',
      padding: '2rem 2rem',
      marginBottom: '1rem'
    },
    title: {
      textAlign: 'center',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem'
    },
    errorMessage: {
      backgroundColor: '#fee2e2',
      border: '1px solid #fecaca',
      color: '#7f1d1d',
      padding: '0.75rem 1rem',
      borderRadius: '0.25rem',
      marginBottom: '1rem',
      position: 'relative'
    },
    label: {
      display: 'block',
      color: '#374151',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    input: {
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      border: '1px solid #d1d5db',
      borderRadius: '0.25rem',
      width: '100%',
      padding: '0.5rem 0.75rem',
      color: '#374151',
      lineHeight: 'tight'
    },
    emailInput: {
      marginBottom: '1rem'
    },
    passwordInput: {
      marginBottom: '1.5rem'
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
      backgroundColor: '#3b82f6',
      color: 'white',
      fontWeight: 'bold',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      transition: 'background-color 0.2s'
    },
    buttonHover: {
      backgroundColor: '#2563eb'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <form 
          onSubmit={handleLogin} 
          style={styles.form}
        >
          <h2 style={styles.title}>Admin Login</h2>
          
          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}
          
          <div style={styles.emailInput}>
            <label 
              style={styles.label} 
              htmlFor="email"
            >
              Email
            </label>
            <input
              style={{
                ...styles.input,
                ...(error ? { borderColor: '#fecaca' } : {})
              }}
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div style={styles.passwordInput}>
            <label 
              style={styles.label} 
              htmlFor="password"
            >
              Password
            </label>
            <input
              style={{
                ...styles.input,
                ...(error ? { borderColor: '#fecaca' } : {})
              }}
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div style={styles.buttonContainer}>
            <button
              style={styles.button}
              type="submit"
              onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
              onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;