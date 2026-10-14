/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from './header.module.css';
import logo from '~/assets/logo.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, X, LinkSimple, WhatsappLogo, Info, ArrowRight } from '@phosphor-icons/react';

enum Routes {
  Home = '/',
  Whatsapp = '/whatsapp-link',
  About = '/sobre'
}

const Header: React.FC = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  const navItems = [
    { href: Routes.Home, label: 'Encurtador de Link', icon: <LinkSimple size={18} /> },
    { href: Routes.Whatsapp, label: 'Gerador WhatsApp', icon: <WhatsappLogo size={18} /> },
    { href: Routes.About, label: 'Sobre', icon: <Info size={18} /> },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        <Link href={Routes.Home} aria-label="PersonalizeLink - Página inicial" className={styles.logoLink}>
          <Image src={logo} alt="PersonalizeLink Logo" priority className={styles.logoImage} />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Navegação principal">
          <ul className={styles.navList}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className={styles.mobileActions}>
          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setOpenMenu(!openMenu)}
            aria-label={openMenu ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={openMenu}
          >
            {openMenu ? <X size={26} weight="bold" /> : <List size={26} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {openMenu && (
        <div className={styles.mobileBackdrop} onClick={() => setOpenMenu(false)}>
          <div className={styles.mobileDrawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>Navegação</span>
              <button
                type="button"
                className={styles.drawerCloseBtn}
                onClick={() => setOpenMenu(false)}
                aria-label="Fechar menu"
              >
                <X size={22} weight="bold" />
              </button>
            </div>

            <ul className={styles.mobileNavList}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${styles.mobileNavItem} ${isActive ? styles.mobileNavItemActive : ''}`}
                    >
                      <div className={styles.mobileNavLeft}>
                        <span className={styles.mobileNavIcon}>{item.icon}</span>
                        <span className={styles.mobileNavText}>{item.label}</span>
                      </div>
                      <ArrowRight size={16} className={styles.mobileNavArrow} />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className={styles.drawerFooter}>
              <p>PersonalizeLink • 100% Gratuito</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;