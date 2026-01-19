import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'de' | 'fr' | 'it' | 'en' | 'es' | 'pt' | 'nl' | 'pl' | 'tr' | 'ru';

interface LeadPurchaseInfo {
  [leadId: number]: number;
}

export interface Request {
    id: number;
    title: string;
    service: string;
    customer: string;
    location: string;
    date: string;
    status: 'Neu' | 'Kontaktiert' | 'Angebot gesendet' | 'In Verhandlung' | 'Gewonnen' | 'Verloren / Abgelehnt';
    price: number;
    details: { label: string; value: string }[];
    description: string;
    files: { name: string; url: string }[];
    customerInfo: {
        name: string;
        address: string;
        email: string;
        phone: string | null;
        mobile: string | null;
    };
    onSiteVisit?: string;
    materialProcurement?: string;
    onSiteService?: boolean;
    additionalNotes?: string;
    budget?: string;
    qualityScore: number;
}

const allRequests: Request[] = [
    { id: 1, title: 'Malerarbeiten - 3-Zimmer-Wohnung', service: 'Malerarbeiten', customer: 'Anna Meier', location: '8004 Zürich', date: '25. Juli 2024', status: 'Kontaktiert', price: 15.00, budget: "CHF 1'500 - 2'000", qualityScore: 85, onSiteService: true, onSiteVisit: 'Ja, nach Absprache', materialProcurement: 'Wird vom Anbieter beschafft', additionalNotes: 'Die Wände sind in gutem Zustand, aber es gibt einige feine Risse über den Fenstern. Bitte spezielles Augenmerk darauf legen. Parkplatz vor dem Haus vorhanden.', details: [ { label: 'Objekttyp', value: 'Wohnung' }, { label: 'Anzahl Zimmer', value: '3' }, { label: 'Fläche', value: 'ca. 85m²' }, { label: 'Zu streichende Elemente', value: 'Wände & Decken' }, { label: 'Aktuelle Farbe', value: 'Weiss' }, { label: 'Gewünschte Farbe', value: 'Weiss (gleicher Farbton)' }, { label: 'Zeitrahmen', value: 'Innerhalb 1 Monat' }, ], description: "Guten Tag, ich suche einen Maler für meine 3-Zimmer-Wohnung in Zürich Kreis 4. Die Wände und Decken sollen neu in weiss gestrichen werden. Es sind ein paar kleine Dübellöcher und feine Risse vorhanden, die vor dem Streichen fachmännisch verspachtelt werden sollten. Die Wohnung ist unmöbliert. Bitte um eine Offerte.", files: [ { name: 'wohnzimmer.jpg', url: '#' }, { name: 'schlafzimmer_riss.jpg', url: '#' }, { name: 'grundriss.pdf', url: '#' }, ], customerInfo: { name: 'Anna Meier', address: 'Langstrasse 100, 8004 Zürich', email: 'anna.meier@example.com', phone: '044 111 22 33', mobile: '079 111 22 33', } },
    { id: 2, title: 'Gartenpflege für Einfamilienhaus', service: 'Gartenpflege', customer: 'Peter Schmidt', location: '6000 Luzern', date: '24. Juli 2024', status: 'Angebot gesendet', price: 15.00, budget: "CHF 500 - 800", qualityScore: 70, onSiteService: true, onSiteVisit: 'Ja, erwünscht', materialProcurement: 'Wird vom Anbieter beschafft', additionalNotes: 'Bitte auch das Laub auf dem Vorplatz entfernen.', details: [ { label: 'Objekttyp', value: 'Einfamilienhaus' }, { label: 'Gartenfläche', value: 'ca. 200m²' }, { label: 'Gewünschte Arbeiten', value: 'Heckenschnitt, Rasenpflege, Unkraut jäten' }, { label: 'Häufigkeit', value: 'Einmalig, mit Option auf Abo' }, { label: 'Zeitrahmen', value: 'So schnell wie möglich' }, ], description: "Wir benötigen einen Gärtner für unsere Liegenschaft in Luzern. Die Hecke (ca. 20m lang) muss geschnitten werden und der Rasen gemäht. Zudem sollte das Unkraut in den Beeten entfernt werden.", files: [], customerInfo: { name: 'Peter Schmidt', address: 'Bergstrasse 5, 6000 Luzern', email: 'p.schmidt@example.com', phone: null, mobile: '078 222 33 44', } },
    { id: 3, title: 'Umzugsreinigung mit Abnahmegarantie', service: 'Reinigung', customer: 'Sandra Keller', location: '8050 Oerlikon', date: '23. Juli 2024', status: 'Gewonnen', price: 15.00, budget: "CHF 700", qualityScore: 95, details: [{label: 'Objekttyp', value: 'Wohnung'}, {label: 'Zimmer', value: '4.5'}], description: 'Komplette Endreinigung für eine 4.5 Zimmer Wohnung mit Abnahmegarantie.', files: [{name: 'grundriss.pdf', url: '#'}], customerInfo: { name: 'Sandra Keller', address: 'Musterstrasse 1, 8050 Oerlikon', email: 's.keller@example.com', phone: '077 345 67 89', mobile: null } },
    { id: 4, title: 'Parkettboden schleifen und versiegeln', service: 'Bodenleger', customer: 'Markus Weber', location: '1201 Genf', date: '22. Juli 2024', status: 'Neu', price: 20.00, budget: "Offen", qualityScore: 60, details: [], description: 'Ca. 50m2 Parkettboden in Wohnzimmer schleifen und neu versiegeln (matt).', files: [], customerInfo: { name: 'Markus Weber', address: 'Rue de la Paix 10, 1201 Genf', email: 'm.weber@example.com', phone: '076 456 78 90', mobile: null } },
    { id: 5, title: 'Fensterreinigung Bürogebäude', service: 'Reinigung', customer: 'Firma Clean AG', location: '4051 Basel', date: '21. Juli 2024', status: 'Verloren / Abgelehnt', price: 10.00, budget: "Pauschal", qualityScore: 75, details: [{label: 'Anzahl Fenster', value: 'ca. 50'}], description: 'Regelmässige Fensterreinigung für unser Bürogebäude im Zentrum von Basel.', files: [], customerInfo: { name: 'Firma Clean AG', address: 'Hauptstrasse 1, 4051 Basel', email: 'kontakt@clean.ch', phone: '061 123 45 67', mobile: null } },
    { id: 6, title: 'Sanitär-Reparatur Wasserhahn', service: 'Sanitär', customer: 'Hans Frei', location: '8400 Winterthur', date: '20. Juli 2024', status: 'Neu', price: 20.00, budget: "Dringend", qualityScore: 90, details: [], description: 'Tropfender Wasserhahn im Badezimmer. Muss dringend repariert oder ersetzt werden.', files: [], customerInfo: { name: 'Hans Frei', address: 'Nebenstrasse 2, 8400 Winterthur', email: 'h.frei@example.com', phone: '079 567 89 01', mobile: null } },
    { id: 7, title: 'Elektroinstallationen Neubau', service: 'Elektroinstallationen', customer: 'BauInvest AG', location: '6300 Zug', date: '19. Juli 2024', status: 'In Verhandlung', price: 20.00, budget: "CHF 50'000+", qualityScore: 80, details: [{label: 'Projekt', value: 'Mehrfamilienhaus'}], description: 'Komplette Elektroinstallation für einen Neubau mit 8 Wohnungen. Bitte um Kontaktaufnahme zur Besprechung der Pläne.', files: [], customerInfo: { name: 'BauInvest AG', address: 'Baustrasse 3, 6300 Zug', email: 'info@bauinvest.ch', phone: '041 789 01 23', mobile: null } },
    { id: 8, title: 'Kompletter Umzug von Bern nach Thun', service: 'Umzug & Transport', customer: 'Familie Suter', location: '3000 Bern', date: '18. Juli 2024', status: 'Gewonnen', price: 25.00, budget: "CHF 2'500", qualityScore: 90, details: [ { label: 'Anzahl Zimmer', value: '5' }, { label: 'Stockwerk (Auszug)', value: '2. Stock' }, { label: 'Lift (Auszug)', value: 'Ja' }, { label: 'Stockwerk (Einzug)', value: 'Erdgeschoss' }, { label: 'Lift (Einzug)', value: 'Nein' }, { label: 'Besondere Objekte', value: 'Antiker Schrank' } ], description: 'Umzug einer 5-Zimmer-Wohnung von Bern nach Thun. Inklusive De- und Montage der Möbel.', files: [], customerInfo: { name: 'Familie Suter', address: 'Altstadtgasse 4, 3000 Bern', email: 'suter@example.com', phone: '079 987 65 43', mobile: null } },
    { id: 9, title: 'Dachreparatur nach Sturmschaden', service: 'Dachdecker', customer: 'Lisa Brunner', location: '9000 St. Gallen', date: '17. Juli 2024', status: 'Verloren / Abgelehnt', price: 25.00, budget: "Dringend", qualityScore: 65, details: [], description: 'Einige Ziegel wurden vom Sturm gelöst und müssen ersetzt werden.', files: [{name: 'dachschaden.jpg', url: '#'}], customerInfo: { name: 'Lisa Brunner', address: 'Dachweg 5, 9000 St. Gallen', email: 'l.brunner@example.com', phone: '071 234 56 78', mobile: null } },
    { id: 10, title: 'Heckenschnitt und Baumpflege', service: 'Gartenpflege', customer: 'Robert Koch', location: '8002 Zürich', date: '16. Juli 2024', status: 'Neu', price: 15.00, budget: "CHF 300-500", qualityScore: 45, details: [], description: 'Ca. 30m Thuja-Hecke schneiden und zwei Obstbäume zurückschneiden.', files: [], customerInfo: { name: 'Robert Koch', address: 'Gartenstrasse 6, 8002 Zürich', email: 'r.koch@example.com', phone: '079 112 23 34', mobile: null } },
    { id: 11, title: 'Fassadenreinigung Hochdruck', service: 'Reinigung', customer: 'ImmoVerwaltung AG', location: '4052 Basel', date: '26. Juli 2024', status: 'Neu', price: 20.00, budget: "CHF 3'000", qualityScore: 88, details: [ { label: 'Objekttyp', value: 'Mehrfamilienhaus' }, { label: 'Fassadenfläche', value: 'ca. 300m²' }, { label: 'Stockwerke', value: '4' }, ], description: 'Wir benötigen eine professionelle Hochdruckreinigung für die Fassade unseres Mehrfamilienhauses in Basel. Es handelt sich um eine verputzte Fassade mit leichten Algen- und Schmutzablagerungen.', files: [{ name: 'fassade_ansicht.jpg', url: '#' }], customerInfo: { name: 'ImmoVerwaltung AG', address: 'Musterweg 12, 4052 Basel', email: 'info@immoverwaltung.ch', phone: '061 123 45 67', mobile: null } },
    { id: 12, title: 'Montage neuer IKEA Küche', service: 'Küchenbau', customer: 'Corinne Dubois', location: '1203 Genf', date: '26. Juli 2024', status: 'Neu', price: 25.00, budget: "CHF 1'000", qualityScore: 78, details: [ { label: 'Küchen-Marke', value: 'IKEA' }, { label: 'Anzahl Schränke', value: 'ca. 10' }, { label: 'Geräteanschluss', value: 'Ja, alle Geräte (Kochfeld, Ofen, GSP)' }, ], description: 'Suche einen erfahrenen Monteur für den Zusammenbau und die Installation meiner neuen IKEA Küche. Alle Teile sind bereits vor Ort. Wasser- und Stromanschlüsse sind vorhanden und müssen nur noch verbunden werden.', files: [{ name: 'kuechenplan.pdf', url: '#' }], customerInfo: { name: 'Corinne Dubois', address: 'Rue de la Servette 50, 1203 Genf', email: 'c.dubois@email.ch', phone: null, mobile: '079 321 65 49' } },
    { id: 13, title: 'Gipserarbeiten Neubau EFH', service: 'Gipserarbeiten', customer: 'Architekturbüro Plan B', location: '6300 Zug', date: '25. Juli 2024', status: 'Neu', price: 50.00, budget: "CHF 25'000", qualityScore: 92, details: [ { label: 'Objekttyp', value: 'Neubau Einfamilienhaus' }, { label: 'Arbeiten', value: 'Grundputz, Weissputz, Abrieb' }, { label: 'Fläche', value: 'ca. 450m² Wand- & Deckenfläche' }, ], description: 'Wir suchen einen zuverlässigen Gipserbetrieb für die kompletten Gipserarbeiten bei einem Neubauprojekt in Zug. Es handelt sich um ein modernes Einfamilienhaus. Ausführung in Q3 Qualität. Detaillierte Pläne vorhanden.', files: [], customerInfo: { name: 'Architekturbüro Plan B', address: 'Baarerstrasse 80, 6300 Zug', email: 'projekt@plan-b.ch', phone: '041 711 22 33', mobile: null } },
    { id: 14, title: 'Grosse Tanne fällen', service: 'Baumpflege', customer: 'Rudolf Steiner', location: '9000 St. Gallen', date: '24. Juli 2024', status: 'Neu', price: 15.00, budget: "CHF 800 - 1'200", qualityScore: 82, details: [ { label: 'Baumart', value: 'Tanne' }, { label: 'Höhe', value: 'ca. 15-20 Meter' }, { label: 'Standort', value: 'Nahe am Haus' }, ], description: 'In meinem Garten steht eine grosse, alte Tanne, die zu nahe am Haus ist und gefällt werden muss. Der Baum muss stückweise abgetragen werden. Entsorgung des Materials ist erwünscht.', files: [{ name: 'baum_im_garten.jpg', url: '#' }], customerInfo: { name: 'Rudolf Steiner', address: 'Rosenbergstrasse 100, 9000 St. Gallen', email: 'r.steiner@mail.com', phone: '071 987 65 43', mobile: null } },
    { id: 15, title: 'Büroreinigung 2x pro Woche', service: 'Reinigung', customer: 'Startup Innovations GmbH', location: '8005 Zürich', date: '23. Juli 2024', status: 'Neu', price: 10.00, budget: "Pauschale / Monat", qualityScore: 70, details: [ { label: 'Fläche', value: 'ca. 250m²' }, { label: 'Räume', value: 'Grossraumbüro, 2 WCs, Küche' }, { label: 'Häufigkeit', value: '2x pro Woche (z.B. Di & Fr Abend)' }, ], description: 'Wir suchen ein zuverlässiges Reinigungsinstitut für die Unterhaltsreinigung unserer Büroräumlichkeiten im Kreis 5. Es geht um die üblichen Arbeiten wie Staubsaugen, Abfall leeren, Oberflächen reinigen und Sanitäranlagen.', files: [], customerInfo: { name: 'Startup Innovations GmbH', address: 'Pfingstweidstrasse 96, 8005 Zürich', email: 'office@startup-innovations.ch', phone: '044 123 99 88', mobile: null } },
    { id: 16, title: 'Kompletter Hausumzug', service: 'Umzug & Transport', customer: 'Familie Egger', location: '8400 Winterthur', date: '22. Juli 2024', status: 'Neu', price: 25.00, budget: "CHF 3'000 - 4'000", qualityScore: 98, details: [ { label: 'Von', value: 'Einfamilienhaus, 8400 Winterthur' }, { label: 'Nach', value: 'Einfamilienhaus, 8500 Frauenfeld' }, { label: 'Anzahl Zimmer', value: '6.5' }, { label: 'Stockwerk (Auszug)', value: 'EG + 1. Stock' }, { label: 'Lift (Auszug)', value: 'Nein' }, { label: 'Stockwerk (Einzug)', value: 'EG + 1. Stock' }, { label: 'Lift (Einzug)', value: 'Nein' }, { label: 'Anzahl Möbelstücke', value: 'ca. 50-60' }, { label: 'Besondere Objekte', value: 'Klavier und grosser Tresor' } ], description: 'Wir planen den Umzug unseres gesamten Haushalts von Winterthur nach Frauenfeld. Wir benötigen ein komplettes Servicepaket inklusive Ein- und Auspacken, Möbel-Demontage/Montage und Transport.', files: [], customerInfo: { name: 'Familie Egger', address: 'Musterweg 1, 8400 Winterthur', email: 'egger.family@email.ch', phone: null, mobile: '079 888 77 66' } },
    { id: 17, title: '4 Holzfenster ersetzen', service: 'Fenstermontage', customer: 'Beatrice Vogel', location: '5000 Aarau', date: '21. Juli 2024', status: 'Neu', price: 20.00, budget: "CHF 8'000", qualityScore: 85, details: [ { label: 'Anzahl', value: '4 Stück' }, { label: 'Material', value: 'Holz-Metall Fenster (3-fach Verglasung)' }, { label: 'Objekt', value: 'Alte Eigentumswohnung' }, ], description: 'Ich möchte in meiner Wohnung vier alte Holzfenster durch neue, energieeffiziente Holz-Metall-Fenster ersetzen. Bitte um eine Offerte inklusive Material, Montage und Entsorgung der alten Fenster.', files: [], customerInfo: { name: 'Beatrice Vogel', address: 'Altstadtgasse 22, 5000 Aarau', email: 'b.vogel@mail.ch', phone: '062 111 22 33', mobile: null } },
    { id: 18, title: 'Keller und Estrich räumen', service: 'Entsorgung & Räumung', customer: 'Jürg Bieri', location: '3007 Bern', date: '20. Juli 2024', status: 'Neu', price: 15.00, budget: "CHF 400", qualityScore: 55, details: [ { label: 'Objekt', value: 'Mehrfamilienhaus' }, { label: 'Räume', value: '1 Kellerabteil, 1 Estrichabteil' }, { label: 'Inhalt', value: 'Alte Möbel, Kisten, Sperrmüll' }, ], description: 'Mein Keller- und Estrichabteil müssen komplett geräumt und der Inhalt fachgerecht entsorgt werden. Es handelt sich um über die Jahre angesammelten Hausrat.', files: [], customerInfo: { name: 'Jürg Bieri', address: 'Eigerstrasse 50, 3007 Bern', email: 'juerg.bieri@gmx.ch', phone: null, mobile: '079 444 55 66' } },
    { id: 19, title: 'Badezimmer neu plattenlegen', service: 'Plattenleger', customer: 'Carla Rossi', location: '3600 Thun', date: '19. Juli 2024', status: 'Verloren / Abgelehnt', price: 20.00, budget: "CHF 5'000", qualityScore: 75, details: [ { label: 'Fläche Boden', value: 'ca. 8m²' }, { label: 'Fläche Wand', value: 'ca. 25m²' }, { label: 'Plattenformat', value: '30x60cm Feinsteinzeug' }, ], description: 'Im Rahmen meiner Badrenovation suche ich einen Plattenleger. Die alten Platten sind bereits entfernt. Es müssen Boden und Wände (bis 2m Höhe) neu verlegt werden.', files: [], customerInfo: { name: 'Carla Rossi', address: 'Seestrasse 1, 3600 Thun', email: 'c.rossi@bluewin.ch', phone: '033 999 88 77', mobile: null } },
    { id: 20, title: 'Smart Home Beratung & Installation', service: 'Elektroinstallationen', customer: 'Digital Solutions AG', location: '1003 Lausanne', date: '18. Juli 2024', status: 'Neu', price: 25.00, budget: "Offen", qualityScore: 68, details: [ { label: 'System', value: 'Systemoffen, z.B. KNX oder Loxone' }, { label: 'Umfang', value: 'Lichtsteuerung, Storen, Heizung' }, { label: 'Objekt', value: 'Büroräumlichkeiten' }, ], description: 'Wir möchten unsere neuen Büroräumlichkeiten mit einem Smart Home System ausstatten. Gesucht wird ein Spezialist für die Beratung, Planung und anschliessende Installation.', files: [], customerInfo: { name: 'Digital Solutions AG', address: 'Avenue de la Gare 10, 1003 Lausanne', email: 'info@digitalsolutions.ch', phone: '021 555 66 77', mobile: null } },
    { id: 21, title: 'Einbauschrank nach Mass', service: 'Schreiner', customer: 'Familie Gasser', location: '7000 Chur', date: '17. Juli 2024', status: 'Neu', price: 25.00, budget: "CHF 4'500", qualityScore: 89, details: [ { label: 'Masse (BxHxT)', value: 'ca. 2.5m x 2.4m x 0.6m' }, { label: 'Material', value: 'Weiss beschichtet' }, { label: 'Besonderheit', value: 'Dachschräge auf einer Seite' }, ], description: 'Für unser Schlafzimmer benötigen wir einen passgenauen Einbauschrank, der eine Dachschräge berücksichtigt. Wir wünschen uns eine einfache, moderne Ausführung in Weiss mit Kleiderstangen und Tablaren.', files: [], customerInfo: { name: 'Familie Gasser', address: 'Steinbockstrasse 40, 7000 Chur', email: 'gasser.fam@email.ch', phone: null, mobile: '079 222 33 44' } },
    { id: 22, title: 'Dachkontrolle und kleine Reparatur', service: 'Dachdecker', customer: 'Urs Ziegler', location: '8200 Schaffhausen', date: '16. Juli 2024', status: 'Neu', price: 20.00, budget: "Unbekannt", qualityScore: 72, details: [ { label: 'Dachtyp', value: 'Ziegeldach' }, { label: 'Problem', value: 'Vermutlich ein paar verschobene Ziegel, kleine Undichtigkeit' }, { label: 'Gebäude', value: 'Einfamilienhaus' }, ], description: 'Nach dem letzten Sturm habe ich einen kleinen Wasserfleck an der Decke im Dachgeschoss bemerkt. Ich vermute, einige Ziegel sind verschoben. Bitte um eine professionelle Kontrolle und Reparatur.', files: [], customerInfo: { name: 'Urs Ziegler', address: 'Rheinweg 1, 8200 Schaffhausen', email: 'u.ziegler@gmx.net', phone: '052 123 45 67', mobile: null } },
    { id: 23, title: 'Neuer Gartenzaun', service: 'Zaunbau', customer: 'Martina Frei', location: '8610 Uster', date: '15. Juli 2024', status: 'Neu', price: 15.00, budget: "CHF 3'000", qualityScore: 80, details: [ { label: 'Länge', value: 'ca. 40 Meter' }, { label: 'Höhe', value: '1.20 Meter' }, { label: 'Material', value: 'Holz oder Metall (offen für Vorschläge)' }, ], description: 'Ich möchte meinen alten Gartenzaun ersetzen. Gesamtlänge ca. 40m. Ich bin offen für Materialvorschläge, es sollte aber modern und pflegeleicht sein. Inklusive einem kleinen Gartentor.', files: [], customerInfo: { name: 'Martina Frei', address: 'Seeblickstrasse 30, 8610 Uster', email: 'martina.frei@bluewin.ch', phone: null, mobile: '079 876 54 32' } },
    { id: 24, title: 'Hauswartung für Mehrfamilienhaus gesucht', service: 'Hauswartung', customer: 'Immobilien Verwaltung AG', location: '8304 Wallisellen', date: '14. Juli 2024', status: 'Neu', price: 15.00, budget: "Monatliche Pauschale", qualityScore: 94, details: [ { label: 'Anzahl Parteien', value: '12' }, { label: 'Umfang', value: 'Treppenhausreinigung, Umgebungspflege, technischer Dienst' }, { label: 'Beginn', value: 'Nach Vereinbarung' }, ], description: 'Wir suchen einen zuverlässigen Hauswart im Mandat für unsere Liegenschaft in Wallisellen. Das Pflichtenheft umfasst die wöchentliche Reinigung, die Pflege des Umschwungs sowie kleine Reparaturen und die Koordination von Handwerkern.', files: [], customerInfo: { name: 'Immobilien Verwaltung AG', address: 'Bahnhofstrasse 1, 8304 Wallisellen', email: 'info@immo-vw.ch', phone: '044 555 66 77', mobile: null } },
    { id: 25, title: 'Fassaden-Isolation (Aussendämmung)', service: 'Fassadenbau', customer: 'Reto Feller', location: '8404 Winterthur', date: '13. Juli 2024', status: 'Neu', price: 50.00, budget: "CHF 30'000+", qualityScore: 96, details: [ { label: 'Gebäudetyp', value: 'Einfamilienhaus, Baujahr 1980' }, { label: 'Fassadenfläche', value: 'ca. 180m²' }, { label: 'Wunsch', value: 'Komplettangebot für Dämmung und neuen Verputz' }, ], description: 'Wir möchten die Fassade unseres Hauses energetisch sanieren und neu isolieren lassen. Wir bitten um eine Offerte für eine Kompaktfassade (z.B. 16cm Dämmung) inklusive neuem Aussenputz und Anstrich.', files: [], customerInfo: { name: 'Reto Feller', address: 'Sonnenhang 2, 8404 Winterthur', email: 'reto.feller@mail.com', phone: '052 333 44 55', mobile: null } }
];


