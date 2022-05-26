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


inviteeRouter.patch('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const invitee = await inviteeRepository.fetch(req.body.entityId);
        invitee.isAttendingWedding = req.body.isAttendingWedding;
        invitee.isAttendingRehearsalDinner = req.body.isAttendingRehearsalDinner;
        invitee.isBringingPlusOneToWedding = req.body.isBringingPlusOneToWedding;
        invitee.isBringingPlusOneToRehearsalDinner = req.body.isBringingPlusOneToRehearsalDinner;
        invitee.dietaryRestrictions = req.body.dietaryRestrictions;
        invitee.hasRsvpd = req.body.hasRsvpd;
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

        const plusOneFirstAndLastMatches = await inviteeRepository.search()
            .where('plusOneFirstName').equals(firstName)
            .and('plusOneLastName').equals(lastName)
            .return.all();

        const plusOneJustLastMatches = await inviteeRepository.search()
            .where('plusOneLastName').equals(lastName)
            .return.all();

        res.json(firstAndLastMatches.length > 0 ? firstAndLastMatches : 
            plusOneFirstAndLastMatches.length > 0 ? plusOneFirstAndLastMatches :
            justLastMatches.length > 0 ? justLastMatches : plusOneJustLastMatches);

    } catch (err) {
        res.json({ result: 'ERROR! ' + err.message});
    }
});

inviteeRouter.get('/all', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const allInvitees = await inviteeRepository.search()
        .return.all();

    res.json(allInvitees);
})

inviteeRouter.get('/rsvps', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const hasRsvpd = await inviteeRepository.search()
        .where('hasRsvpd').equals(true)
        .return.all();

    res.json({count: hasRsvpd.length, data: hasRsvpd});
})

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

inviteeRouter.options('/all', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.end();
});

inviteeRouter.options('/rsvps', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.end();
});

export default inviteeRouter;
