import React from 'react';
import { ArrowRightIcon, CalendarDaysIcon, UserIcon } from './icons';

const blogPosts = [
    {
        category: 'Umzug',
        title: 'Checkliste für einen stressfreien Umzug',
        excerpt: 'Planen Sie Ihren Umzug wie ein Profi. Unsere ultimative Checkliste hilft Ihnen, nichts zu vergessen und den Überblick zu behalten.',
        author: 'Anna Meier',
        date: '15. Juli 2024',
        imageUrl: 'https://images.unsplash.com/photo-1576135693815-3c5b533a3a6a'
    },
    {
        category: 'Renovation',
        title: 'Farbtrends 2024: So streichen Sie Ihre Wohnung modern',
        excerpt: 'Entdecken Sie die neuesten Farbtrends und erhalten Sie Tipps vom Experten, wie Sie Ihren Wänden einen frischen, modernen Look verleihen.',
        author: 'Markus Keller',
        date: '10. Juli 2024',
        imageUrl: 'https://images.unsplash.com/photo-1501127122-f38540107a43'
    },
    {
        category: 'Reinigung',
        title: 'Abnahmegarantie: Was bedeutet sie wirklich?',
        excerpt: 'Die Umzugsreinigung steht an? Wir erklären, was eine Abnahmegarantie beinhaltet und worauf Sie bei der Wahl des Anbieters achten müssen.',
        author: 'Sandra Frei',
        date: '05. Juli 2024',
        imageUrl: 'https://images.unsplash.com/photo-1599382833338-23229f33b1f9'
    }
];

const BlogPreview: React.FC = () => {
    return (
        <section className="py-24 sm:py-32 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Nützliche Ratgeber & Tipps</h2>
                    <p className="text-lg text-slate-600">
                        Profitieren Sie von unserem Expertenwissen. Wir teilen die besten Ratschläge rund um Ihre Projekte.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => {
                        const baseUrl = `${post.imageUrl.split('?')[0]}?auto=format&fit=crop&q=75`;
                        return (
                            <a href="#" key={index} className="group bg-white rounded-2xl border border-slate-200/80 shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                <div className="relative">
                                    <img 
                                        src={`${baseUrl}&w=400`}
                                        srcSet={`${baseUrl}&w=400 400w, ${baseUrl}&w=800 800w`}
                                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                        alt={post.title} 
                                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" 
                                    />
                                    <span className="absolute top-4 left-4 bg-primary-700 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">{post.category}</span>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors">{post.title}</h3>
                                    <p className="text-slate-600 leading-relaxed flex-grow mb-4">{post.excerpt}</p>
                                    <div className="text-sm text-slate-500 flex items-center justify-between border-t border-slate-200 pt-4 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <UserIcon className="w-4 h-4" />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CalendarDaysIcon className="w-4 h-4" />
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
                 <div className="text-center mt-16">
                    <a href="#" className="font-bold text-primary-700 inline-flex items-center gap-2 group">
                        <span>Alle Artikel ansehen</span>
                        <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;