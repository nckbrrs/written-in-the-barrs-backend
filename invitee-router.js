import { Router } from 'express';
import inviteeRepository from './invitee-repository.js';
const inviteeRouter = Router();

// allow CORS for preflight requests to this route
inviteeRouter.options('/', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
});

// create
inviteeRouter.post('/', async (req, res) => {
    const invitee = inviteeRepository.createEntity(req.body);
    const id = await inviteeRepository.save(invitee);
    res.setHeader("Access-Control-Allow-Origin", "*");
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

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(firstAndLastMatches.length > 0 ? firstAndLastMatches : justLastMatches);
});

// allow CORS for preflight requests to this route
inviteeRouter.options('/createIndex', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

// create index
inviteeRouter.get('/createIndex', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        await inviteeRepository.createIndex();
        res.json({ result: 'created new invitee index!' });
    } catch (err) {
        res.json({ result: `ERROR! ${err.message}`})
    }
});

export default inviteeRouter;
