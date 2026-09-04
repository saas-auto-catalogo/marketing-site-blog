# SaaS Auto Catálogo — Site Institucional e Blog

[![CI](https://github.com/saas-auto-catalogo/marketing-site-blog/actions/workflows/ci.yml/badge.svg)](https://github.com/saas-auto-catalogo/marketing-site-blog/actions/workflows/ci.yml)


Portal comercial de conversão e centro de autoridade de conteúdo orgânico para o setor automotivo.

**Wiki:** [marketing-site-blog](https://github.com/saas-auto-catalogo/.github/blob/main/docs/wiki/marketing-site-blog.md)

---

## Stack

- React 18 + TypeScript 5.7
- Vite 6
- Tailwind CSS 3.4 + Lucide Icons

---

## Estrutura planejada

| Área | Conteúdo |
|------|----------|
| Site comercial | Hero, calculadora de ROI, planos (Starter, Pro, Agency), FAQ |
| Blog Audience First | Artigos sobre tráfego automotivo, DMS e Meta Ads |
| Checkout | Stripe / Asaas via `backend-api` |
| SEO | JSON-LD Schema.org (`Article`, `FAQPage`, `SoftwareApplication`) |

Conteúdo editorial pode ser gerado pelo [ai-content-worker](https://github.com/saas-auto-catalogo/ai-content-worker) e moderado no backoffice.

---

## Execução local

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

---

## Documentação

- [Meta DAA specification](https://github.com/saas-auto-catalogo/.github/blob/main/docs/specs/meta-daa-feed-specification.md)
- [Roadmap do produto](https://github.com/saas-auto-catalogo/.github/blob/main/docs/wiki/roadmap.md)
