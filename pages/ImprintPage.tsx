
import React from 'react';
import { MailIcon, PhoneIcon } from '../components/icons';

const ImprintPage: React.FC = () => {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-12 text-center">Impressum</h1>
                
                <div className="prose prose-lg max-w-none text-slate-700 bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
                    <p>Angaben gemäss § 5 TMG und Art. 3 Abs. 1 lit. s UWG</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Kontaktadresse</h2>
                    <address className="not-italic border-l-4 border-primary-200 pl-6 py-2">
                        <strong>Fertigo AG</strong><br />
                        Musterstrasse 123<br />
                        8001 Zürich<br />
                        Schweiz
                    </address>
                    
                    <div className="mt-6 space-y-4">
                        <p className="flex items-center gap-3">
                            <MailIcon className="w-5 h-5 text-primary-700 flex-shrink-0" />
                            <span>E-Mail: <a href="mailto:info@fertigo.ch" className="text-primary-700 hover:underline">info@fertigo.ch</a></span>
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Vertretungsberechtigte Personen</h2>
                    <p>Max Mustermann, Geschäftsführer</p>
                    <p>Erika Mustermann, Verwaltungsrätin</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Handelsregistereintrag</h2>
                    <p>Eingetragener Firmenname: Fertigo AG</p>
                    <p>Handelsregisternummer: CHE-123.456.789</p>
                    <p>Handelsregisteramt: Kanton Zürich</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Mehrwertsteuernummer</h2>
                    <p>CHE-123.456.789 MWST</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Haftungsausschluss</h2>
                    <p>Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.</p>
                    <p>Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne besondere Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.</p>
                    
                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Haftung für Links</h2>
                    <p>Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des Nutzers oder der Nutzerin.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Urheberrechte</h2>
                    <p>Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich der Firma Fertigo AG oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.</p>
                </div>
            </div>
        </div>
    );
};

export default ImprintPage;
