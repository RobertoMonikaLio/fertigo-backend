import React from 'react';
import { ArrowRightIcon, CheckIcon } from './icons';

const CTA: React.FC = () => {
    const handleScrollAndFocus = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const formElement = document.getElementById('hero-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const firstServiceButton = formElement.querySelector<HTMLButtonElement>('button[type="button"]');
            if (firstServiceButton) {
                setTimeout(() => {
                    firstServiceButton.focus({ preventScroll: true });
                    firstServiceButton.classList.add('ring-2', 'ring-offset-2', 'ring-primary-500', 'ring-offset-white', 'transition-shadow', 'duration-300');
                    setTimeout(() => {
                        firstServiceButton.classList.remove('ring-2', 'ring-offset-2', 'ring-primary-500', 'ring-offset-white');
                    }, 2000);
                }, 500);
            }
        }
    };

    return (
        <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 py-16 sm:py-20 md:py-24">
            <div className="container mx-auto px-6 max-w-6xl text-center">
                <h2 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Bereit für Ihr Projekt?</h2>
                <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                    Über 50.000 Schweizer haben bereits Zeit und Geld gespart. Seien Sie der Nächste!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#hero-form" onClick={handleScrollAndFocus} className="bg-primary-600 text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Kostenlos Offerten anfordern <ArrowRightIcon className="w-5 h-5" />
                    </a>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-slate-600 text-sm mt-8">
                    <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4 text-green-400" /> Keine Anmeldung erforderlich</span>
                    <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4 text-green-400" /> 100% kostenlos</span>
                    <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4 text-green-400" /> Keine Verpflichtungen</span>
                </div>
            </div>
        </section>
    );
};

export default CTA;