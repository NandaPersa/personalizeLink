import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Button from '~/components/Button';
import {
  Sparkle,
  ShieldCheck,
  Lightning,
  Heart,
  LinkSimple,
  WhatsappLogo,
  CheckCircle,
} from '@phosphor-icons/react';
import styles from './sobre.module.css';

export default function Sobre() {
  return (
    <>
      <Head>
        <title>Sobre o PersonalizeLink | Encurtador de Links e Gerador WhatsApp</title>
        <meta
          name="description"
          content="Conheça a história e o propósito do PersonalizeLink. Nossa missão é oferecer ferramentas gratuitas, rápidas e práticas para simplificar seus links."
        />
        <link rel="canonical" href="https://www.2link.fun/sobre" />
      </Head>

      <div className={styles.pageWrapper}>
        <Header />

        <main className={styles.main}>
          <section className={styles.heroSection}>
            <div className={styles.badgeWrapper}>
              <span className={styles.badge}>
                <Sparkle size={14} weight="fill" className={styles.badgeIcon} />
                Nossa Missão
              </span>
            </div>

            <h1 className={styles.title}>
              Conectando pessoas através de{' '}
              <span className={styles.gradientText}>links inteligentes e simples.</span>
            </h1>

            <p className={styles.subtitle}>
              O PersonalizeLink nasceu para eliminar a complexidade na hora de compartilhar links.
              Acreditamos que todo mundo merece ferramentas ágeis, gratuitas e sem propagandas chatas.
            </p>
          </section>

          {/* Pillars Grid */}
          <section className={styles.pillarsSection}>
            <div className={styles.pillarsGrid}>
              <div className={styles.pillarCard}>
                <div className={styles.iconCircle}>
                  <Lightning size={26} weight="fill" />
                </div>
                <h3>Agilidade Máxima</h3>
                <p>
                  Criado com tecnologia moderna de alto desempenho para garantir que o
                  redirecionamento de links seja instantâneo, sem nenhuma tela de espera.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.iconCircle}>
                  <ShieldCheck size={26} weight="fill" />
                </div>
                <h3>Privacidade e Segurança</h3>
                <p>
                  Não comercializamos seus dados e não exibimos anúncios invasivos. Seus links são
                  protegidos com criptografia SSL em todos os momentos.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.iconCircle}>
                  <Heart size={26} weight="fill" />
                </div>
                <h3>100% Gratuito</h3>
                <p>
                  Acesso livre para estudantes, criadores de conteúdo, pequenos negócios e grandes
                  empresas. Sem planos ocultos ou limites arbitrários.
                </p>
              </div>
            </div>
          </section>

          {/* Detailed Story Section */}
          <section className={styles.storySection}>
            <div className={styles.storyCard}>
              <h2 className={styles.storyTitle}>Por que o PersonalizeLink é diferente?</h2>
              <div className={styles.storyContent}>
                <div className={styles.checkItem}>
                  <CheckCircle size={22} weight="fill" className={styles.checkIcon} />
                  <div>
                    <h4>Sem burocracia ou cadastro obrigatório</h4>
                    <p>Você entra na página, cola seu link e sai com ele encurtado em segundos.</p>
                  </div>
                </div>

                <div className={styles.checkItem}>
                  <CheckCircle size={22} weight="fill" className={styles.checkIcon} />
                  <div>
                    <h4>QR Code gerado automaticamente</h4>
                    <p>Qualquer link curto já vem com seu próprio código QR para download em alta resolução.</p>
                  </div>
                </div>

                <div className={styles.checkItem}>
                  <CheckCircle size={22} weight="fill" className={styles.checkIcon} />
                  <div>
                    <h4>Gerador integrado para WhatsApp</h4>
                    <p>Crie mensagens pré-preenchidas para atendimento comercial, agendamentos e suporte.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaCard}>
              <h2>Pronto para começar?</h2>
              <p>Escolha a ferramenta que você precisa agora mesmo e aproveite.</p>
              <div className={styles.ctaButtons}>
                <Link href="/">
                  <Button
                    size="lg"
                    leftIcon={<LinkSimple size={20} />}
                  >
                    Encurtar um Link
                  </Button>
                </Link>
                <Link href="/whatsapp-link">
                  <Button
                    variant="whatsapp"
                    size="lg"
                    leftIcon={<WhatsappLogo size={20} weight="fill" />}
                  >
                    Gerar Link de WhatsApp
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
