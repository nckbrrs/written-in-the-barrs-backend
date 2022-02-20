import express from 'express';
import inviteeRouter from './invitee-router.js';

let app = new express();
app.use(express.json());
app.use('/invitees', inviteeRouter);
app.listen(8080);
