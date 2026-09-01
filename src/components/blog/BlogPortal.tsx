import { useState, useMemo } from 'react';
import { Search, Clock, ArrowRight, Sparkles, BookOpen, Flame, Tag } from 'lucide-react';
import { BlogArticle, BlogCategory } from '../../types/blog.js';
import { SAMPLE_ARTICLES } from '../../data/sampleArticles.js';

interface BlogPortalProps {
  onSelectArticle: (article: BlogArticle) => void;
  onGoToLanding: () => void;
}

const CATEGORIES: Array<{ key: BlogCategory; label: string }> = [
  { key: 'TODAS', label: 'Todos os Artigos' },
  { key: 'META_ADS_DAA', label: 'Meta Automotive DAA' },
  { key: 'GESTAO_ESTOQUE_DMS', label: 'Gestão de Estoque DMS' },
  { key: 'TRAFEGO_AUTOMOTIVO', label: 'Tráfego Pago Automotivo' },
  { key: 'BENCHMARKS_ROI', label: 'Benchmarks & ROI' },
];

export function BlogPortal({ onSelectArticle, onGoToLanding }: BlogPortalProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('TODAS');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticle = SAMPLE_ARTICLES.find((a) => a.featured) || SAMPLE_ARTICLES[0];

  const filteredArticles = useMemo(() => {
    return SAMPLE_ARTICLES.filter((art) => {
      const matchesCategory =
        selectedCategory === 'TODAS' || art.category === selectedCategory;
      const matchesSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-12 bg-surface-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Cabeçalho Editorial do Blog */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-brand-primary text-xs font-extrabold shadow-sm">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Portal de Inteligência & Engenharia de Feeds</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-typography-heading tracking-tight leading-tight">
            Domine o Tráfego Automotivo com{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-indigo-600">
              Feeds Dinâmicos no Instagram
            </span>
          </h1>

          <p className="text-base text-typography-muted leading-relaxed">
            Dossiês técnicos, manuais de integração de DMS, estudos de caso e benchmarks para concessionárias e gestores de mídia de performance.
          </p>

          {/* Barra de Busca Instantânea */}
          <div className="pt-2 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por tags (AutoCerto, Meta DAA, CPL, Altimus)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Categorias em Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-brand-primary text-white shadow-md shadow-blue-500/20 scale-105'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ARTIGO EM DESTAQUE HERO (Apenas quando não houver busca ativa) */}
        {!searchQuery && selectedCategory === 'TODAS' && featuredArticle && (
          <div className="bg-white rounded-3xl border border-surface-border overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Imagem */}
              <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[440px] overflow-hidden">
                <img
                  src={featuredArticle.heroImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-price text-white text-xs font-extrabold shadow-lg">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>Destaque Editorial</span>
                </div>
              </div>

              {/* Informações */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-brand-primary font-bold">
                      {featuredArticle.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2
                    onClick={() => onSelectArticle(featuredArticle)}
                    className="text-2xl sm:text-3xl font-extrabold text-typography-heading leading-snug cursor-pointer hover:text-brand-primary transition-colors"
                  >
                    {featuredArticle.title}
                  </h2>

                  <p className="text-sm text-typography-body line-clamp-3 leading-relaxed">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
                    />
                    <div>
                      <p className="text-xs font-bold text-typography-heading">
                        {featuredArticle.author.name}
                      </p>
                      <p className="text-[11px] text-typography-muted">
                        {featuredArticle.publishedAt}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectArticle(featuredArticle)}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-primary hover:text-blue-800 transition-colors"
                  >
                    <span>Ler Artigo Completo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GRID DE ARTIGOS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-xl font-extrabold text-typography-heading flex items-center gap-2">
              <span>Artigos Técnicos Recentes</span>
              <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-mono font-bold">
                {filteredArticles.length}
              </span>
            </h3>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-brand-primary hover:underline"
              >
                Limpar busca
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="bg-white rounded-3xl border border-surface-border overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-primary/40 transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={art.heroImage}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-brand-primary">
                      {art.categoryLabel}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime}</span>
                      <span>•</span>
                      <span>{art.publishedAt}</span>
                    </div>

                    <h4 className="text-lg font-extrabold text-typography-heading leading-snug group-hover:text-brand-primary transition-colors">
                      {art.title}
                    </h4>

                    <p className="text-xs text-typography-muted line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {art.tags.slice(0, 2).map((t, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">{art.author.name}</span>
                  <span className="font-extrabold text-brand-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Ler mais</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA DE FECHAMENTO DO PORTAL */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Tecnologia Automotiva em Tempo Real
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Pronto para Conectar seu DMS ao Instagram?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Teste grátis por 14 dias. Integre seu estoque do AutoCerto, Altimus ou Sisvag em menos de 3 minutos.
            </p>
          </div>

          <button
            onClick={onGoToLanding}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-price hover:bg-red-700 text-white font-extrabold text-sm shadow-xl shadow-red-500/25 transition-all shrink-0 hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            <span>Começar Teste Grátis de 14 Dias</span>
          </button>
        </div>

      </div>
    </div>
  );
}
