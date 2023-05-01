import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';


const Navbar = () => {
  return (
    <nav className={styles.navbarBox}>
      <ul className={styles.navbar}>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
        <li>
          <Link href="/menu">Menu</Link>
        </li>
        <li>
          <Link href="/order">Order</Link>
        </li>
        <li>
          <Link href="/payment">Payment</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
