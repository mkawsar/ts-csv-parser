import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

interface Product {
    source: string;
    title: string;
    manufacturer: string;
    source_id: string;
    m_source: string;
    m_source_id: string;
    c_source: string;
    c_source_id: string;
}

export const loadCSV = (filePath: string): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
        const results: Product[] = [];
        fs.createReadStream(path.resolve(__dirname, filePath))
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};
