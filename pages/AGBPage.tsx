
import React from 'react';

const AGBPage: React.FC = () => {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-12 text-center">Allgemeine Geschäftsbedingungen (AGB)</h1>

                <div className="prose prose-lg max-w-none text-slate-700 bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">

                    <h2 className="text-2xl font-bold text-slate-800 mt-2 mb-4">1. Betreiber und Geltungsbereich</h2>
                    <p>Diese Plattform wird betrieben von:</p>
                    <address className="not-italic py-2">
                        <strong>Fertigo</strong><br />
                        Roberto Steiner<br />
                        Bahnhofstrasse 110<br />
                        6423 Seewen SZ<br />
                        Schweiz
                    </address>
                    <p className="mb-6">E-Mail: <a href="mailto:info@fertigo.ch" className="text-primary-700 hover:underline">info@fertigo.ch</a></p>
                    <p>Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Nutzung der Plattform fertigo.ch für sämtliche Nutzerinnen und Nutzer (Auftraggeber und Handwerker).</p>
                    <p>Die Plattform dient ausschliesslich der Vermittlung von Handwerksdienstleistungen innerhalb der Schweiz.</p>
                    <p>Mit der Registrierung oder Nutzung der Plattform akzeptieren die Nutzer diese AGB verbindlich.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">2. Rolle des Betreibers (Vermittlungsplattform)</h2>
                    <p>Der Betreiber stellt ausschliesslich die technische Infrastruktur zur Verfügung.</p>
                    <p>Der Betreiber vermittelt Kontakte zwischen Auftraggebern und selbständigen Handwerkern.</p>
                    <p>Der Betreiber ist nicht Vertragspartei der zwischen Auftraggeber und Handwerker geschlossenen Werkverträge.</p>
                    <p>Verträge kommen ausschliesslich zwischen Auftraggeber und Handwerker zustande.</p>
                    <p>Der Betreiber übernimmt keine Gewähr für Qualität, Ausführung, Preise, Termine, Gewährleistung oder sonstige Vertragspflichten der Parteien.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">3. Registrierung und Benutzerkonto</h2>
                    <p>Die Nutzung bestimmter Funktionen setzt eine Registrierung voraus.</p>
                    <p>Nutzer verpflichten sich zu wahrheitsgemässen, vollständigen und aktuellen Angaben.</p>
                    <p>Zugangsdaten sind vertraulich zu behandeln.</p>
                    <p>Der Betreiber ist berechtigt, Benutzerkonten bei Verstössen, Zahlungsverzug, Betrugsverdacht oder missbräuchlicher Nutzung jederzeit ohne Vorankündigung zu sperren oder dauerhaft zu löschen.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">4. Plattformgebühren und Provision</h2>
                    <p>Die Nutzung der Plattform kann kostenpflichtig sein.</p>
                    <p>Der Betreiber ist berechtigt, für vermittelte Aufträge eine Provision oder Servicegebühr zu erheben.</p>
                    <p>Die Höhe der Gebühren wird auf der Plattform transparent ausgewiesen.</p>
                    <p>Gebühren sind unabhängig vom Erfolg oder Ausgang eines Werkvertrags geschuldet, sofern eine Vermittlung zustande gekommen ist.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">5. Zahlungsabwicklung</h2>
                    <p>Die elektronische Zahlungsabwicklung erfolgt ausschliesslich über den externen Zahlungsdienstleister:</p>
                    <address className="not-italic py-2">
                        <strong>Payrexx AG</strong><br />
                        Burgstrasse 18<br />
                        3600 Thun<br />
                        Schweiz
                    </address>
                    <p>Der Betreiber ist zu keinem Zeitpunkt im Besitz oder Verwahrer von Kundengeldern.</p>
                    <p>Für Zahlungsstörungen, Rückbuchungen oder technische Fehler des Zahlungsdienstleisters wird – soweit gesetzlich zulässig – keine Haftung übernommen.</p>
                    <p>Ergänzend gelten die Geschäftsbedingungen des Zahlungsdienstleisters.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">6. Pflichten der Handwerker</h2>
                    <p>Handwerker bestätigen insbesondere:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>als selbständige Unternehmer tätig zu sein</li>
                        <li>über sämtliche erforderlichen Bewilligungen und Zulassungen zu verfügen</li>
                        <li>steuerliche und sozialversicherungsrechtliche Pflichten eigenverantwortlich zu erfüllen</li>
                        <li>eine ausreichende Betriebshaftpflichtversicherung zu unterhalten</li>
                        <li>keine Schwarzarbeit oder gesetzeswidrige Leistungen zu erbringen</li>
                    </ul>
                    <p>Der Handwerker stellt den Betreiber von sämtlichen Ansprüchen Dritter frei, die aus Pflichtverletzungen resultieren.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">7. Pflichten der Auftraggeber</h2>
                    <p>Auftraggeber verpflichten sich:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>vollständige und wahrheitsgemässe Projektangaben zu machen</li>
                        <li>vereinbarte Zahlungen fristgerecht zu leisten</li>
                        <li>keine missbräuchlichen, betrügerischen oder rechtswidrigen Anfragen zu stellen</li>
                        <li>keine Umgehung der Plattform zur Provisionsvermeidung vorzunehmen</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">8. Verbot der Umgehung (Anti-Umgehungsklausel)</h2>
                    <p>Es ist den Nutzern untersagt, nach Kontaktaufnahme über die Plattform Aufträge unter Umgehung der Plattform abzuwickeln, um Gebühren oder Provisionen zu vermeiden.</p>
                    <p>Bei Verstoss behält sich der Betreiber Schadenersatzforderungen sowie die sofortige Kontosperrung vor.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">9. Bewertungen und Inhalte</h2>
                    <p>Bewertungen müssen sachlich und wahrheitsgetreu sein.</p>
                    <p>Rechtswidrige, beleidigende oder rufschädigende Inhalte sind untersagt.</p>
                    <p>Der Betreiber ist berechtigt, Inhalte jederzeit zu prüfen, zu entfernen oder zu sperren.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">10. Haftung</h2>
                    <p>Der Betreiber haftet ausschliesslich für vorsätzlich oder grob fahrlässig verursachte Schäden.</p>
                    <p>Jede Haftung für leichte Fahrlässigkeit wird – soweit gesetzlich zulässig – ausgeschlossen.</p>
                    <p>Eine Haftung für indirekte Schäden, Folgeschäden, entgangenen Gewinn oder Datenverluste ist ausgeschlossen.</p>
                    <p>Der Betreiber haftet nicht für Leistungsstörungen zwischen Auftraggeber und Handwerker.</p>
                    <p>Der Betreiber haftet nicht für Identitätsangaben oder Qualifikationsangaben der Nutzer.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">11. Haftungsfreistellung</h2>
                    <p>Nutzer verpflichten sich, den Betreiber von sämtlichen Ansprüchen Dritter freizustellen, die im Zusammenhang mit:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Vertragsverletzungen</li>
                        <li>Gesetzesverstössen</li>
                        <li>Streitigkeiten zwischen Nutzern</li>
                        <li>rechtswidrigen Inhalten</li>
                    </ul>
                    <p>entstehen.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">12. Plattformverfügbarkeit</h2>
                    <p>Der Betreiber übernimmt keine Gewähr für eine jederzeit unterbrechungsfreie, sichere oder fehlerfreie Verfügbarkeit der Plattform.</p>
                    <p>Wartungsarbeiten, technische Störungen oder höhere Gewalt können zu Unterbrechungen führen.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">13. Datenschutz</h2>
                    <p>Es gilt die separate Datenschutzerklärung in der jeweils aktuellen Fassung.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">14. Änderungen der AGB</h2>
                    <p>Der Betreiber behält sich vor, diese AGB jederzeit zu ändern.</p>
                    <p>Die jeweils gültige Version wird auf der Plattform veröffentlicht.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">15. Salvatorische Klausel</h2>
                    <p>Sollten einzelne Bestimmungen dieser AGB unwirksam oder nicht durchsetzbar sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">16. Anwendbares Recht und Gerichtsstand</h2>
                    <p>Es gilt ausschliesslich Schweizer Recht.</p>
                    <p>Gerichtsstand ist – soweit gesetzlich zulässig – der Sitz des Betreibers.</p>

                    <p className="mt-8 text-sm text-slate-500">Stand: Februar 2026</p>

                </div>
            </div>
        </div>
    );
};

export default AGBPage;
