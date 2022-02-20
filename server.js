import express from 'express';
import inviteeRouter from './invitee-router.js';
const cors = require('cors');

let app = new express();
app.use(express.json());
app.use('/invitees', inviteeRouter);
app.use(cors({ origin: '*' }));
app.listen(process.env.PORT || 5000);
