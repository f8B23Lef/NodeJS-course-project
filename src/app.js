import express from 'express';
import router from './routers/index.js';

const app = express();

app.listen(3000);
app.use(express.json());
app.use('/api', router);
