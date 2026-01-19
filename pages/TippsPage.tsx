
import React, { useState, useMemo } from 'react';
import { 
    ArrowRightIcon, 
    CalendarDaysIcon, 
    UserIcon, 
    MagnifyingGlassIcon, 
    ClockIcon, 
    TagIcon,
    MailIcon,
    StarIcon
} from '../components/icons';

interface BlogPost {
    id: number;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    imageUrl: string;
}

const blogPosts: BlogPost[] = [
    {
        id: 1,
        category: 'Umzug',
        title: 'Die ultimative Checkliste für einen stressfreien Umzug',
        excerpt: 'Ein Umzug ist oft mit Chaos verbunden. Mit unserer detaillierten Planungshilfe behalten Sie den Überblick – von der Kündigung der alten Wohnung bis zur Schlüsselübergabe im neuen Heim.',
        author: 'Anna Meier',
        date: '15. Juli 2024',
        readTime: '8 Min.',
        imageUrl: 'https://images.unsplash.com/photo-1576135693815-3c5b533a3a6a?q=80&w=1000&auto=format=fit'
    },
    {
        id: 2,
        category: 'Renovation',
        title: 'Farbtrends 2024: So streichen Sie Ihre Wohnung modern',
        excerpt: 'Weg vom klassischen Weiss: Entdecken Sie warme Erdtöne, beruhigendes Salbeigrün und mutige Akzente. Wir zeigen Ihnen, wie Farben die Raumwirkung komplett verändern können.',
        author: 'Markus Keller',
        date: '10. Juli 2024',
        readTime: '5 Min.',
        imageUrl: 'https://images.unsplash.com/photo-1501127122-f38540107a43?q=80&w=1000&auto=format=fit'
    },
    {
        id: 3,
        category: 'Reinigung',
        title: 'Abnahmegarantie bei der Umzugsreinigung: Was bedeutet sie wirklich?',
        excerpt: 'Die Wohnungsübergabe ist der heikelste Moment beim Auszug. Wir erklären, warum eine Abnahmegarantie unverzichtbar ist und worauf Sie im Kleingedruckten achten müssen.',
        author: 'Sandra Frei',
        date: '05. Juli 2024',
        readTime: '6 Min.',
        imageUrl: 'https://images.unsplash.com/photo-1599382833338-23229f33b1f9?q=80&w=1000&auto=format=fit'
    },
    {
        id: 4,
        category: 'Garten',
        title: 'Gartenpflege im Herbst: Die Checkliste',
        excerpt: 'Bereiten Sie Ihren Garten optimal auf den Winter vor. Vom Rückschnitt der Stauden bis zum Schutz empfindlicher Pflanzen – das ist jetzt zu tun.',
        author: 'Reto Steiner',
        date: '01. September 2024',
        readTime: '4 Min.',
        imageUrl: 'https://images.unsplash.com/photo-1600492812239-202c483a903c?q=80&w=1000&auto=format=fit'
    },
    {
        id: 5,
        category: 'Handwerk',
        title: 'Bodenbeläge im Vergleich: Parkett, Laminat oder Vinyl?',
        excerpt: 'Echtholz oder pflegeleichter Kunststoff? Wir vergleichen Haptik, Haltbarkeit und Preis der beliebtesten Bodenbeläge für Ihr Zuhause.',
        author: 'Klaus Boden',
        date: '25. August 2024',
        readTime: '10 Min.',
        imageUrl: 'https://images.unsplash.com/photo-1588212115211-b01a88998f4b?q=80&w=1000&auto=format=fit'
    },
    {
        id: 6,
        category: 'Finanzen',
        title: 'Handwerkerkosten von den Steuern abziehen',
        excerpt: 'Wussten Sie, dass Sie viele werterhaltende Massnahmen steuerlich geltend machen können? Unser Guide zeigt Ihnen, wie Sie bei der nächsten Renovation sparen.',
        author: 'Beatrice Wyss',
        date: '15. August 2024',
        readTime: '7 Min.',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1000&auto=format=fit'
    }
];

const categories = ['Alle', 'Umzug', 'Renovation', 'Reinigung', 'Garten', 'Handwerk', 'Finanzen'];

const TippsPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('Alle');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = useMemo(() => {
        return blogPosts.filter(post => {
            const matchesCategory = activeCategory === 'Alle' || post.category === activeCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
    const remainingPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : [];

    return (
        <div className="bg-slate-50 min-h-screen">
            
            {/* Hero Section */}
            <section className="bg-slate-900 text-white pt-24 pb-24 relative overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl"></div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-primary-200 text-sm font-bold mb-6 tracking-wide uppercase shadow-sm">
                            Das Fertigo Magazin
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
                            Expertenwissen für <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-green-300">Ihr perfektes Zuhause.</span>
                        </h1>
                        <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Von praktischen Checklisten bis zu inspirierenden Ideen. 
                            Wir begleiten Sie mit Rat und Tat bei jedem Projekt.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto group">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400 group-focus-within:text-primary-400 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:bg-white/20 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 outline-none transition-all font-medium shadow-lg"
                                placeholder="Suche nach Themen (z.B. Bodenbeläge)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Navigation */}
            <div className="sticky top-[64px] lg:top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-3 py-4 overflow-x-auto no-scrollbar sm:justify-center">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                                    activeCategory === cat 
                                        ? 'bg-slate-900 text-white shadow-md transform scale-105' 
                                        : 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <section className="py-16 container mx-auto px-6 max-w-7xl">
                
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 border-dashed">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <MagnifyingGlassIcon className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Keine Artikel gefunden</h3>
                        <p className="text-slate-500">Versuchen Sie es mit einem anderen Suchbegriff oder wählen Sie "Alle".</p>
                        <button 
                            onClick={() => {setSearchQuery(''); setActiveCategory('Alle');}}
                            className="mt-6 px-6 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                        >
                            Filter zurücksetzen
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Featured Article */}
                        {featuredPost && !searchQuery && activeCategory === 'Alle' && (
                            <div className="mb-16 animate-fade-in">
                                <div className="group relative bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 grid md:grid-cols-5 h-full min-h-[450px]">
                                    <div className="md:col-span-3 relative overflow-hidden h-64 md:h-full">
                                        <img 
                                            src={featuredPost.imageUrl} 
                                            alt={featuredPost.title} 
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden"></div>
                                        <div className="absolute top-6 left-6 z-10">
                                            <span className="bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm flex items-center gap-2">
                                                <StarIcon className="w-3.5 h-3.5 text-yellow-500 fill-current"/>
                                                Highlight
                                            </span>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center relative">
                                        <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
                                            <span className="text-primary-600">{featuredPost.category}</span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                            <span className="flex items-center gap-1"><ClockIcon className="w-3.5 h-3.5"/> {featuredPost.readTime} Lesezeit</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight group-hover:text-primary-700 transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-lg text-slate-600 mb-8 leading-relaxed line-clamp-4 md:line-clamp-none">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold border border-white shadow-sm">
                                                    {featuredPost.author.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{featuredPost.author}</p>
                                                    <p className="text-xs text-slate-500">{featuredPost.date}</p>
                                                </div>
                                            </div>
                                            <button className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-0.5"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Standard Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(searchQuery || activeCategory !== 'Alle' ? filteredPosts : remainingPosts).map((post) => (
                                <article key={post.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                                    <div className="relative h-56 overflow-hidden">
                                        <img 
                                            src={post.imageUrl} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-white/20">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3 uppercase tracking-wide">
                                            <CalendarDaysIcon className="w-3.5 h-3.5"/>
                                            <span>{post.date}</span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                            <ClockIcon className="w-3.5 h-3.5"/>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                            {post.excerpt}
                                        </p>
                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                                            <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                                                    {post.author.charAt(0)}
                                                </div>
                                                {post.author}
                                            </span>
                                            <span className="text-sm font-bold text-primary-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                Lesen <ArrowRightIcon className="w-4 h-4"/>
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}

                {/* Pagination / Load More */}
                <div className="mt-20 text-center">
                    <button className="px-8 py-3.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm hover:shadow-md">
                        Weitere Artikel laden
                    </button>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-slate-900 text-white py-24 overflow-hidden relative mt-12">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-500 blur-3xl"></div>
                    <div className="absolute bottom-0 left-20 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-16 border border-white/10 text-center shadow-2xl">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-600 mb-8 text-white shadow-lg shadow-primary-600/30">
                            <MailIcon className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                            Keine Tipps mehr verpassen
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Erhalten Sie wöchentlich die besten Ratschläge rund um Haus, Garten und Handwerk direkt in Ihr Postfach. Kostenlos und jederzeit abbestellbar.
                        </p>
                        
                        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Ihre E-Mail Adresse" 
                                className="flex-grow px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white/20 transition-all font-medium"
                            />
                            <button className="px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-500 transition-all shadow-lg hover:shadow-primary-600/40 flex items-center justify-center gap-2 whitespace-nowrap transform hover:-translate-y-0.5 active:translate-y-0">
                                Anmelden <ArrowRightIcon className="w-5 h-5"/>
                            </button>
                        </form>
                        <p className="text-xs text-slate-400 mt-6 font-medium">
                            Wir respektieren Ihre Privatsphäre. Keine Werbung, nur wertvolle Inhalte.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TippsPage;