interface AppContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    isQuoteModalOpen: boolean;
    openQuoteModal: (initialData?: object) => void;
    closeQuoteModal: () => void;
    quoteInitialData: object;
    purchasedLeadIds: number[];
    purchaseLead: (id: number) => void;
    leadPurchaseCounts: LeadPurchaseInfo;
    requests: Request[];
    updateRequestStatus: (requestId: number, newStatus: Request['status']) => void;
    quickViewLeadId: number | null;
    isQuickViewOpen: boolean;
    openQuickView: (leadId: number) => void;
    closeQuickView: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('de');
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [quoteInitialData, setQuoteInitialData] = useState({});
    const [requests, setRequests] = useState<Request[]>(allRequests);
    const [purchasedLeadIds, setPurchasedLeadIds] = useState<number[]>([1, 2, 7, 8, 9, 3, 5]);
    
    const [leadPurchaseCounts, setLeadPurchaseCounts] = useState<LeadPurchaseInfo>({
        1: 2, 2: 4, 3: 5, 4: 1, 5: 3, 6: 4, 7: 2, 8: 5, 9: 1, 10: 0,
        11: 2, 12: 0, 13: 1, 14: 4, 15: 0, 16: 2, 17: 1, 18: 3, 19: 5, 20: 0,
        21: 2, 22: 1, 23: 0, 24: 0, 25: 1
    });

    const [quickViewLeadId, setQuickViewLeadId] = useState<number | null>(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const openQuickView = (leadId: number) => {
        setQuickViewLeadId(leadId);
        setIsQuickViewOpen(true);
    };

    const closeQuickView = () => {
        setIsQuickViewOpen(false);
        setQuickViewLeadId(null);
    };

    const openQuoteModal = (initialData = {}) => {
        setQuoteInitialData(initialData);
        setIsQuoteModalOpen(true);
    };

    const closeQuoteModal = () => {
        setIsQuoteModalOpen(false);
    };

    const purchaseLead = (id: number) => {
        if (purchasedLeadIds.includes(id) || (leadPurchaseCounts[id] || 0) >= 5) {
            return;
        }
        setLeadPurchaseCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
        setPurchasedLeadIds(prev => [...prev, id]);
        // Also update the status in the main request list to 'Neu' for the Kanban board
        updateRequestStatus(id, 'Neu');
    };

    const updateRequestStatus = (requestId: number, newStatus: Request['status']) => {
        setRequests(prev => 
            prev.map(req => 
                req.id === requestId ? { ...req, status: newStatus } : req
            )
        );
    };

    React.useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const value = {
        language,
        setLanguage,
        isQuoteModalOpen,
        openQuoteModal,
        closeQuoteModal,
        quoteInitialData,
        purchasedLeadIds,
        purchaseLead,
        leadPurchaseCounts,
        requests,
        updateRequestStatus,
        quickViewLeadId,
        isQuickViewOpen,
        openQuickView,
        closeQuickView,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
