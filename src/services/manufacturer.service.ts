import { loadCSV } from '../utils/csv.loader';

interface Match {
    m_source_id: string;
    c_source_id: string;
};

interface RelatedManufacturer {
    mainManufacturer: string;
    competitorManufacturer: string;
};

export const createManufacturerMapping = async (): Promise<RelatedManufacturer[]> => {
    const mainProducts = await loadCSV('../data/bnu-lt-data.csv');
    const competitorProducts = await loadCSV('../data/cma-lt-data.csv');
    const productMatches = await loadCSV('../data/matches.csv') as Match[];

    const relatedManufacturers: RelatedManufacturer[] = [];
    productMatches.forEach((match) => {
        const mainProduct = mainProducts.find(p => p.source_id === match.m_source_id);
        const competitorProduct = competitorProducts.find(p => p.source_id === match.c_source_id);

        if (mainProduct && competitorProduct) {
            
            relatedManufacturers.push({
                mainManufacturer: mainProduct.manufacturer,
                competitorManufacturer: competitorProduct.manufacturer,
            });
        }
    });

    return relatedManufacturers;
};

export const assignManufacturer = (productTitle: string, relatedManufacturers: RelatedManufacturer[]): string | null => {
    for (const {mainManufacturer, competitorManufacturer} of relatedManufacturers) {
        if (productTitle.includes(mainManufacturer) || productTitle.includes(competitorManufacturer)) {
            return mainManufacturer;
        }
    }
    return null;
};

// Validate manufacturer mapping
export const validateManufacturerMapping = (relatedManufacturers: RelatedManufacturer[]): string[] => {
    const suspiciousMappings: string[] = [];
    relatedManufacturers.forEach(({mainManufacturer, competitorManufacturer}) => {
        if (mainManufacturer.length <= 2 || competitorManufacturer.length <= 2) {
            suspiciousMappings.push(`Suspicious manufacturer mapping: ${mainManufacturer} - ${competitorManufacturer}`);
        }
    });
    return suspiciousMappings;
};
