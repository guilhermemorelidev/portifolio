# 🌐 Portfólio Pessoal — Guilherme Moreli

Portfólio pessoal desenvolvido com **Svelte 5**, **TypeScript** e **Tailwind CSS 4**, com fundo animado em Canvas, animações de scroll via GSAP e deploy automático na Vercel.

---

## ✨ Destaques

- Fundo generativo animado em **Canvas API** com orbs em movimento
- Animações de scroll suaves com **GSAP + ScrollTrigger**
- Efeito **tilt 3D** nos cards de projeto (desktop)
- Design responsivo com tema escuro
- Otimizado para performance — **Vercel Analytics** e **Speed Insights** integrados
- Respeita `prefers-reduced-motion` para acessibilidade

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| Svelte | 5 | Framework principal |
| TypeScript | 5.9 | Tipagem estática |
| Tailwind CSS | 4 | Estilização utilitária |
| Vite | 6 | Build e dev server |
| GSAP | 3.12 | Animações de scroll e tilt |
| Vercel | — | Deploy e analytics |

---

## 📁 Estrutura do projeto

```
portifolio/
├── public/
│   ├── img.jpeg          # Sua foto de perfil
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── components/
│   │   ├── Hero.svelte       # Seção principal
│   │   ├── About.svelte      # Sobre mim
│   │   ├── Skills.svelte     # Habilidades com barras animadas
│   │   ├── Projects.svelte   # Grid de projetos
│   │   ├── Education.svelte  # Timeline de formação
│   │   ├── Contact.svelte    # Formulário de contato com modal
│   │   ├── BlackHole.svelte  # Canvas animado de fundo
│   │   ├── Header.svelte     # Navegação com menu mobile
│   │   └── Footer.svelte
│   │
│   ├── lib/
│   │   └── data.ts           # Todos os dados do portfólio (edite aqui)
│   │
│   ├── App.svelte            # Raiz — inicializa GSAP após intro
│   ├── app.css               # Variáveis globais e tokens de design
│   └── main.ts               # Entry point
│
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🚀 Como executar localmente

### Pré-requisitos

- [Node.js 20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (recomendado) ou npm

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/guilhermemorelidev/portifolio.git
cd portifolio
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
pnpm dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

### Build para produção
```bash
pnpm build
pnpm preview
```

---

## ⚙️ Personalizando o portfólio

Todos os dados ficam centralizados em **`src/lib/data.ts`**. Para personalizar, edite apenas esse arquivo:

```ts
export const personal = {
  name: 'Seu Nome',
  role: 'Sua Stack',
  tagline: 'Sua tagline aqui.',
  bio: `Sua bio aqui.`,
  email: 'seuemail@exemplo.com',
  github: 'https://github.com/seu-usuario',
  linkedin: 'https://linkedin.com/in/seu-perfil',
  image: '/img.jpeg', // coloque sua foto em /public/img.jpeg
};
```

Você também pode editar os arrays `skills`, `projects` e `education` no mesmo arquivo para atualizar habilidades, projetos e formação.

---

## 📦 Deploy na Vercel

O projeto já está configurado para deploy automático na Vercel.

1. Importe o repositório em [vercel.com](https://vercel.com)
2. Framework preset: **Vite**
3. Build command: `pnpm build`
4. Output directory: `dist`

---

https://github.com/user-attachments/assets/37afb9df-56b0-42db-80aa-694b6a1b0407

--- 

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

<p align="center">
  Desenvolvido por <a href="https://github.com/guilhermemorelidev">Guilherme Moreli</a>
</p>
