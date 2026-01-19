import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Fix: Renamed useAppStore to useAppContext to match the exported member from AppContext.
import { useAppContext } from '../pages/AppContext';

type Language = 'de' | 'fr' | 'it' | 'en' | 'es' | 'pt' | 'nl' | 'pl' | 'tr' | 'ru';

const translations = {
    de: {
        services: 'Dienstleistungen',
        move: 'Umzug',
        cleaning: 'Reinigung',
        painting: 'Malerarbeiten',
        craftsmen: 'Handwerker',
        gardening: 'Gartenpflege',
        company: 'Unternehmen',
        aboutUs: 'Über uns',
        contact: 'Kontakt',
        career: 'Karriere',
        press: 'Presse',
        becomePartner: 'Partner werden',
        legal: 'Rechtliches',
        imprint: 'Impressum',
        agb: 'AGB',
        privacy: 'Datenschutz',
        slogan: 'Der einfachste Weg zu den besten Angeboten in der Schweiz. Wir verbinden Sie schnell und kostenlos mit geprüften Profis.',
        copyright: 'Alle Rechte vorbehalten.',
    },
    fr: {
        services: 'Services',
        move: 'Déménagement',
        cleaning: 'Nettoyage',
        painting: 'Peinture',
        craftsmen: 'Artisans',
        gardening: 'Jardinage',
        company: 'Entreprise',
        aboutUs: 'À propos de nous',
        contact: 'Contact',
        career: 'Carrières',
        press: 'Presse',
        becomePartner: 'Devenir partenaire',
        legal: 'Légal',
        imprint: 'Mentions légales',
        agb: 'CGU',
        privacy: 'Confidentialité',
        slogan: 'Le moyen le plus simple d\'obtenir les meilleures offres en Suisse. Nous vous mettons en relation rapidement et gratuitement avec des professionnels vérifiés.',
        copyright: 'Tous droits réservés.',
    },
    it: {
        services: 'Servizi',
        move: 'Trasloco',
        cleaning: 'Pulizia',
        painting: 'Pittura',
        craftsmen: 'Artigiani',
        gardening: 'Giardinaggio',
        company: 'Azienda',
        aboutUs: 'Chi siamo',
        contact: 'Contatto',
        career: 'Carriere',
        press: 'Stampa',
        becomePartner: 'Diventa partner',
        legal: 'Legale',
        imprint: 'Impressum',
        agb: 'CGC',
        privacy: 'Privacy',
        slogan: 'Il modo più semplice per ottenere le migliori offerte in Svizzera. Ti mettiamo in contatto rapidamente e gratuitamente con professionisti verificati.',
        copyright: 'Tutti i diritti riservati.',
    },
    en: {
        services: 'Services',
        move: 'Moving',
        cleaning: 'Cleaning',
        painting: 'Painting',
        craftsmen: 'Craftsmen',
        gardening: 'Gardening',
        company: 'Company',
        aboutUs: 'About Us',
        contact: 'Contact',
        career: 'Careers',
        press: 'Press',
        becomePartner: 'Become a Partner',
        legal: 'Legal',
        imprint: 'Imprint',
        agb: 'Terms',
        privacy: 'Privacy',
        slogan: 'The easiest way to get the best offers in Switzerland. We connect you quickly and free of charge with verified professionals.',
        copyright: 'All rights reserved.',
    },
    es: {
        services: 'Servicios',
        move: 'Mudanza',
        cleaning: 'Limpieza',
        painting: 'Pintura',
        craftsmen: 'Artesanos',
        gardening: 'Jardinería',
        company: 'Empresa',
        aboutUs: 'Sobre nosotros',
        contact: 'Contacto',
        career: 'Carreras',
        press: 'Prensa',
        becomePartner: 'Convertirse en socio',
        legal: 'Legal',
        imprint: 'Aviso legal',
        agb: 'Términos',
        privacy: 'Privacidad',
        slogan: 'La forma más fácil de obtener las mejores ofertas en Suiza. Le conectamos de forma rápida y gratuita con profesionales verificados.',
        copyright: 'Todos los derechos reservados.',
    },
    pt: {
        services: 'Serviços',
        move: 'Mudanças',
        cleaning: 'Limpeza',
        painting: 'Pintura',
        craftsmen: 'Artesãos',
        gardening: 'Jardinagem',
        company: 'Empresa',
        aboutUs: 'Sobre nós',
        contact: 'Contato',
        career: 'Carreiras',
        press: 'Imprensa',
        becomePartner: 'Torne-se um parceiro',
        legal: 'Legal',
        imprint: 'Impressão',
        agb: 'Termos',
        privacy: 'Privacidade',
        slogan: 'A maneira mais fácil de obter as melhores ofertas na Suíça. Conectamos você de forma rápida e gratuita com profissionais verificados.',
        copyright: 'Todos os direitos reservados.',
    },
    nl: {
        services: 'Diensten',
        move: 'Verhuizen',
        cleaning: 'Schoonmaak',
        painting: 'Schilderwerk',
        craftsmen: 'Vakmensen',
        gardening: 'Tuinonderhoud',
        company: 'Bedrijf',
        aboutUs: 'Over ons',
        contact: 'Contact',
        career: 'Carrière',
        press: 'Pers',
        becomePartner: 'Partner worden',
        legal: 'Juridisch',
        imprint: 'Colofon',
        agb: 'AV',
        privacy: 'Privacy',
        slogan: 'De eenvoudigste weg naar de beste offertes in Zwitserland. Wij verbinden u snel en gratis met geverifieerde professionals.',
        copyright: 'Alle rechten voorbehouden.',
    },
    pl: {
        services: 'Usługi',
        move: 'Przeprowadzka',
        cleaning: 'Sprzątanie',
        painting: 'Malowanie',
        craftsmen: 'Rzemieślnicy',
        gardening: 'Pielęgnacja ogrodu',
        company: 'Firma',
        aboutUs: 'O nas',
        contact: 'Kontakt',
        career: 'Kariera',
        press: 'Prasa',
        becomePartner: 'Zostań partnerem',
        legal: 'Prawne',
        imprint: 'Nota prawna',
        agb: 'Regulamin',
        privacy: 'Prywatność',
        slogan: 'Najprostszy sposób na uzyskanie najlepszych ofert w Szwajcarii. Szybko i bezpłatnie łączymy Cię ze sprawdzonymi profesjonalistami.',
        copyright: 'Wszelkie prawa zastrzeżone.',
    },
    tr: {
        services: 'Hizmetler',
        move: 'Taşıma',
        cleaning: 'Temizlik',
        painting: 'Boya',
        craftsmen: 'Zanaatkarlar',
        gardening: 'Bahçe Bakımı',
        company: 'Şirket',
        aboutUs: 'Hakkımızda',
        contact: 'İletişim',
        career: 'Kariyer',
        press: 'Basın',
        becomePartner: 'Partner Olun',
        legal: 'Yasal',
        imprint: 'Künye',
        agb: 'Şartlar',
        privacy: 'Gizlilik',
        slogan: 'İsviçre\'deki en iyi teklifleri almanın en kolay yolu. Sizi doğrulanmış profesyonellerle hızlı ve ücretsiz bir şekilde buluşturuyoruz.',
        copyright: 'Tüm hakları saklıdır.',
    },
    ru: {
        services: 'Услуги',
        move: 'Переезд',
        cleaning: 'Уборка',
        painting: 'Покраска',
        craftsmen: 'Мастера',
        gardening: 'Садоводство',
        company: 'Компания',
        aboutUs: 'О нас',
        contact: 'Контакты',
        career: 'Карьера',
        press: 'Пресса',
        becomePartner: 'Стать партнером',
        legal: 'Правовая информация',
        imprint: 'Выходные данные',
        agb: 'Условия',
        privacy: 'Конфиденциальность',
        slogan: 'Самый простой способ получить лучшие предложения в Швейцарии. Мы быстро и бесплатно связываем вас с проверенными профессионалами.',
        copyright: 'Все права защищены.',
    }
}

