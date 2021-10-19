require('dotenv').config();
import { Twilio } from 'twilio';

//
// Create dummy workers to test this script
//
const run = async () => {
  const client = new Twilio(process.env.TWILIO_API_KEY_SID!, process.env.TWILIO_API_KEY_SECRET!, { accountSid: process.env.TWILIO_ACCOUNT_SID! });
  const workspace = client.taskrouter.workspaces(process.env!.TWILIO_TASKROUTER_WORKSPACE_SID!);

  for (let i = 0; i < 5; i++) {
    const a = await workspace.workers.create({ friendlyName: `test${i}` });
    console.log('created', a);
  }
};

run();
