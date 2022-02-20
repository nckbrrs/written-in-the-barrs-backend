import { Router } from 'express';
import inviteeRepository from './invitee-repository.js';
const inviteeRouter = Router();

inviteeRouter.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const invitee = inviteeRepository.createEntity(req.body);
        const id = await inviteeRepository.save(invitee);
        res.json({ entityId: id });
    } catch (err) {
        res.json({ result: 'ERROR! ' + err.message});
    }
});

inviteeRouter.get('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const firstName = req.query.first;
        const lastName = req.query.last;

        const firstAndLastMatches = await inviteeRepository.search()
            .where('firstName').equals(firstName)
            .and('lastName').equals(lastName)
            .return.all();

        const justLastMatches = await inviteeRepository.search()
            .where('lastName').equals(lastName)
            .return.all();

        res.json(firstAndLastMatches.length > 0 ? firstAndLastMatches : justLastMatches);
    } catch (err) {
        res.json({ result: 'ERROR! ' + err.message});
    }
});

inviteeRouter.get('/createIndex', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        await inviteeRepository.createIndex();
        res.json({ result: 'created new invitee index!' });
    } catch (err) {
        res.json({ result: 'ERROR! ' + err.message});
    }
});


inviteeRouter.options('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.end();
});

inviteeRouter.options('/createIndex', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.end();
});

export default inviteeRouter;
