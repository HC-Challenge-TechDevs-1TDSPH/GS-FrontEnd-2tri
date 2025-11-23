# 👁️ FutureLens - Inteligência de Carreira

![React](https://img.shields.io/badge/React-18.x-blue)
![Vite](https://img.shields.io/badge/Vite-5.x-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)

## 1. Título e Descrição
**FutureLens** é uma plataforma SaaS B2B/B2C focada em inteligência de carreira. Utilizamos análise de dados de mercado para ajudar profissionais a identificar lacunas de competência (*skills gap*) e empresas a gerirem o desenvolvimento de seus talentos. A aplicação oferece dashboards personalizados, trilhas de aprendizado e comparativos de mercado em tempo real.

## 2. Status do Projeto
🚀 **Finalizado**
*O projeto encontra-se com as principais funcionalidades de Front-end integradas à API Java.*

## 3. Sumário
* [1. Título e Descrição](#1-título-e-descrição)
* [2. Status do Projeto](#2-status-do-projeto)
* [4. Sobre o Projeto](#4-sobre-o-projeto)
* [5. Tecnologias Utilizadas](#5-tecnologias-utilizadas)
* [6. Instalação](#6-instalação)
* [7. Como Usar](#7-como-usar)
* [8. Estrutura de Pastas](#8-estrutura-de-pastas)
* [9. Endpoints e Rotas](#9-endpoints-e-rotas)
* [10. Autores e Créditos](#10-autores-e-créditos)
  

## 4. Sobre o Projeto
O FutureLens nasceu da necessidade de alinhar a formação profissional com a velocidade das mudanças no mercado de trabalho. A aplicação consome uma API Java que processa dados de tendências e retorna:
* Nível de prontidão do usuário.
* Habilidades emergentes por setor.
* Comparativo entre o perfil do usuário e a média do mercado.
* Trilhas de aprendizado sugeridas.

## 5. Tecnologias Utilizadas

**Front-end:**
* [React](https://reactjs.org/) - Biblioteca para construção de interfaces.
* [Vite](https://vitejs.dev/) - Build tool rápida e moderna.
* [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática.
* [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário (v4).
* [React Router Dom](https://reactrouter.com/) - Gerenciamento de rotas.
* [React Icons](https://react-icons.github.io/react-icons/) - Biblioteca de ícones.

**Integração:**
* Fetch API (Nativo)
* API Rest (Java/Spring Boot no Backend)

## 6. Instalação

Pré-requisitos: Node.js (v18+) e npm/yarn instalados.

```bash
# 1. Clone o repositório
git clone [https://github.com/seu-usuario/future-lens.git](https://github.com/seu-usuario/future-lens.git)

# 2. Entre na pasta do projeto
cd future-lens

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

7. Como Usar
A aplicação está implantada e pode ser acessada publicamente através da URL abaixo.

🔗 Acesse a aplicação: https://futurelens-app.vercel.app (Exemplo - Substitua pela sua URL real)

Fluxo Básico:

Acesse a Home e clique em "Começar Agora".

Crie uma conta ou faça Login.

No Dashboard, visualize seu Score de Prontidão.

Navegue para Trilhas para ver cursos recomendados.

Acesse Mercado (Premium) para ver comparativos setoriais.

8. Estrutura de Pastas
src/
├── assets/          # Imagens e recursos estáticos
├── components/      # Componentes reutilizáveis (Header, Footer, etc)
├── routes/          # Páginas da aplicação
│   ├── AuthPage/
│   ├── Dashboard/
│   ├── HomePage/
│   ├── TeamPage/
│   └── ... (outras páginas)
├── services/        # Configuração da API (api.ts)
├── types/           # Interfaces TypeScript (DTOs)
├── App.tsx          # Componente Raiz
├── globals.css      # Estilos globais e Tailwind
└── main.tsx         # Ponto de entrada e Rotas

9. Endpoints ou Rotas Principais
Rotas do Front-end:

/ - Landing Page (Home)

/login / /cadastro - Autenticação

/dashboard - Painel principal do usuário

/trilhas - Listagem de cursos e módulos

/tendencias - Habilidades em alta (Vitrine)

/comparativo - Análise de mercado (Premium)

/analise - Resultado detalhado da IA

/b2b - Área administrativa para empresas

/integrantes - Página da equipe

10. Autores e Créditos
Este projeto foi desenvolvido pelos alunos da FIAP como parte do Global Solution.
Integrante Felipe Monte de Sousa  |  Aline Lourenço Carvalho  |   Luna de Carvalho Guimarães
RM               562019           |        564538             |            562290
Turma            1TDSPH           |        1TDSPK             |            1TDSPH
