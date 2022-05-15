import { Entity, Schema, Client, Repository } from 'redis-om';
import dotenv from 'dotenv';
dotenv.config();

class Invitee extends Entity {};

let inviteeSchema = new Schema(Invitee, {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    emailAddress: { type: 'string' },
    phoneNumber: { type: 'string' },
    address1: { type: 'string' },
    address2: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    zipCode: { type: 'string' },
    country: { type: 'string' },
    hasPlusOne: { type: 'boolean' },
    plusOneFirstName: { type: 'string' },
    plusOneLastName: { type: 'string' },
    isInvitedToRehearsalDinner: { type: 'boolean' },
    hasRsvpd: { type: 'boolean' },
    isAttendingWedding: { type: 'boolean' },
    isAttendingRehearsalDinner: { type: 'boolean' },
    isBringingPlusOneToWedding: { type: 'boolean' },
    isBringingPlusOneToRehearsalDinner: { type: 'boolean' },
    dietaryRestrictions: { type: 'string' },
}, {
    dataStructure: 'JSON',
})

let client = new Client();
await client.open(process.env.REDIS_URL);
const inviteeRepository = new Repository(inviteeSchema, client);

export default inviteeRepository;
