import {Request, Response} from 'express';
import {
    createManufacturerMapping,
    assignManufacturer,
    validateManufacturerMapping
} from '../services/manufacturer.service';

export const getRelatedManufacturers = async (req: Request, res: Response): Promise<void> => {
    const relatedManufacturers = await createManufacturerMapping();
    res.json(relatedManufacturers);
};

export const assignManufacturerToProduct = async (req: Request, res: Response): Promise<any> => {
    const {title} = req.body;
    const relatedManufacturers = await createManufacturerMapping();
    res.json({
        'data': relatedManufacturers
    })
    // const assignedManufacturer = assignManufacturer(title, relatedManufacturers);
    // res.json({manufacturer: assignedManufacturer});
};

// export const validateMappings = async (req: Request, res: Response): Promise<void> => {
//     const relatedManufacturers = await createManufacturerMapping();
//     const suspiciousMappings = validateManufacturerMapping(relatedManufacturers);
//     res.json(suspiciousMappings);
// };
