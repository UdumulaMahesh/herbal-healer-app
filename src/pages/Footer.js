import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      marginTop: '2rem',
      padding: '1.5rem',
      textAlign: 'center',
      borderTop: '1px solid #e5e7eb',
      color: '#6b7280',
      fontSize: '0.9rem'
    }}>
      &copy; {new Date().getFullYear()} Herbal Healer
    </footer>
  );
};

export default Footer;