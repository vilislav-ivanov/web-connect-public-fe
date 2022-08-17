import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center footer">
      Copyright &copy; {new Date().getFullYear()} Dev Connector
    </footer>
  );
};

export default Footer;
