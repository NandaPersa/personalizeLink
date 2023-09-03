/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from 'next/image';
import React from 'react';
import styles from "./header.module.css";

import logo from '~/assets/logo.svg';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <Link href={'/'} aria-label='Logo personalize'>
        <Image src={logo} alt='Logo personalize' />
      </Link>
        {/*
        <div className={styles.navbar}>
          <nav className={styles.navItem}>Encurtador de link</nav>
          <nav className={styles.navItem}>Gerador de link de whatsapp</nav>
          <nav className={styles.navItem}>Sobre</nav>
        </div>
        */}
    </div>
  );
}

export default Header;