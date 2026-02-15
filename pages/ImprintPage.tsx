
import React from 'react';
import { MailIcon, PhoneIcon } from '../components/icons';

const ImprintPage: React.FC = () => {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-12 text-center">Impressum</h1>

                <div className="prose prose-lg max-w-none text-slate-700 bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">


                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Kontaktadresse</h2>
                    <address className="not-italic py-2">
                        <strong>Fertigo</strong><br />
                        Roberto Steiner<br />
                        Bahnhofstrasse 110<br />
                        6423 Seewen SZ<br />
                        Schweiz
                    </address>

                    <div className="mt-6 space-y-4">
                        <p>
                            E-Mail: <a href="mailto:info@fertigo.ch" className="text-primary-700 hover:underline">info@fertigo.ch</a>
                        </p>
                    </div>





                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Haftungsausschluss</h2>
                    <p>Die Firma Fertigo übernimmt keine Gewähr für die inhaltliche Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit oder Vollständigkeit der bereitgestellten Informationen.</p>
                    <p>Haftungsansprüche gegen die Firma Fertigo wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff auf die veröffentlichten Informationen, deren Nutzung oder Nichtnutzung, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden – soweit gesetzlich zulässig – ausgeschlossen.</p>
                    <p>Alle Angebote sind unverbindlich. Die Firma Fertigo behält sich ausdrücklich vor, Teile der Website oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder dauerhaft einzustellen.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Haftung für Links</h2>
                    <p>Verweise und Links auf Webseiten Dritter liegen ausserhalb des Verantwortungsbereichs von Fertigo. Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr der Nutzerinnen und Nutzer.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Urheberrechte</h2>
                    <p>Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website gehören ausschliesslich Fertigo oder den speziell genannten Rechteinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung des Urheberrechtsträgers im Voraus einzuholen.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Datenschutz</h2>
                    <p>Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Informationen zur Bearbeitung personenbezogener Daten finden Sie in unserer separaten Datenschutzerklärung.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Gerichtsstand und anwendbares Recht</h2>
                    <p>Es gilt ausschliesslich Schweizer Recht.</p>
                    <p>Gerichtsstand ist – soweit gesetzlich zulässig – der Sitz der Firma Fertigo.</p>
                </div>
            </div>
        </div>
    );
};

export default ImprintPage;