const Footer: React.FC = () => {
    const { language } = useAppContext();
    const t = translations[language];

    const linkSections = {
        [t.services]: [
            { name: t.move, to: '/services' },
            { name: t.cleaning, to: '/services' },
            { name: t.painting, to: '/services' },
            { name: t.craftsmen, to: '/services' },
            { name: t.gardening, to: '/services' },
        ],
        [t.company]: [
            { name: t.aboutUs, to: '/ueber-uns' },
            { name: t.contact, to: '/kontakt' },
            { name: t.career, to: '/jobs' },
            { name: t.press, to: '#' },
            { name: t.becomePartner, to: '/providers' },
        ],
        [t.legal]: [
            { name: t.imprint, to: '/impressum' },
            { name: t.agb, to: '/agb' },
            { name: t.privacy, to: '/datenschutz' },
        ]
    };

    return (
        <footer className="bg-slate-900 text-slate-400">
            <div className="container mx-auto px-6 py-12 md:py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
                    <div className="col-span-2 lg:col-span-2 mb-8 lg:mb-0">
                         <Link to="/" className="flex flex-col mb-4">
                            <span className="font-extrabold text-xl text-white tracking-tight">Fertigo</span>
                            <span className="text-xs font-normal text-primary-400 tracking-tight -mt-1">Clever, Günstig, Flexibel</span>
                        </Link>
                        <p className="text-slate-400 text-sm md:text-base max-w-sm mt-4">{t.slogan}</p>
                    </div>

                    {Object.entries(linkSections).map(([title, links]) => (
                        <div key={title} className={title === t.services ? 'hidden md:block' : ''}>
                            <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">{title}</h3>
                            <ul className="space-y-3 text-sm md:text-base">
                                {links.map(link => (
                                    <li key={link.name}>
                                        <Link to={link.to} className="hover:text-white transition-colors hover:underline underline-offset-2">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>
            </div>
            <div className="bg-slate-950/50 py-6">
                <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-slate-400 text-xs sm:text-sm text-center sm:text-left">
                        &copy; {new Date().getFullYear()} Fertigo. {t.copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;