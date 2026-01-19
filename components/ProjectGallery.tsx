import React from 'react';
import { ArrowRightIcon } from './icons';

const projects = [
    {
        title: 'Wohnzimmer Renovation',
        location: 'Bern',
        imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab',
        colSpan: 'md:col-span-2'
    },
    {
        title: 'Gartenneugestaltung',
        location: 'Genf',
        imageUrl: 'https://images.unsplash.com/photo-1599793393169-30c55047e33a',
        colSpan: ''
    },
    {
        title: 'Küchenmontage',
        location: 'Luzern',
        imageUrl: 'https://images.unsplash.com/photo-1556912173-3e7472d2b442',
        colSpan: ''
    },
    {
        title: 'Badezimmerumbau',
        location: 'Zürich',
        imageUrl: 'https://images.unsplash.com/photo-1603959124326-a7fb0a2d2169',
        colSpan: 'md:col-span-2'
    },
    {
        title: 'Fassadenanstrich',
        location: 'Basel',
        imageUrl: 'https://images.unsplash.com/photo-1568605117495-4c2703a89a07',
        colSpan: 'md:col-span-1'
    }
];

const ProjectGallery: React.FC = () => {
    const handleScrollAndFocus = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const formElement = document.getElementById('hero-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const firstServiceButton = formElement.querySelector<HTMLSelectElement>('select');
            if (firstServiceButton) {
                setTimeout(() => {
                    firstServiceButton.focus({ preventScroll: true });
                }, 500);
            }
        }
    };

    return (
        <section className="bg-slate-50 py-24 sm:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Lassen Sie sich inspirieren</h2>
                    <p className="text-lg text-slate-600">
                        Entdecken Sie eine Auswahl an erfolgreich abgeschlossenen Projekten, die über unsere Plattform realisiert wurden.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project, index) => {
                        const baseUrl = `${project.imageUrl.split('?')[0]}?auto=format&fit=crop&q=75&fm=webp`;
                        return (
                            <a href="#hero-form" key={index} className={`group relative block rounded-2xl overflow-hidden shadow-lg h-80 ${project.colSpan}`}>
                               <img 
                                    src={`${baseUrl}&w=800`}
                                    srcSet={`${baseUrl}&w=400 400w, ${baseUrl}&w=800 800w, ${baseUrl}&w=1200 1200w`}
                                    sizes={project.colSpan === 'md:col-span-2' ? "(min-width: 768px) 67vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                                    alt={project.title} 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                    loading="lazy"
                                    decoding="async"
                                />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                               <div className="relative p-6 h-full flex flex-col justify-end text-white">
                                    <h3 className="text-2xl font-bold mb-1 transition-transform duration-300 transform translate-y-4 group-hover:translate-y-0">{project.title}</h3>
                                    <p className="text-slate-200 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">{project.location}</p>
                               </div>
                            </a>
                        );
                    })}
                </div>

                 <div className="text-center mt-16">
                    <a href="#hero-form" onClick={handleScrollAndFocus} className="bg-primary-700 text-white px-8 py-3.5 rounded-lg font-bold inline-flex items-center gap-2 hover:bg-primary-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        Starten Sie Ihr Projekt <ArrowRightIcon className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProjectGallery;