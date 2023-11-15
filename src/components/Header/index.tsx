/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from 'next/image';
import React, { useState } from 'react';
import styles from "./header.module.css";

import logo from '~/assets/logo.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useScreenSize from '~/hooks/resize';
import { List, X } from 'phosphor-react';

enum Routes {
  Home = '/',
  Whatsapp = '/whatsapp-link',
  About = '/sobre'
}

const Header: React.FC = () => {
  const pathname = usePathname()
  const {isMobile} = useScreenSize();
  const [openMenu, setOpenMenu]  = useState<boolean>(isMobile ? true : false);

  function handleOpenMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <div className={styles.container}>
      <Link href={'/'} aria-label='Logo personalize'>
        <Image src={logo} alt='Logo personalize' />
      </Link>
      <nav>
        {isMobile && (
          <List className={styles.iconMenu} onClick={() => handleOpenMenu()} />
        )}
        {openMenu && (
          <button className={styles.btnClose} type={'button'} onClick={() => handleOpenMenu()}>
            <X />
          </button>
        )}
          {!isMobile && (
          <ul className={isMobile ? styles.navbarMobile : styles.navbar}>
            <li><Link className={pathname === Routes.Home ? styles.navItemActive : styles.navItem} href={Routes.Home}>Encurtar link</Link></li>
            <li><Link className={pathname === Routes.Whatsapp ? styles.navItemActive : styles.navItem} href={Routes.Whatsapp}>Gerar link do whatsapp</Link></li>
            <li><Link className={pathname === Routes.About ? styles.navItemActive : styles.navItem} href={Routes.About}>Sobre</Link></li>
          </ul>
          )}

        {isMobile && openMenu && (
          <ul className={isMobile ? styles.navbarMobile : styles.navbar}>
            <li><Link className={pathname === Routes.Home ? styles.navItemActive : styles.navItem} href={Routes.Home}>Encurtador de link</Link></li>
            <li><Link className={pathname === Routes.Whatsapp ? styles.navItemActive : styles.navItem} href={Routes.Whatsapp}>Gerador de link de whatsapp</Link></li>
            <li><Link className={pathname === Routes.About ? styles.navItemActive : styles.navItem} href={Routes.About}>Sobre</Link></li>
          </ul>
          )}
        
      </nav>
    </div>
  );
}

export default Header;