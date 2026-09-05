import { useState } from 'react';
import {
  ChevronRight,
  Clock,
  Bookmark,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Info,
  Code,
  MessageCircle,
} from 'lucide-react';
import { LinkedInSvg, TwitterSvg } from '../icons/DmsLogos.js';
import { BlogArticle } from '../../types/blog.js';
import { SAMPLE_ARTICLES } from '../../data/sampleArticles.js';
import { JsonLdHead } from '../seo/JsonLdHead.js';
import { getAppRegisterUrl } from '../../config/env.js';

interface ArticleReaderProps {
  article: BlogArticle;
  onBackToBlog: () => void;
  onGoToLanding: () => void;
  onSelectArticle: (article: BlogArticle) => void;
}

export function ArticleReader({
  article,
  onBackToBlog,
  onGoToLanding,
  onSelectArticle,
}: ArticleReaderProps) {
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);
  const [activeTocId, setActiveTocId] = useState<string>(article.tableOfContents[0]?.id || '');
  const [saved, setSaved] = useState(false);

  const relatedArticles = SAMPLE_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  const scrollToSection = (id: string) => {
    setActiveTocId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article className="bg-surface-canvas min-h-screen py-10">
      {/* Injeção Dinâmica de SEO & Schema.org JSON-LD */}
      <JsonLdHead article={article} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Barra de Retorno e Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <button
              onClick={onGoToLanding}
              className="hover:text-brand-primary transition-colors flex items-center gap-1"
            >
              <span>Início</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button
              onClick={onBackToBlog}
              className="hover:text-brand-primary transition-colors font-bold"
            >
              Blog
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-primary font-bold">{article.categoryLabel}</span>
            <ChevronRight className="w-3.5 h-3.5 hidden md:inline" />
            <span className="text-slate-700 font-medium truncate max-w-xs hidden md:inline">
              {article.title}
            </span>
          </nav>

          <button
            onClick={onBackToBlog}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-brand-primary hover:text-brand-primary transition-all shadow-sm self-start sm:self-auto"
          >
            <span>← Voltar para Todos os Artigos</span>
          </button>
        </div>

        {/* HEADER DO ARTIGO */}
        <header className="space-y-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-extrabold border border-blue-200">
              {article.categoryLabel}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-typography-heading tracking-tight leading-[1.2]">
            {article.title}
          </h1>

          <p className="text-lg text-typography-body leading-relaxed">
            {article.summary}
          </p>

          {/* BIO DO AUTOR & BOTÕES DE COMPARTILHAMENTO */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-primary/20 shadow-sm"
              />
              <div>
                <h3 className="text-sm font-extrabold text-typography-heading">
                  {article.author.name}
                </h3>
                <p className="text-xs text-typography-muted">{article.author.role}</p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Publicado em {article.publishedAt} • Atualizado para 2026
                </p>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSaved(!saved)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  saved ? 'bg-blue-50 border-brand-primary text-brand-primary' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                title="Salvar artigo"
              >
                <Bookmark className="w-4 h-4" />
              </button>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' - ' + window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 transition-colors"
                title="Compartilhar no WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors"
                title="Compartilhar no LinkedIn"
              >
                <LinkedInSvg className="w-4 h-4 fill-current" />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                title="Compartilhar no Twitter"
              >
                <TwitterSvg className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>
        </header>

        {/* HERO IMAGE */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[21/9] max-h-[480px]">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CORPO DO ARTIGO EM 2 COLUNAS (SIDEBAR TOC + CONTEÚDO) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* SIDEBAR FLUTUANTE À ESQUERDA: TABLE OF CONTENTS */}
          <aside className="lg:col-span-4 sticky top-28 bg-white rounded-3xl p-6 border border-surface-border shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-typography-heading">
                Sumário do Artigo
              </h4>
            </div>

            <nav className="space-y-1.5 text-xs">
              {article.tableOfContents.map((toc) => {
                const isActive = activeTocId === toc.id;
                return (
                  <button
                    key={toc.id}
                    onClick={() => scrollToSection(toc.id)}
                    className={`w-full text-left py-2 px-3 rounded-xl transition-all flex items-center justify-between gap-2 ${
                      isActive
                        ? 'bg-blue-50 text-brand-primary font-extrabold border-l-4 border-brand-primary pl-2.5'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-typography-heading font-medium'
                    }`}
                  >
                    <span className="truncate">{toc.title}</span>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </nav>

            {/* Micro Widget CTA na Sidebar */}
            <div className="pt-4 mt-4 border-t border-slate-100 bg-slate-50 p-4 rounded-2xl space-y-3">
              <p className="text-xs font-extrabold text-typography-heading">
                Automatize seu Estoque no Instagram
              </p>
              <p className="text-[11px] text-typography-muted">
                Conecte seu feed XML do AutoCerto em 3 minutos sem código.
              </p>
              <a
                href={getAppRegisterUrl('trial')}
                className="w-full py-2 px-3 rounded-lg bg-brand-price hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Testar 14 Dias Grátis</span>
              </a>
            </div>
          </aside>

          {/* COLUNA PRINCIPAL DE CONTEÚDO TÉCNICO & EDITORIAL */}
          <main className="lg:col-span-8 space-y-10 text-typography-body leading-relaxed">
            
            {/* SEÇÃO 1: O que é Meta DAA */}
            <section id="o-que-e-meta-daa" className="space-y-4 pt-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-typography-heading tracking-tight">
                1. O que é Meta Automotive Inventory Ads (DAA)?
              </h2>
              <p>
                O <strong>Meta Automotive Inventory Ads (antigo DAA)</strong> é o formato nativo desenvolvido pela Meta para concessionárias e revendas de veículos. Ao contrário dos anúncios de imagem estática, o DAA conecta o catálogo de veículos em estoque diretamente aos feeds do <strong>Instagram e Facebook</strong>.
              </p>
              <p>
                Quando um usuário demonstra interesse por SUVs compactos em sua região, o algoritmo entrega automaticamente um carrossel dinâmico com fotos reais, placa, quilometragem e o preço exato dos modelos disponíveis no seu pátio.
              </p>
            </section>

            {/* CALLOUT DE INSIGHT TÉCNICO (Cobalt Border) */}
            <div className="p-6 rounded-2xl bg-blue-50 border-l-4 border-brand-primary space-y-2">
              <div className="flex items-center gap-2 text-brand-primary font-extrabold text-sm">
                <Info className="w-5 h-5 shrink-0" />
                <span>Requisito Obrigatório da Meta Graph API</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium pl-6 list-disc">
                {article.keyInsights.map((insight, idx) => (
                  <li key={idx}>{insight}</li>
                ))}
              </ul>
            </div>

            {/* SEÇÃO 2: Limitações Manuais */}
            <section id="limitacoes-manuais" className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-typography-heading tracking-tight">
                2. Por que Anúncios Manuais Queimam Verba de Concessionárias?
              </h2>
              <p>
                A maioria das revendas ainda cria anúncios manuais no Gerenciador de Anúncios subindo fotos de carros pontuais. Esse processo gera três problemas graves:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-red-600 uppercase font-mono">Problema #1</span>
                  <h4 className="text-sm font-extrabold text-slate-900">Queima de Verba</h4>
                  <p className="text-xs text-slate-500">Cliques pagos em carros que já foram vendidos.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-red-600 uppercase font-mono">Problema #2</span>
                  <h4 className="text-sm font-extrabold text-slate-900">Leads Frustrados</h4>
                  <p className="text-xs text-slate-500">Cliente entra no WhatsApp e o carro não existe mais.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-red-600 uppercase font-mono">Problema #3</span>
                  <h4 className="text-sm font-extrabold text-slate-900">Custo de Operação</h4>
                  <p className="text-xs text-slate-500">Horas gastas atualizando criativos manualmente.</p>
                </div>
              </div>
            </section>

            {/* SEÇÃO 3: Mapeamento de Tags AutoCerto vs Meta XSD */}
            <section id="mapeamento-autocerto-xsd" className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-typography-heading tracking-tight">
                3. Mapeamento Técnico de Tags: AutoCerto XML vs Meta XSD
              </h2>
              <p>
                O feed padrão exportado pelo AutoCerto utiliza uma estrutura genérica para portais nacionais. Nossa engine normaliza e converte essas tags para o esquema XSD exigido pela Meta:
              </p>

              {/* TABELA COMPARATIVA DE MAPEAMENTO */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-extrabold uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Tag AutoCerto XML</th>
                      <th className="p-3.5">Atributo Meta DAA XSD</th>
                      <th className="p-3.5">Regra de Normalização</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 text-blue-600">&lt;codigo_veiculo&gt;</td>
                      <td className="p-3.5 text-slate-900 font-bold">&lt;vehicle_id&gt;</td>
                      <td className="p-3.5 text-slate-600">Identificador único obrigatório (ex: "AC-9842")</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 text-blue-600">&lt;valor_venda&gt;</td>
                      <td className="p-3.5 text-slate-900 font-bold">&lt;price&gt;</td>
                      <td className="p-3.5 text-slate-600">Normalizado para formato numérico + BRL (ex: "349900 BRL")</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 text-blue-600">&lt;foto_destaque&gt;</td>
                      <td className="p-3.5 text-slate-900 font-bold">&lt;image_link&gt;</td>
                      <td className="p-3.5 text-slate-600">URL HTTPS com proporção quadrada 1:1</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 text-blue-600">&lt;ano_modelo&gt;</td>
                      <td className="p-3.5 text-slate-900 font-bold">&lt;year&gt;</td>
                      <td className="p-3.5 text-slate-600">Extração de 4 dígitos do ano do modelo</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 text-blue-600">&lt;status_patio&gt;</td>
                      <td className="p-3.5 text-slate-900 font-bold">&lt;availability&gt;</td>
                      <td className="p-3.5 text-slate-600">"in stock" ou "out of stock"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* BLOCO DE CÓDIGO XML NORMALIZADO */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-white space-y-0">
              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-blue-400" />
                  <span>meta-vehicles-feed-sample.xml</span>
                </span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-green-400">Atom / XML</span>
              </div>
              <pre className="p-4 text-xs font-mono overflow-x-auto text-slate-300 leading-relaxed">
{`<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:g="http://base.google.com/ns/1.0">
  <title>DriveSync - Saga Motors Seminovos</title>
  <entry>
    <g:vehicle_id>AC-9842</g:vehicle_id>
    <g:title>BMW 320i M Sport 2.0 Turbo 2026</g:title>
    <g:description>Veículo revisado com garantia de fábrica, teto solar e painel digital.</g:description>
    <g:link>https://sagamotors.com.br/seminovos/bmw-320i-m-sport-2026</g:link>
    <g:image_link>https://images.drivesync.me/feed/saga/bmw-320i-1.jpg</g:image_link>
    <g:price>349900 BRL</g:price>
    <g:availability>in stock</g:availability>
    <g:make>BMW</g:make>
    <g:model>320i</g:model>
    <g:year>2026</g:year>
    <g:mileage>14200 km</g:mileage>
    <g:license_plate>BRA-2E26</g:license_plate>
  </entry>
</feed>`}
              </pre>
            </div>

            {/* CARD BANNER DE CTA CONTEXTUAL MID-ARTICLE */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Configuração Sem Código</span>
                <h4 className="text-xl font-extrabold text-white">
                  Conecte seu AutoCerto ao Instagram Agora
                </h4>
                <p className="text-xs text-slate-300">
                  Teste grátis de 14 dias com suporte de homologação da nossa equipe de engenharia.
                </p>
              </div>

              <a
                href={getAppRegisterUrl('trial')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-price hover:bg-red-700 text-white font-extrabold text-xs shadow-lg shadow-red-500/25 transition-all shrink-0 hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Começar Teste Grátis</span>
              </a>
            </div>

            {/* SEÇÃO 4: Requisitos Críticos de Imagens */}
            <section id="normalizacao-fotos" className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-typography-heading tracking-tight">
                4. Requisitos Críticos de Imagens 1:1 e Resolução
              </h2>
              <p>
                O algoritmo do Meta Commerce Manager realiza análises de visão computacional em cada imagem do feed. Para atingir nota máxima de qualidade:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-1" />
                  <span><strong>Formato Quadrado (1:1):</strong> Imagens em 1080x1080px evitam cortes indesejados nas laterais dos veículos no carrossel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-1" />
                  <span><strong>Sem Marcas d'Água Agressivas:</strong> Textos grandes sobrepostos à lataria reduzem o alcance orgânico e pago da campanha.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-1" />
                  <span><strong>Primeira Foto Frontal em Ângulo 3/4:</strong> Converte até 2.1x mais cliques do que fotos traseiras ou do interior.</span>
                </li>
              </ul>
            </section>

            {/* SEÇÃO 5: FAQ Accordion Estruturado */}
            <section id="perguntas-frequentes" className="space-y-6 pt-4 border-t border-slate-200">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-typography-heading tracking-tight">
                5. Perguntas Frequentes sobre Feeds do AutoCerto
              </h2>

              <div className="space-y-3">
                {article.faq.map((item, idx) => {
                  const isOpen = activeFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
                    >
                      <button
                        onClick={() => setActiveFaqIdx(isOpen ? null : idx)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm text-typography-heading hover:text-brand-primary transition-colors"
                      >
                        <span>{item.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${
                            isOpen ? 'rotate-180 text-brand-primary' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

          </main>
        </div>

        {/* ARTIGOS RELACIONADOS */}
        <div className="pt-16 border-t border-slate-200 space-y-6">
          <h3 className="text-2xl font-extrabold text-typography-heading">
            Artigos Relacionados
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectArticle(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={rel.heroImage}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-bold text-brand-primary">
                    {rel.categoryLabel}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 line-clamp-2 group-hover:text-brand-primary transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{rel.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}
