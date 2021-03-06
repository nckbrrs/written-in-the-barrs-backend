import express from 'express';
import inviteeRouter from './invitee-router.js';
import cors from 'cors';

let app = new express();
app.use(express.json());
app.use('/invitees', inviteeRouter);
app.use(cors({ origin: '*' }));
app.listen(process.env.PORT || 5001);
