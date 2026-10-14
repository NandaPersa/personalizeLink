/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useMemo } from 'react';
import Head from 'next/head';
import { useFormik } from 'formik';
import { z } from 'zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import TelefoneBrasileiroInput from 'react-telefone-brasileiro';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Button from '~/components/Button';
import Textarea from '~/components/Textearea';
import { api } from '~/utils/api';

import {
  WhatsappLogo,
  Copy,
  Check,
  ArrowRight,
  QrCode,
  ArrowSquareOut,
  ShareNetwork,
  ChatsCircle,
  TrendUp,
  Devices,
  CheckFat,
  CaretDown,
  ShoppingBag,
  CalendarCheck,
  Headset,
  Sparkle,
  CheckCircle,
} from '@phosphor-icons/react';

import styles from './whatsapp-link.module.css';

export default function WhatsappLinkPage() {
  const [newLink, setNewLink] = useState<string>('');
  const [shortLink, setShortLink] = useState<string>('');
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showQrCode, setShowQrCode] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { mutate: createReference, isLoading } = api.reference.create.useMutation({
    onSuccess(data) {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://2link.fun';
      const smallLink = `${baseUrl}/r/${data.link}`.replace('www.', '');
      setShortLink(smallLink);
    },
    onError() {
      // In case short link fails, the direct WhatsApp link is still functional
    },
  });

  function validateBrazilianPhoneNumber(phone: string) {
    const numericPhone = phone.replace(/\D/g, '');
    return numericPhone.length === 11 && /^[1-9][1-9]/.test(numericPhone);
  }

  const phoneSchema = z.string().refine(validateBrazilianPhoneNumber, {
    message: 'Digite um número de celular válido com DDD (Ex: 11 99999-9999)',
  });

  const formik = useFormik({
    initialValues: {
      phone: '',
      message: '',
    },
    onSubmit: (values) => {
      try {
        phoneSchema.parse(values.phone);
        setIsPhoneValid(true);

        const formattedPhoneNumber = values.phone.replace(/[^0-9]+/g, '');
        const message = values.message.trim();

        const whatsappLink = `https://api.whatsapp.com/send?phone=55${formattedPhoneNumber}${
          message ? `&text=${encodeURIComponent(message)}` : ''
        }`;

        setNewLink(whatsappLink);
        createReference({ origin: whatsappLink });
        toast.success('Link do WhatsApp gerado com sucesso!');
      } catch (e) {
        setIsPhoneValid(false);
        if (e instanceof z.ZodError) {
          const error = JSON.parse(e.message);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
          toast.error(error[0].message);
        }
      }
    },
  });

  const handleCopy = async () => {
    const linkToCopy = shortLink || newLink;
    if (!linkToCopy) return;

    try {
      await navigator.clipboard.writeText(linkToCopy);
      setIsCopied(true);
      toast.success('Link copiado para a área de transferência!');
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      toast.error('Não foi possível copiar o link.');
    }
  };

  const handleShare = async () => {
    const targetLink = shortLink || newLink;
    if (!targetLink) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Link do WhatsApp',
          url: targetLink,
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
    setShortLink('');
    setShowQrCode(false);
    setIsCopied(false);
    setIsPhoneValid(true);
    formik.resetForm();
  };

  const quickMessages = [
    'Olá! Gostaria de mais informações.',
    'Olá, vim pelo seu site e tenho uma dúvida.',
    'Quero agendar um horário com você.',
    'Gostaria de solicitar um orçamento.',
  ];

  const messageTemplates = [
    {
      title: 'Vendas e Orçamento',
      icon: <ShoppingBag size={22} className={styles.templateIcon} />,
      text: 'Olá! Vi os seus produtos no catálogo e gostaria de solicitar um orçamento.',
    },
    {
      title: 'Agendamento de Horário',
      icon: <CalendarCheck size={22} className={styles.templateIcon} />,
      text: 'Olá! Gostaria de verificar os horários disponíveis para agendamento esta semana.',
    },
    {
      title: 'Suporte e Atendimento',
      icon: <Headset size={22} className={styles.templateIcon} />,
      text: 'Olá, preciso de ajuda com um pedido recente. Podem me auxiliar?',
    },
    {
      title: 'Contato via Instagram',
      icon: <Sparkle size={22} className={styles.templateIcon} />,
      text: 'Olá! Encontrei o seu perfil no Instagram e gostaria de saber mais.',
    },
  ];

  const handleSelectQuickMessage = (msg: string) => {
    void formik.setFieldValue('message', msg);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Formatted current time for the live preview
  const currentTime = useMemo(() => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }, []);

  const qrCodeUrl = (shortLink || newLink)
    ? `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
        shortLink || newLink
      )}`
    : '';

  const faqItems = [
    {
      question: 'O gerador de link do WhatsApp é gratuito?',
      answer:
        'Sim! O gerador de link do WhatsApp do PersonalizeLink é 100% gratuito. Você pode criar quantos links personalizados desejar, sem limite de uso e sem cadastro.',
    },
    {
      question: 'Como funciona o link direto com mensagem pronta no WhatsApp?',
      answer:
        'O link utiliza o protocolo oficial do WhatsApp (wa.me / api.whatsapp.com). Quando o usuário clica no link, o aplicativo do WhatsApp abre diretamente na conversa com o número informado, já com o texto que você configurou preenchido na caixa de digitação.',
    },
    {
      question: 'O cliente precisa salvar meu número na agenda para me mandar mensagem?',
      answer:
        'Não! Essa é a principal vantagem do link de WhatsApp: o cliente inicia uma conversa com apenas um clique, sem precisar salvar o contato antes no celular.',
    },
    {
      question: 'O link funciona no WhatsApp Web e no celular (Android e iPhone)?',
      answer:
        'Sim, é 100% compatível. Se o cliente clicar no computador, ele será direcionado para o WhatsApp Web ou aplicativo de desktop. Se clicar pelo celular, abrirá o aplicativo oficial do WhatsApp.',
    },
    {
      question: 'Posso usar o link do WhatsApp na bio do Instagram e anúncios?',
      answer:
        'Com certeza! Além do link oficial longo, o PersonalizeLink gera automaticamente um link curto e compacto para você colocar na bio do Instagram, TikTok, anúncios do Facebook/Google e mensagens de SMS.',
    },
    {
      question: 'O gerador funciona com contas do WhatsApp Business?',
      answer:
        'Sim! Funciona perfeitamente tanto com contas normais quanto com contas do WhatsApp Business.',
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
        description: 'Encurtador de link e gerador de link para WhatsApp gratuito.',
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://www.2link.fun/whatsapp-link#webapp',
        name: 'Gerador de Link do WhatsApp PersonalizeLink',
        url: 'https://www.2link.fun/whatsapp-link',
        applicationCategory: 'CommunicationApplication',
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
        '@id': 'https://www.2link.fun/whatsapp-link#faq',
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
        <title>Gerador de Link do WhatsApp Grátis com Mensagem | PersonalizeLink</title>
        <meta
          name="description"
          content="Gerador de link do WhatsApp 100% grátis. Crie seu link direto de WhatsApp com mensagem personalizada em segundos. Gere também link curto e QR Code gratuito."
        />
        <meta
          name="keywords"
          content="gerador de link do whatsapp, gerador de link whatsapp, link whatsapp com mensagem, criar link whatsapp, link direto whatsapp, link para whatsapp, link zap, wa.me gerador, link whatsapp gratis, mensagem personalizada whatsapp"
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://www.2link.fun/whatsapp-link" />

        {/* OpenGraph Tags for Social Sharing */}
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Gerador de Link do WhatsApp Grátis com Mensagem | PersonalizeLink" />
        <meta
          property="og:description"
          content="Crie seu link de WhatsApp com mensagem personalizada em segundos. Inicie conversas com apenas 1 clique, sem precisar salvar contato."
        />
        <meta property="og:url" content="https://www.2link.fun/whatsapp-link" />
        <meta property="og:site_name" content="PersonalizeLink" />
        <meta property="og:image" content="https://www.2link.fun/backgroundWhatsapp.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="PersonalizeLink - Gerador de Link do WhatsApp" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gerador de Link do WhatsApp Grátis com Mensagem | PersonalizeLink" />
        <meta
          name="twitter:description"
          content="Crie seu link de WhatsApp com mensagem personalizada em segundos. Inicie conversas com apenas 1 clique."
        />
        <meta name="twitter:image" content="https://www.2link.fun/backgroundWhatsapp.webp" />

        {/* JSON-LD Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className={styles.pageWrapper}>
        <Header />

        <main className={styles.main}>
          {/* Hero Section */}
          <section className={styles.heroSection}>
            <div className={styles.badgeWrapper}>
              <span className={styles.heroBadge}>
                <WhatsappLogo size={16} weight="fill" className={styles.badgeWhatsappIcon} />
                Gerador de Link do WhatsApp • 100% Gratuito
              </span>
            </div>

            <h1 className={styles.heroTitle}>
              Gerador de Link do WhatsApp:{' '}
              <span className={styles.gradientText}>crie links diretos com mensagem pronta</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Facilite o contato de novos clientes para seu negócio. Eles iniciam uma conversa com você
              em apenas 1 clique, sem precisar salvar seu número na agenda telefônica.
            </p>

            {/* Split Container: Form + Live Chat Preview */}
            <div className={styles.interactiveContainer}>
              {/* Form Card */}
              <div className={styles.formCard}>
                {!newLink ? (
                  <form onSubmit={formik.handleSubmit} className={styles.form}>
                    {/* Phone Input with Brazilian mask */}
                    <div className={styles.inputBlock}>
                      <label className={styles.inputLabel} htmlFor="phone">
                        Número de Celular com DDD (Brasil)*
                      </label>
                      <div
                        className={`${styles.phoneInputWrapper} ${
                          !isPhoneValid ? styles.phoneInputError : ''
                        }`}
                      >
                        <span className={styles.countryFlag}>🇧🇷 +55</span>
                        <TelefoneBrasileiroInput
                          id="phone"
                          value={formik.values.phone}
                          onChange={(event: { target: HTMLInputElement }) =>
                            formik.setFieldValue('phone', event.target.value)
                          }
                          temDDD
                          separaDDD
                          placeholder="(11) 99999-9999"
                          className={styles.rawPhoneInput}
                        />
                      </div>
                      {!isPhoneValid && (
                        <p className={styles.errorText} role="alert">
                          Por favor, digite um celular válido com DDD (11 dígitos).
                        </p>
                      )}
                    </div>

                    {/* Textarea with Custom Message */}
                    <div className={styles.inputBlock}>
                      <Textarea
                        name="message"
                        label="Mensagem Personalizada Inicial (Opcional)"
                        placeholder="Ex: Olá! Vi seu anúncio e gostaria de saber mais sobre os serviços."
                        formik={formik}
                        hint={`${formik.values.message.length} caracteres`}
                        rows={3}
                      />
                    </div>

                    {/* Quick suggestion chips */}
                    <div className={styles.quickSuggestions}>
                      <span className={styles.quickLabel}>Sugestões rápidas de mensagem:</span>
                      <div className={styles.chipsWrapper}>
                        {quickMessages.map((msg, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={styles.chipButton}
                            onClick={() => handleSelectQuickMessage(msg)}
                          >
                            + {msg}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.buttonWrapper}>
                      <Button
                        id="encurtar-link"
                        type="submit"
                        variant="whatsapp"
                        size="lg"
                        fullWidth
                        loading={isLoading}
                        leftIcon={<WhatsappLogo size={20} weight="fill" />}
                        rightIcon={<ArrowRight size={18} weight="bold" />}
                      >
                        Gerar Link do WhatsApp
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className={styles.resultBox}>
                    <div className={styles.resultHeader}>
                      <div className={styles.successBadge}>
                        <CheckFat size={18} weight="fill" />
                        <span>Link do WhatsApp gerado com sucesso!</span>
                      </div>
                    </div>

                    {/* Short Link Box */}
                    <div className={styles.shortLinkBox}>
                      <div className={styles.shortLinkInfo}>
                        <span className={styles.shortLinkLabel}>Link curto gerado:</span>
                        <a
                          id="small-link"
                          href={shortLink || newLink}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.shortLinkUrl}
                        >
                          {shortLink || 'Gerando link curto...'}
                        </a>
                      </div>

                      <div className={styles.shortLinkActions}>
                        <Button
                          id="copiar-link"
                          type="button"
                          variant={isCopied ? 'secondary' : 'whatsapp'}
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
                          title="Abrir conversa no WhatsApp"
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

                    {/* Direct WhatsApp link */}
                    <div className={styles.directLinkBox}>
                      <span className={styles.directLinkLabel}>Link Direto Oficial do WhatsApp:</span>
                      <a
                        href={newLink}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.directLinkUrl}
                      >
                        {newLink}
                      </a>
                    </div>

                    {/* QR Code Section */}
                    {showQrCode && (
                      <div className={styles.qrCodeSection}>
                        <div className={styles.qrCodeWrapper}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={qrCodeUrl}
                            alt="QR Code do WhatsApp"
                            className={styles.qrCodeImage}
                            width={200}
                            height={200}
                          />
                        </div>
                        <div className={styles.qrCodeInfo}>
                          <h4>QR Code do seu WhatsApp</h4>
                          <p>
                            Ideal para colocar em cardápios, vitrines, panfletos ou cartões de visita.
                          </p>
                          <a
                            href={qrCodeUrl}
                            download="qrcode-whatsapp.png"
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
                        Gerar outro link para WhatsApp
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Live WhatsApp Chat Preview Device */}
              <div className={styles.previewContainer}>
                <div className={styles.phoneMockup}>
                  {/* Mockup Notch */}
                  <div className={styles.mockupNotch}>
                    <div className={styles.mockupSpeaker} />
                  </div>

                  {/* WhatsApp App Header */}
                  <div className={styles.waHeader}>
                    <div className={styles.waAvatar}>
                      <WhatsappLogo size={24} weight="fill" />
                    </div>
                    <div className={styles.waHeaderInfo}>
                      <span className={styles.waContactName}>
                        {formik.values.phone ? formik.values.phone : 'Seu WhatsApp'}
                      </span>
                      <span className={styles.waStatus}>online</span>
                    </div>
                  </div>

                  {/* WhatsApp Chat Body */}
                  <div className={styles.waBody}>
                    <div className={styles.waDateBadge}>HOJE</div>

                    {/* Speech Bubble */}
                    <div className={styles.waMessageBubble}>
                      <p className={styles.waMessageText}>
                        {formik.values.message ||
                          'Olá! Gostaria de conversar com você sobre seus serviços.'}
                      </p>
                      <div className={styles.waMessageMeta}>
                        <span className={styles.waMessageTime}>{currentTime}</span>
                        <span className={styles.waDoubleCheck}>✓✓</span>
                      </div>
                    </div>
                  </div>

                  {/* Mockup Bottom bar */}
                  <div className={styles.waBottomBar}>
                    <span className={styles.waBottomText}>Mensagem</span>
                    <div className={styles.waMicCircle}>
                      <WhatsappLogo size={16} weight="fill" />
                    </div>
                  </div>
                </div>

                <p className={styles.previewCaption}>
                  💡 <strong>Pré-visualização em tempo real:</strong> É assim que a mensagem aparecerá
                  no WhatsApp do seu cliente assim que ele clicar no link!
                </p>
              </div>
            </div>
          </section>

          {/* Value Props Section */}
          <section className={styles.benefitsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Vantagens de usar o link de WhatsApp no seu negócio</h2>
              <p className={styles.sectionSubtitle}>
                Aumente o volume de conversas e reduza a perda de clientes em até 60%.
              </p>
            </div>

            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIconWrapper}>
                  <TrendUp size={28} weight="fill" className={styles.benefitIcon} />
                </div>
                <h3 className={styles.benefitTitle}>Aumento Direto de Conversão</h3>
                <p className={styles.benefitDesc}>
                  Elimina o atrito: clientes não precisam digitar seu número, adicionar aos contatos
                  e buscar no WhatsApp. É só clicar e a conversa já está aberta.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIconWrapper}>
                  <ChatsCircle size={28} weight="fill" className={styles.benefitIcon} />
                </div>
                <h3 className={styles.benefitTitle}>Mensagens Pré-preenchidas</h3>
                <p className={styles.benefitDesc}>
                  Defina o texto exato para saber de onde o cliente veio (Instagram, anúncio, site) e
                  já comece o atendimento com o assunto certo sem rodeios.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIconWrapper}>
                  <Devices size={28} weight="fill" className={styles.benefitIcon} />
                </div>
                <h3 className={styles.benefitTitle}>Funciona em Qualquer Aparelho</h3>
                <p className={styles.benefitDesc}>
                  Seus clientes acessam pelo Android, iPhone, Windows ou Mac sem qualquer
                  incompatibilidade.
                </p>
              </div>
            </div>
          </section>

          {/* Ready-to-use message templates section */}
          <section className={styles.templatesSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Modelos prontos de mensagens para WhatsApp comercial</h2>
              <p className={styles.sectionSubtitle}>
                Inspire-se com formatos de mensagens que mais convertem em vendas e atendimentos.
              </p>
            </div>

            <div className={styles.templatesGrid}>
              {messageTemplates.map((template, idx) => (
                <div key={idx} className={styles.templateCard}>
                  <div className={styles.templateHeader}>
                    {template.icon}
                    <h3>{template.title}</h3>
                  </div>
                  <p className={styles.templateText}>&ldquo;{template.text}&rdquo;</p>
                  <button
                    type="button"
                    className={styles.useTemplateBtn}
                    onClick={() => handleSelectQuickMessage(template.text)}
                  >
                    Usar este modelo
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Deep Semantic Section: How it Works */}
          <section className={styles.howItWorksSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Como funciona o gerador de link do WhatsApp?</h2>
              <p className={styles.sectionSubtitle}>
                Entenda a tecnologia por trás do link direto e por que ele é tão seguro e eficiente.
              </p>
            </div>

            <div className={styles.howItWorksContent}>
              <div className={styles.howCard}>
                <div className={styles.howIcon}><CheckCircle size={24} weight="fill" /></div>
                <div>
                  <h4>API Oficial do WhatsApp</h4>
                  <p>
                    Nosso gerador utiliza os endpoints oficiais <code>https://api.whatsapp.com/send</code> e <code>https://wa.me/</code>,
                    garantindo compatibilidade com todas as versões atuais e futuras do WhatsApp.
                  </p>
                </div>
              </div>

              <div className={styles.howCard}>
                <div className={styles.howIcon}><CheckCircle size={24} weight="fill" /></div>
                <div>
                  <h4>Codificação Segura de Mensagem (URL Encoding)</h4>
                  <p>
                    Caracteres especiais, emojis, espaços e pontuações são codificados automaticamente segundo as normas RFC,
                    garantindo que sua mensagem chegue perfeita no aplicativo do destinatário.
                  </p>
                </div>
              </div>

              <div className={styles.howCard}>
                <div className={styles.howIcon}><CheckCircle size={24} weight="fill" /></div>
                <div>
                  <h4>Encurtamento Automático & QR Code</h4>
                  <p>
                    Além do link da API oficial, geramos um link curto elegante do PersonalizeLink com QR Code gratuito para você
                    usar na bio do Instagram ou imprimir em materiais físicos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Accordion Section with Rich Schema.org */}
          <section id="faq" className={styles.faqSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Perguntas Frequentes sobre o Link de WhatsApp</h2>
              <p className={styles.sectionSubtitle}>
                Tudo o que você precisa saber sobre como criar e usar links do WhatsApp.
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
