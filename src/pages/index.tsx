/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';
import Head from 'next/head';
import { useFormik } from 'formik';
import { z } from 'zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Button from '~/components/Button';
import TextField from '~/components/TextField';
import { api } from '~/utils/api';

import {
  LinkSimple,
  Copy,
  Check,
  ArrowRight,
  Sparkle,
  Lightning,
  ShieldCheck,
  ArrowSquareOut,
  QrCode,
  ShareNetwork,
  CaretDown,
  WhatsappLogo,
  Globe,
  InstagramLogo,
  ChatCircleText,
  Megaphone,
  ChartLineUp,
  CheckCircle,
  XCircle,
} from '@phosphor-icons/react';

import styles from './index.module.css';

export default function Home() {
  const [newLink, setNewLink] = useState<string>('');
  const [isLinkValid, setIsLinkValid] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showQrCode, setShowQrCode] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { mutate: createReference, isLoading } = api.reference.create.useMutation({
    onSuccess(data) {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://2link.fun';
      const smallLink = `${baseUrl}/r/${data.link}`.replace('www.', '');
      setNewLink(smallLink);
      toast.success('Link encurtado com sucesso!');
    },
    onError() {
      toast.error('Não foi possível criar o link curto. Tente novamente.');
    },
  });

  const linkSchema = z.string().refine(
    (value) => value.startsWith('http://') || value.startsWith('https://'),
    { message: 'Digite um link válido começando com http:// ou https://' }
  );

  const formik = useFormik({
    initialValues: {
      longLink: '',
    },
    onSubmit: (values) => {
      try {
        linkSchema.parse(values.longLink.trim());
        setIsLinkValid(true);
        createReference({ origin: values.longLink.trim() });
      } catch (e) {
        if (e instanceof z.ZodError) {
          setIsLinkValid(false);
          const error = JSON.parse(e.message);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
          toast.error(error[0].message);
        }
      }
    },
  });

  const handleCopy = async () => {
    if (!newLink) return;
    try {
      await navigator.clipboard.writeText(newLink);
      setIsCopied(true);
      toast.success('Link copiado para a área de transferência!');
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      toast.error('Não foi possível copiar o link. Tente manualmente.');
    }
  };

  const handleShare = async () => {
    if (!newLink) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Link Encurtado via PersonalizeLink',
          url: newLink,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await handleCopy();
    }
  };

  const handleShortenNewLink = () => {
    setNewLink('');
    setShowQrCode(false);
    setIsCopied(false);
    formik.resetForm();
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        await formik.setFieldValue('longLink', text);
      }
    } catch {
      // Permission denied or not supported
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const qrCodeUrl = newLink
    ? `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(newLink)}`
    : '';

  const faqItems = [
    {
      question: 'O encurtador de link do PersonalizeLink é 100% gratuito?',
      answer:
        'Sim! O PersonalizeLink é um encurtador de links e URLs totalmente gratuito. Você pode encurtar quantos links desejar, sem limites de cliques, sem planos pagos ocultos e sem necessidade de cadastro ou cartão de crédito.',
    },
    {
      question: 'Os links curtos criados expiram após algum tempo?',
      answer:
        'Não, os links criados no PersonalizeLink são permanentes e não expiram. Eles continuarão redirecionando para a sua URL de destino de forma contínua.',
    },
    {
      question: 'Posso usar o link encurtado na bio do Instagram, TikTok e WhatsApp?',
      answer:
        'Com certeza! Nossos links são curtos, limpos e otimizados exatamente para caber perfeitamente na bio do Instagram, descrições do TikTok, YouTube, mensagens de WhatsApp, Telegram e campanhas de SMS.',
    },
    {
      question: 'Posso encurtar links de afiliados (Shopee, Amazon, Hotmart, Kiwify)?',
      answer:
        'Sim! O PersonalizeLink aceita links de afiliados de qualquer plataforma. O link curto preserva todos os seus parâmetros de rastreamento (UTM, tags de afiliados) sem alterar suas comissões.',
    },
    {
      question: 'Como funciona o QR Code gerado junto com o link?',
      answer:
        'Para cada link encurtado, nosso sistema gera automaticamente um código QR em alta resolução. Você pode visualizá-lo na hora e baixá-lo como imagem para imprimir em panfletos, cardápios, banners ou cartões de visita.',
    },
    {
      question: 'O encurtador exibe anúncios ou contadores antes de redirecionar?',
      answer:
        'Não! Diferente de outros encurtadores que obrigam o visitante a esperar 5 ou 10 segundos vendo anúncios invasivos, o PersonalizeLink faz o redirecionamento imediato e direto para o seu site ou link de destino.',
    },
  ];

  // Schema.org Structured Data for Google Rich Snippets
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://www.2link.fun/#website',
        url: 'https://www.2link.fun/',
        name: 'PersonalizeLink',
        description: 'Encurtador de link e URL grátis e gerador de link para WhatsApp.',
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://www.2link.fun/#webapp',
        name: 'Encurtador de Link PersonalizeLink',
        url: 'https://www.2link.fun/',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'BRL',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.2link.fun/#faq',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Head>
        {/* Core Primary SEO Tags */}
        <title>Encurtador de Link e URL Grátis | PersonalizeLink</title>
        <meta
          name="description"
          content="Encurtador de link e URL 100% grátis, rápido e seguro. Encurte links longos em segundos, gere QR Code gratuito e compartilhe no Instagram, WhatsApp e redes sociais."
        />
        <meta
          name="keywords"
          content="encurtador de link, encurtador de url, encurtar link, link curto, encurtador de link gratis, encurtador de link whatsapp, encurtar url, encurtador para bio do instagram, encurtador de link shopee, criar link curto"
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://www.2link.fun/" />

        {/* OpenGraph Tags for Social Sharing */}
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Encurtador de Link e URL Grátis | PersonalizeLink" />
        <meta
          property="og:description"
          content="Encurte links longos em URLs curtas e elegantes. 100% gratuito, sem anúncios e com QR Code automático."
        />
        <meta property="og:url" content="https://www.2link.fun/" />
        <meta property="og:site_name" content="PersonalizeLink" />
        <meta property="og:image" content="https://www.2link.fun/backgroundEncLink.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="PersonalizeLink - Encurtador de Link Grátis" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Encurtador de Link e URL Grátis | PersonalizeLink" />
        <meta
          name="twitter:description"
          content="Encurte links longos em URLs curtas e elegantes. 100% gratuito, sem anúncios e com QR Code automático."
        />
        <meta name="twitter:image" content="https://www.2link.fun/backgroundEncLink.webp" />

        {/* JSON-LD Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className={styles.pageWrapper}>
        <Header />

        <main className={styles.main}>
          {/* Hero Section with Search-Intent Focus */}
          <section className={styles.heroSection}>
            <div className={styles.badgeWrapper}>
              <span className={styles.heroBadge}>
                <Sparkle size={14} weight="fill" className={styles.badgeSparkle} />
                Encurtador de Link Grátis • Rápido & Seguro
              </span>
            </div>

            <h1 className={styles.heroTitle}>
              Encurtador de Link e URL:{' '}
              <span className={styles.gradientText}>rápido, gratuito e sem limites</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Transforme links longos e complexos em URLs curtas, elegantes e fáceis de compartilhar.
              Sem anúncios irritantes, sem cadastro obrigatório e com QR Code gerado na hora.
            </p>

            {/* Action Card */}
            <div className={styles.cardContainer}>
              <div className={styles.actionCard}>
                {!newLink ? (
                  <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                      <TextField
                        type="url"
                        name="longLink"
                        label="Cole sua URL ou link longo abaixo"
                        placeholder="Ex: https://seusite.com.br/pagina-com-link-muito-longo?utm_source=instagram"
                        formik={formik}
                        isLinkValid={isLinkValid}
                        icon={<LinkSimple size={20} />}
                        hint="Formatos suportados: http:// ou https://"
                      />
                      {!formik.values.longLink && (
                        <button
                          type="button"
                          className={styles.pasteButton}
                          onClick={() => {
                            void handlePasteClipboard();
                          }}
                        >
                          Colar da área de transferência
                        </button>
                      )}
                    </div>

                    <div className={styles.buttonWrapper}>
                      <Button
                        id="encurtar-link"
                        type="submit"
                        size="lg"
                        fullWidth
                        loading={isLoading}
                        rightIcon={<ArrowRight size={20} weight="bold" />}
                      >
                        Encurtar Link Agora
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className={styles.resultBox}>
                    <div className={styles.resultHeader}>
                      <div className={styles.successBadge}>
                        <Check size={18} weight="bold" />
                        <span>Link encurtado com sucesso!</span>
                      </div>
                    </div>

                    {/* Original Destination preview */}
                    <div className={styles.originLinkBox}>
                      <span className={styles.originLabel}>Destino original:</span>
                      <a
                        href={formik.values.longLink}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.originLinkText}
                      >
                        <Globe size={16} />
                        <span className={styles.originUrl}>{formik.values.longLink}</span>
                      </a>
                    </div>

                    {/* Short Link Output Box */}
                    <div className={styles.shortLinkBox}>
                      <div className={styles.shortLinkInfo}>
                        <span className={styles.shortLinkLabel}>Seu link curto:</span>
                        <a
                          id="small-link"
                          href={newLink}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.shortLinkUrl}
                        >
                          {newLink}
                        </a>
                      </div>

                      <div className={styles.shortLinkActions}>
                        <Button
                          id="copiar-link"
                          type="button"
                          variant={isCopied ? 'secondary' : 'primary'}
                          onClick={() => {
                            void handleCopy();
                          }}
                          leftIcon={isCopied ? <Check size={18} weight="bold" /> : <Copy size={18} />}
                        >
                          {isCopied ? 'Copiado!' : 'Copiar'}
                        </Button>

                        <a
                          href={newLink}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.actionIconBtn}
                          title="Testar link em nova aba"
                        >
                          <ArrowSquareOut size={20} />
                        </a>

                        <button
                          type="button"
                          className={`${styles.actionIconBtn} ${showQrCode ? styles.actionActive : ''}`}
                          onClick={() => setShowQrCode(!showQrCode)}
                          title="Ver QR Code"
                        >
                          <QrCode size={20} />
                        </button>

                        <button
                          type="button"
                          className={styles.actionIconBtn}
                          onClick={() => {
                            void handleShare();
                          }}
                          title="Compartilhar"
                        >
                          <ShareNetwork size={20} />
                        </button>
                      </div>
                    </div>

                    {/* QR Code Section */}
                    {showQrCode && (
                      <div className={styles.qrCodeSection}>
                        <div className={styles.qrCodeWrapper}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={qrCodeUrl}
                            alt="QR Code do Link Encurtado"
                            className={styles.qrCodeImage}
                            width={220}
                            height={220}
                          />
                        </div>
                        <div className={styles.qrCodeInfo}>
                          <h4>QR Code Pronto para Uso</h4>
                          <p>Aponte a câmera do celular para testar o direcionamento.</p>
                          <a
                            href={qrCodeUrl}
                            download="qrcode-personalizelink.png"
                            target="_blank"
                            rel="noreferrer"
                            className={styles.downloadQrBtn}
                          >
                            Baixar Imagem do QR Code
                          </a>
                        </div>
                      </div>
                    )}

                    <div className={styles.resetWrapper}>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleShortenNewLink}
                        fullWidth
                      >
                        Encurtar outro link
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Features Highlights */}
          <section className={styles.featuresSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Por que escolher nosso encurtador de link?</h2>
              <p className={styles.sectionSubtitle}>
                Criado com foco em velocidade, privacidade e facilidade para quem precisa encurtar URLs diariamente.
              </p>
            </div>

            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Lightning size={28} weight="fill" className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Redirecionamento Instantâneo</h3>
                <p className={styles.featureDesc}>
                  Seus visitantes chegam ao destino imediatamente. Sem páginas intermediárias,
                  captchas irritantes ou contadores regressivos.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <ShieldCheck size={28} weight="fill" className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Confiável e 100% Seguro</h3>
                <p className={styles.featureDesc}>
                  Totalmente protegido por criptografia SSL (HTTPS). Seus links são preservados e
                  acessíveis com segurança máxima.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <QrCode size={28} weight="fill" className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>QR Code Automático Grátis</h3>
                <p className={styles.featureDesc}>
                  Ao encurtar qualquer URL, você ganha automaticamente um QR Code pronto para
                  imprimir em cartões, cardápios ou banners.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <WhatsappLogo size={28} weight="fill" className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Gerador de WhatsApp Integrado</h3>
                <p className={styles.featureDesc}>
                  Crie links inteligentes com mensagem personalizada que abrem direto na conversa do
                  WhatsApp com seus clientes.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Steps Section */}
          <section className={styles.stepsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Como encurtar um link em 3 passos simples</h2>
              <p className={styles.sectionSubtitle}>Nosso processo é rápido e não requer nenhum tipo de cadastro.</p>
            </div>

            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>1</div>
                <h3 className={styles.stepTitle}>Cole sua URL longa</h3>
                <p className={styles.stepDesc}>
                  Copie o link que você deseja encurtar e cole no campo principal no topo da página.
                </p>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>2</div>
                <h3 className={styles.stepTitle}>Clique em Encurtar Link</h3>
                <p className={styles.stepDesc}>
                  Nosso sistema cria um código único, seguro e ultracompacto para você em menos de 1 segundo.
                </p>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>3</div>
                <h3 className={styles.stepTitle}>Copie e Compartilhe</h3>
                <p className={styles.stepDesc}>
                  Copie o link curto ou baixe o QR Code para divulgar no Instagram, WhatsApp, e-mail ou anúncios.
                </p>
              </div>
            </div>
          </section>

          {/* Deep Semantic SEO Content: Where to use short links */}
          <section className={styles.useCasesSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Onde e como usar links encurtados?</h2>
              <p className={styles.sectionSubtitle}>
                Links curtos aumentam a taxa de cliques (CTR) e trazem um aspecto muito mais profissional para a sua marca.
              </p>
            </div>

            <div className={styles.useCasesGrid}>
              <div className={styles.useCaseCard}>
                <div className={styles.useCaseHeader}>
                  <InstagramLogo size={24} className={styles.useCaseIcon} />
                  <h3>Bio do Instagram e TikTok</h3>
                </div>
                <p>
                  O espaço na biografia das redes sociais é precioso. Um link encurtado fica esteticamente agradável,
                  evita quebra de linhas e transmite confiança para quem clica.
                </p>
              </div>

              <div className={styles.useCaseCard}>
                <div className={styles.useCaseHeader}>
                  <ChatCircleText size={24} className={styles.useCaseIcon} />
                  <h3>Mensagens de WhatsApp e SMS</h3>
                </div>
                <p>
                  URLs gigantes com códigos UTM e parâmetros de rastreamento assustam clientes em mensagens. Links curtos
                  são amigáveis, fáceis de ler e aumentam as chances de clique.
                </p>
              </div>

              <div className={styles.useCaseCard}>
                <div className={styles.useCaseHeader}>
                  <Megaphone size={24} className={styles.useCaseIcon} />
                  <h3>Anúncios e Tráfego Pago</h3>
                </div>
                <p>
                  Otimize anúncios no Google Ads, Facebook Ads e postagens no Twitter/X onde o limite de caracteres é restrito,
                  mantendo todos os seus parâmetros de rastreamento ativos.
                </p>
              </div>

              <div className={styles.useCaseCard}>
                <div className={styles.useCaseHeader}>
                  <ChartLineUp size={24} className={styles.useCaseIcon} />
                  <h3>Materiais Impressos com QR Code</h3>
                </div>
                <p>
                  Ideal para cartões de visita, panfletos, cardápios de restaurantes e outdoors. O QR Code gerado facilita o
                  acesso direto pelo celular sem precisar digitar URLs longas.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table / Semantic Authority Section */}
          <section className={styles.comparisonSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Por que o PersonalizeLink é a melhor alternativa?</h2>
              <p className={styles.sectionSubtitle}>
                Compare e veja porque milhares de pessoas escolhem o PersonalizeLink todos os dias.
              </p>
            </div>

            <div className={styles.comparisonCard}>
              <div className={styles.comparisonRowHeader}>
                <span className={styles.colFeature}>Recursos</span>
                <span className={styles.colOur}>PersonalizeLink</span>
                <span className={styles.colOthers}>Outros Encurtadores</span>
              </div>

              <div className={styles.comparisonRow}>
                <span className={styles.colFeature}>100% Gratuito sem limites</span>
                <span className={styles.colOur}><CheckCircle size={20} weight="fill" className={styles.iconCheck} /> Sim</span>
                <span className={styles.colOthers}><XCircle size={20} weight="fill" className={styles.iconCross} /> Cobram mensalidade</span>
              </div>

              <div className={styles.comparisonRow}>
                <span className={styles.colFeature}>Sem anúncios abusivos</span>
                <span className={styles.colOur}><CheckCircle size={20} weight="fill" className={styles.iconCheck} /> Sim, redirecionamento direto</span>
                <span className={styles.colOthers}><XCircle size={20} weight="fill" className={styles.iconCross} /> Telas cheias de propagandas</span>
              </div>

              <div className={styles.comparisonRow}>
                <span className={styles.colFeature}>QR Code grátis incluso</span>
                <span className={styles.colOur}><CheckCircle size={20} weight="fill" className={styles.iconCheck} /> Automático em todo link</span>
                <span className={styles.colOthers}><XCircle size={20} weight="fill" className={styles.iconCross} /> Cobram extra ou limitado</span>
              </div>

              <div className={styles.comparisonRow}>
                <span className={styles.colFeature}>Sem necessidade de cadastro</span>
                <span className={styles.colOur}><CheckCircle size={20} weight="fill" className={styles.iconCheck} /> Acesso imediato</span>
                <span className={styles.colOthers}><XCircle size={20} weight="fill" className={styles.iconCross} /> Exigem e-mail e senha</span>
              </div>

              <div className={styles.comparisonRow}>
                <span className={styles.colFeature}>Gerador de Link WhatsApp</span>
                <span className={styles.colOur}><CheckCircle size={20} weight="fill" className={styles.iconCheck} /> Integrado com prévia ao vivo</span>
                <span className={styles.colOthers}><XCircle size={20} weight="fill" className={styles.iconCross} /> Não oferecem</span>
              </div>
            </div>
          </section>

          {/* FAQ Accordion Section with Rich Schema.org */}
          <section id="faq" className={styles.faqSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Perguntas Frequentes sobre Encurtador de Link</h2>
              <p className={styles.sectionSubtitle}>
                Tire suas dúvidas sobre como encurtar links e utilizar a plataforma gratuitamente.
              </p>
            </div>

            <div className={styles.faqList}>
              {faqItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`${styles.faqItem} ${openFaq === idx ? styles.faqOpen : ''}`}
                  onClick={() => toggleFaq(idx)}
                >
                  <button type="button" className={styles.faqQuestion}>
                    <span>{item.question}</span>
                    <CaretDown
                      size={18}
                      weight="bold"
                      className={`${styles.faqCaret} ${openFaq === idx ? styles.faqCaretOpen : ''}`}
                    />
                  </button>
                  {openFaq === idx && <p className={styles.faqAnswer}>{item.answer}</p>}
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
