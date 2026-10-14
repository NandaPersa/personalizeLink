/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './footer.module.css';
import logo from '~/assets/logo.svg';
import { LinkSimple, WhatsappLogo, Heart, ShieldCheck, Lightning } from '@phosphor-icons/react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brandLink}>
              <Image src={logo} alt="PersonalizeLink" height={38} width={180} className={styles.logo} />
            </Link>
            <p className={styles.brandDesc}>
              A forma mais simples, rápida e moderna de encurtar links longos e gerar links inteligentes para WhatsApp sem custo e sem burocracia.
            </p>
            <div className={styles.trustBadges}>
              <span className={styles.badge}>
                <Lightning size={14} weight="fill" className={styles.badgeIcon} />
                Instantâneo
              </span>
              <span className={styles.badge}>
                <ShieldCheck size={14} weight="fill" className={styles.badgeIcon} />
                Seguro
              </span>
              <span className={styles.badge}>
                100% Gratuito
              </span>
            </div>
          </div>

          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Ferramentas</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/" className={styles.navLink}>
                  <LinkSimple size={16} />
                  Encurtador de URL
                </Link>
              </li>
              <li>
                <Link href="/whatsapp-link" className={styles.navLink}>
                  <WhatsappLogo size={16} />
                  Gerador para WhatsApp
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Institucional</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/sobre" className={styles.navLink}>
                  Sobre o PersonalizeLink
                </Link>
              </li>
              <li>
                <Link href="/#faq" className={styles.navLink}>
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {currentYear} PersonalizeLink. Todos os direitos reservados.
          </p>
          <p className={styles.craftedWith}>
            Feito com <Heart size={14} weight="fill" className={styles.heartIcon} /> para simplificar seus links
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
