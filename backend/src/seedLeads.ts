import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Lead from './models/Lead';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fertigo';

const mockLeads = [
    {
        title: 'Malerarbeiten - 3-Zimmer-Wohnung',
        service: 'Malerarbeiten',
        customerName: 'Anna Meier',
        location: '8004 Zürich',
        status: 'Neu',
        price: 30.00,
        budget: "CHF 1'500 - 2'000",
        qualityScore: 85,
        description: "Guten Tag, ich suche einen Maler für meine 3-Zimmer-Wohnung in Zürich Kreis 4. Die Wände und Decken sollen neu in weiss gestrichen werden. Es sind ein paar kleine Dübellöcher und feine Risse vorhanden, die vor dem Streichen fachmännisch verspachtelt werden sollten. Die Wohnung ist unmöbliert. Bitte um eine Offerte.",
        details: [
            { label: 'Objekttyp', value: 'Wohnung' },
            { label: 'Anzahl Zimmer', value: '3' },
            { label: 'Fläche', value: 'ca. 85m²' },
            { label: 'Besichtigung', value: 'Ja, nach Absprache' },
            { label: 'Materialbeschaffung', value: 'Vom Anbieter' }
        ],
        customerInfo: {
            name: 'Anna Meier',
            address: 'Langstrasse 100, 8004 Zürich',
            email: 'anna.meier@example.com',
            phone: '044 111 22 33',
            mobile: '079 111 22 33',
        },
        purchasedBy: []
    },
    {
        title: 'Gartenpflege für Einfamilienhaus',
        service: 'Gartenpflege',
        customerName: 'Peter Schmidt',
        location: '6000 Luzern',
        status: 'Neu',
        price: 30.00,
        budget: "CHF 500 - 800",
        qualityScore: 70,
        description: "Wir benötigen einen Gärtner für unsere Liegenschaft in Luzern. Die Hecke (ca. 20m lang) muss geschnitten werden und der Rasen gemäht. Zudem sollte das Unkraut in den Beeten entfernt werden.",
        details: [
            { label: 'Objekttyp', value: 'Einfamilienhaus' },
            { label: 'Gartenfläche', value: 'ca. 200m²' },
            { label: 'Häufigkeit', value: 'Einmalig' }
        ],
        customerInfo: {
            name: 'Peter Schmidt',
            address: 'Bergstrasse 5, 6000 Luzern',
            email: 'p.schmidt@example.com',
            phone: '',
            mobile: '078 222 33 44',
        },
        purchasedBy: []
    },
    {
        title: 'Umzugsreinigung mit Abnahmegarantie',
        service: 'Reinigung',
        customerName: 'Sandra Keller',
        location: '8050 Oerlikon',
        status: 'Neu',
        price: 30.00,
        budget: "CHF 700",
        qualityScore: 95,
        description: 'Komplette Endreinigung für eine 4.5 Zimmer Wohnung mit Abnahmegarantie.',
        details: [
            { label: 'Objekttyp', value: 'Wohnung' },
            { label: 'Zimmer', value: '4.5' }
        ],
        customerInfo: {
            name: 'Sandra Keller',
            address: 'Musterstrasse 1, 8050 Oerlikon',
            email: 's.keller@example.com',
            phone: '077 345 67 89'
        },
        purchasedBy: []
    },
    {
        title: 'Parkettboden schleifen und versiegeln',
        service: 'Bodenleger',
        customerName: 'Markus Weber',
        location: '1201 Genf',
        status: 'Neu',
        price: 35.00,
        budget: "Offen",
        qualityScore: 60,
        description: 'Ca. 50m2 Parkettboden in Wohnzimmer schleifen und neu versiegeln (matt).',
        details: [],
        customerInfo: {
            name: 'Markus Weber',
            address: 'Rue de la Paix 10, 1201 Genf',
            email: 'm.weber@example.com',
            phone: '076 456 78 90'
        },
        purchasedBy: []
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');

        // Optional: clear existing leads
        // await Lead.deleteMany({});
        // console.log('Cleared existing leads');

        for (const leadData of mockLeads) {
            const exists = await Lead.findOne({ title: leadData.title, customerName: leadData.customerName });
            if (!exists) {
                await Lead.create(leadData);
                console.log(`Created lead: ${leadData.title}`);
            }
        }

        await mongoose.disconnect();
        console.log('Done');
        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seed();
