<div align="center">
  <img src="public/logo.svg" alt="PersonalizeLink Logo" width="280" />

  <p align="center">
    <strong>Encurtador de URLs inteligente e gerador de links para WhatsApp com mensagem personalizada.</strong>
  </p>

  <p align="center">
    <a href="https://www.2link.fun" target="_blank">🌐 Acessar Site Oficial</a> •
    <a href="#-funcionalidades">Funcionalidades</a> •
    <a href="#-tecnologias">Tecnologias</a> •
    <a href="#-como-executar">Como Executar</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-13.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/tRPC-v10-2596BE?style=for-the-badge&logo=trpc" alt="tRPC" />
    <img src="https://img.shields.io/badge/Prisma-5.1-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
    <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge" alt="MIT License" />
  </p>
</div>

---

## 📌 Sobre o Projeto

O **PersonalizeLink** ([2link.fun](https://www.2link.fun)) é uma plataforma web moderna, rápida e 100% gratuita para simplificar o compartilhamento de links. Criada com foco em alta performance e excelente experiência de usuário, ela oferece duas ferramentas essenciais para negócios, criadores de conteúdo e profissionais autônomos:

1. **Encurtador de Links e URLs**: Transforma URLs longas e complexas com parâmetros UTM em links compactos e limpos.
2. **Gerador de Link do WhatsApp**: Gera links diretos com mensagem pré-preenchida para iniciar conversas em apenas 1 clique, sem precisar salvar o contato na agenda.

---

## ✨ Funcionalidades

### ⚡ Encurtador de Links e URLs
- **Redirecionamento Instantâneo**: Sem páginas intermediárias de espera, sem contadores regressivos e sem anúncios invasivos.
- **QR Code Automático**: Gera código QR em alta resolução pronto para download para cada link criado.
- **Cópia em 1 Clique**: Feedback visual animado de confirmação de cópia para a área de transferência.
- **Compartilhamento Nativo**: Suporte à Web Share API nativa em smartphones.
- **Colar Rápido**: Botão para colar a URL diretamente da área de transferência.

### 💬 Gerador de Link para WhatsApp
- **Live WhatsApp Chat Mockup**: Visualização interativa em tempo real da mensagem dentro de um simulador de smartphone à medida que você digita.
- **Máscara Brasileira Inteligente**: Formatação automática para números celulares do Brasil (+55 com DDD de 11 dígitos).
- **Chips de Mensagens Prontas**: Sugestões rápidas com modelos para *Vendas*, *Orçamentos*, *Agendamento* e *Instagram*.
- **Geração Dupla**: Entrega o link direto oficial da API do WhatsApp (`wa.me`) e o link curto compacto com QR Code.

### 🎨 Design Moderno & Responsivo
- Interface refinada com **Glassmorphism** e plano de fundo dinâmico em **Mesh Gradient**.
- Menu de navegação em formato de pílulas (*segmented pills*) com drawer animado para mobile.
- Design System padronizado com CSS Modules e variáveis CSS globais.

### 🔍 SEO de Alta Performance (Google 1ª Página)
- Metadados otimizados para as buscas *"encurtador de link"* e *"gerador de link do whatsapp"*.
- Idioma nativo `pt-BR` configurado no SSR do Next.js.
- Dados estruturados **Schema.org JSON-LD** (`WebSite`, `WebApplication`, `FAQPage`) para habilitar *Rich Snippets* nas buscas do Google.
- `robots.txt` e `sitemap.xml` estruturados com prioridades de rastreamento.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com o ecossistema moderno do [create-t3-app](https://create.t3.gg/):

- **Framework**: [Next.js 13](https://nextjs.org/) (Pages Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Comunicação API**: [tRPC v10](https://trpc.io/) (Type-safe APIs)
- **Banco de Dados & ORM**: [Prisma ORM](https://prisma.io/) com MySQL
- **Gerenciamento de Estado de Dados**: [@tanstack/react-query](https://tanstack.com/query)
- **Formulários e Validação**: [Formik](https://formik.org/) e [Zod](https://zod.dev/)
- **Estilização**: CSS Modules com Design System Customizado
- **Ícones**: [@phosphor-icons/react](https://phosphoricons.com/)
- **Animações**: [React-Lottie](https://github.com/chenqingspring/react-lottie)
- **Notificações**: [React-Toastify](https://fkhadra.github.io/react-toastify/)
- **Monitoramento**: [@sentry/nextjs](https://sentry.io/)

---

## 📁 Estrutura de Pastas

```text
personalizeLink/
├── prisma/
│   └── schema.prisma        # Modelo de dados (LinkReference)
├── public/
│   ├── robots.txt           # Diretrizes para indexadores
│   ├── sitemap.xml          # Mapa do site para o Google
│   └── site.webmanifest     # Manifesto PWA
├── src/
│   ├── assets/              # Logos, ilustrações e lotties
│   ├── components/
│   │   ├── Button/          # Componente de botão reutilizável
│   │   ├── Footer/          # Rodapé com badges de confiança
│   │   ├── Header/          # Barra de navegação com glassmorphism
│   │   ├── Redirect/        # Tela de transição para redirecionamento
│   │   ├── TextField/       # Campo de texto com ícones e validação
│   │   └── Textearea/       # Campo de área de texto
│   ├── pages/
│   │   ├── _app.tsx         # Configuração global da aplicação e fontes
│   │   ├── _document.tsx    # Head HTML, pt-BR e preconnects de SEO
│   │   ├── 404.tsx          # Página de erro 404 personalizada
│   │   ├── index.tsx        # Página inicial (Encurtador de Link)
│   │   ├── sobre.tsx        # Página institucional Sobre
│   │   ├── whatsapp-link.tsx # Gerador de Link do WhatsApp
│   │   └── r/[hash].tsx     # Rota dinâmica de redirecionamento dos links
│   ├── server/
│   │   ├── api/             # Rotas e procedimentos do tRPC
│   │   └── db.ts            # Instância do Prisma Client
│   └── styles/
│       └── globals.css      # Tokens de design, fontes e reset CSS
├── next.config.mjs          # Configurações do Next.js e Sentry
└── package.json             # Dependências e scripts
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18.x ou superior)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- Banco de dados [MySQL](https://www.mysql.com/) ativo

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:NandaPersa/personalizeLink.git
   cd personalizeLink
   ```

2. **Instale as dependências:**
   ```bash
   yarn install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:
   ```env
   DATABASE_URL="mysql://usuario:senha@localhost:3306/personalizelink"
   NEXT_PUBLIC_GTM="GTM-XXXXXXX"
   ```

4. **Execute as Migrações do Banco:**
   ```bash
   npx prisma db push
   # ou
   npx prisma migrate dev
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   yarn dev
   ```

6. **Abra no seu navegador:**
   Acesse [http://localhost:3000](http://localhost:3000)

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `yarn dev` | Inicia o servidor Next.js em modo de desenvolvimento |
| `yarn build` | Gera o build otimizado para produção |
| `yarn start` | Inicia o servidor de produção após o build |
| `yarn lint` | Executa o linter ESLint e checagem de tipos TypeScript |
| `yarn postinstall` | Executa a geração automática do cliente Prisma (`prisma generate`) |
| `yarn vercel:build`| Executa migrações do banco e build na plataforma Vercel |

---

## 📄 Licença

Este projeto é desenvolvido para uso público gratuito sob a licença [MIT](LICENSE).

---

<div align="center">
  Desenvolvido com 💜 por <a href="https://github.com/NandaPersa">Ananda</a>
</div>
