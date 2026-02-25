export const getLeadPrice = (formData: any): number => {
    const service = formData.service;
    
    // Determine size based on available data
    let size = 'mittel'; 
    if (formData.numberOfRooms) {
        const rooms = parseFloat(formData.numberOfRooms);
        if (rooms <= 2) size = 'klein';
        else if (rooms <= 4) size = 'mittel';
        else if (rooms <= 5.5) size = 'gross';
        else size = 'premium';
    } else {
        // Simple heuristic based on project description length as fallback for other services?
        // Let's stick to 'mittel' as default, but if someone says "Notfall", make it premium
        if (formData.projectDescription?.toLowerCase().includes('notfall')) {
            size = 'premium';
        }
    }

    const pricingTable: Record<string, Record<string, number>> = {
        'Privatumzug': { klein: 25, mittel: 35, gross: 45, premium: 60 },
        'Umzug': { klein: 25, mittel: 35, gross: 45, premium: 60 },
        'Firmenumzug': { klein: 40, mittel: 50, gross: 70, premium: 90 },
        'Möbeltransport': { klein: 10, mittel: 20, gross: 30, premium: 30 },
        'Klaviertransport': { klein: 30, mittel: 50, gross: 70, premium: 90 },
        'Umzugsreinigung': { klein: 12, mittel: 20, gross: 30, premium: 35 },
        'Reinigung': { klein: 12, mittel: 20, gross: 30, premium: 35 },
        'Malerarbeiten': { klein: 15, mittel: 30, gross: 60, premium: 80 },
        'Sanitär': { klein: 25, mittel: 45, gross: 70, premium: 100 },
        'Elektriker': { klein: 25, mittel: 45, gross: 70, premium: 100 },
        'Heizungsinstallation': { klein: 40, mittel: 60, gross: 80, premium: 100 },
        'Klimaanlagen-Service': { klein: 40, mittel: 60, gross: 80, premium: 100 },
        'Badezimmerumbau': { klein: 50, mittel: 80, gross: 120, premium: 140 },
        'Küchenbau': { klein: 60, mittel: 100, gross: 150, premium: 180 },
        'Bodenleger': { klein: 15, mittel: 35, gross: 60, premium: 80 },
        'Plattenleger': { klein: 15, mittel: 35, gross: 60, premium: 80 },
        'Schreiner': { klein: 15, mittel: 40, gross: 70, premium: 90 },
        'Zimmermannarbeiten': { klein: 15, mittel: 40, gross: 70, premium: 90 },
        'Dachdecker': { klein: 40, mittel: 70, gross: 100, premium: 120 },
        'Dachreinigung': { klein: 40, mittel: 70, gross: 100, premium: 120 },
        'Fassadenbau': { klein: 50, mittel: 80, gross: 120, premium: 160 },
        'Fensterreinigung': { klein: 12, mittel: 25, gross: 40, premium: 50 },
        'Fenstermontage': { klein: 12, mittel: 25, gross: 40, premium: 50 },
        'Gartenpflege': { klein: 10, mittel: 25, gross: 50, premium: 60 },
        'Gartenbau': { klein: 10, mittel: 25, gross: 50, premium: 60 },
        'Baureinigung': { klein: 15, mittel: 35, gross: 70, premium: 80 },
        'Gebäudereinigung': { klein: 15, mittel: 35, gross: 70, premium: 80 },
        'Entsorgung & Räumung': { klein: 12, mittel: 30, gross: 50, premium: 60 },
    };

    const servicePricing = pricingTable[service] || { klein: 20, mittel: 35, gross: 50, premium: 80 };
    return servicePricing[size] || servicePricing['mittel'];
};
