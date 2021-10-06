require('dotenv').config();
import { Twilio } from 'twilio';

//
// Delete old workers
//
const run = async () => {
  const client = new Twilio(process.env!.TWILIO_ACCOUNT_SID!, process.env!.TWILIO_AUTH_TOKEN!);
  const workspace = client.taskrouter.workspaces(process.env!.TWILIO_TASKROUTER_WORKSPACE_SID!);

  for (let i = 0; i < 100; i++) {
    const a = await workspace.workers.create({ friendlyName: `test${i}` });
    console.log('created', a);
  }
};

run();
