import express from 'express';
import {getRelatedManufacturers, assignManufacturerToProduct} from './controllers/data.controller';

const app = express();
app.use(express.json());

app.get('/related/manufacturers', getRelatedManufacturers);
app.post('/assign/manufacturer', assignManufacturerToProduct);
// app.get('/validate/mappings', validateMappings);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
