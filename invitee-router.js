import { Router } from 'express';
import inviteeRepository from './invitee-repository.js';
const inviteeRouter = Router();

// create
inviteeRouter.post('/', async (req, res) => {
    const invitee = inviteeRepository.createEntity(req.body);
    const id = await inviteeRepository.save(invitee);
    res.json({ entityId: id });
});

// search
inviteeRouter.get('/', async (req, res) => {
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
});

// create index
inviteeRouter.get('/createIndex', async (req, res) => {
    try {
        await inviteeRepository.createIndex();
        res.json({ result: 'created new invitee index!' });
    } catch (err) {
        res.json({ result: `ERROR! ${err.message}`})
    }
});

export default inviteeRouter;
