
import React from 'react';

const DatenschutzPage: React.FC = () => {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-12 text-center">Datenschutzerklärung</h1>

                <div className="prose prose-lg max-w-none text-slate-700 bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">

                    <h2 className="text-2xl font-bold text-slate-800 mt-2 mb-4">1. Verantwortlicher</h2>
                    <p>Verantwortlich für die Datenbearbeitung auf der Plattform fertigo.ch ist:</p>
                    <address className="not-italic py-2">
                        <strong>Fertigo</strong><br />
                        Roberto Steiner<br />
                        Bahnhofstrasse 110<br />
                        6423 Seewen SZ<br />
                        Schweiz
                    </address>
                    <p className="mb-6">E-Mail: <a href="mailto:info@fertigo.ch" className="text-primary-700 hover:underline">info@fertigo.ch</a></p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">2. Bearbeitete Personendaten</h2>
                    <p>Wir bearbeiten insbesondere folgende Personendaten:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Name und Vorname</li>
                        <li>Adresse</li>
                        <li>Telefonnummer</li>
                        <li>E-Mail-Adresse</li>
                        <li>Projektdaten und Kommunikationsinhalte</li>
                        <li>Zahlungsinformationen (soweit für die Abwicklung erforderlich)</li>
                        <li>IP-Adresse</li>
                        <li>Geräte- und Browserinformationen</li>
                        <li>Nutzungs- und Zugriffsdaten</li>
                    </ul>
                    <p>Diese Daten werden entweder direkt von Ihnen bereitgestellt oder automatisch bei der Nutzung der Plattform erhoben.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">3. Zweck der Datenbearbeitung</h2>
                    <p>Die Bearbeitung der Personendaten erfolgt insbesondere zur:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Bereitstellung und technischen Verwaltung der Plattform</li>
                        <li>Vermittlung von Dienstleistungen zwischen Auftraggebern und Handwerkern</li>
                        <li>Zahlungsabwicklung</li>
                        <li>Kommunikation zwischen Nutzern</li>
                        <li>Missbrauchs- und Betrugsprävention</li>
                        <li>Einhaltung gesetzlicher Verpflichtungen</li>
                        <li>Durchsetzung unserer Rechte</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">4. Zahlungsabwicklung über externen Dienstleister</h2>
                    <p>Die Zahlungsabwicklung erfolgt über:</p>
                    <address className="not-italic py-2">
                        <strong>Payrexx AG</strong><br />
                        Burgstrasse 18<br />
                        3600 Thun<br />
                        Schweiz
                    </address>
                    <p>Zahlungsdaten werden direkt an den Zahlungsdienstleister übermittelt und dort eigenverantwortlich verarbeitet.</p>
                    <p>Es gelten ergänzend die Datenschutzbestimmungen des Zahlungsdienstleisters.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">5. Weitergabe von Personendaten</h2>
                    <p>Personendaten werden nur weitergegeben, soweit dies erforderlich ist, insbesondere an:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Vertragspartner (Handwerker oder Auftraggeber)</li>
                        <li>Hosting- und IT-Dienstleister</li>
                        <li>Zahlungsdienstleister</li>
                        <li>Behörden oder Gerichte bei gesetzlicher Verpflichtung</li>
                        <li>Berater (z. B. Treuhänder, Rechtsanwälte), soweit erforderlich</li>
                    </ul>
                    <p>Eine darüber hinausgehende Weitergabe erfolgt nicht ohne Ihre Einwilligung.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">6. Speicherung und Aufbewahrungsdauer</h2>
                    <p>Personendaten werden nur so lange gespeichert, wie dies:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>zur Vertragserfüllung erforderlich ist</li>
                        <li>gesetzlich vorgeschrieben ist (z. B. handels- oder steuerrechtliche Aufbewahrungspflichten)</li>
                        <li>zur Durchsetzung oder Abwehr von Rechtsansprüchen notwendig ist</li>
                    </ul>
                    <p>Nach Wegfall des Speicherzwecks werden die Daten gelöscht oder anonymisiert.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">7. Rechte der betroffenen Personen</h2>
                    <p>Gemäss dem Schweizer Datenschutzgesetz (revDSG) haben Sie insbesondere folgende Rechte:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Recht auf Auskunft über bearbeitete Personendaten</li>
                        <li>Recht auf Berichtigung unrichtiger Daten</li>
                        <li>Recht auf Löschung von Daten, sofern keine gesetzliche Aufbewahrungspflicht besteht</li>
                        <li>Recht auf Einschränkung der Bearbeitung</li>
                        <li>Recht auf Herausgabe oder Übertragung Ihrer Daten (Datenportabilität)</li>
                        <li>Recht auf Widerspruch gegen bestimmte Datenbearbeitungen</li>
                    </ul>
                    <p>Anfragen sind schriftlich an die oben genannte Kontaktadresse zu richten.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">8. Datensicherheit</h2>
                    <p>Wir treffen angemessene technische und organisatorische Sicherheitsmassnahmen, um Personendaten vor unbefugtem Zugriff, Verlust, Missbrauch oder Manipulation zu schützen.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">9. Cookies und Tracking-Technologien</h2>
                    <p>Die Plattform kann Cookies oder vergleichbare Technologien verwenden, um die Benutzerfreundlichkeit zu verbessern, statistische Auswertungen zu ermöglichen und die Sicherheit der Plattform zu gewährleisten.</p>
                    <p>Nutzer können die Speicherung von Cookies in den Browsereinstellungen einschränken oder deaktivieren.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">10. Änderungen der Datenschutzerklärung</h2>
                    <p>Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen.</p>
                    <p>Es gilt jeweils die auf der Plattform veröffentlichte Version.</p>

                    <p className="mt-8 text-sm text-slate-500">Stand: Februar 2026</p>
                </div>
            </div>
        </div>
    );
};

export default DatenschutzPage;
