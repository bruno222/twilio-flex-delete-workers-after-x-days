require('dotenv').config();
import { Twilio } from 'twilio';

//
// Delete old workers
//
const run = async () => {
  const client = new Twilio(process.env!.TWILIO_ACCOUNT_SID!, process.env!.TWILIO_AUTH_TOKEN!);
  const workspace = client.taskrouter.workspaces(process.env!.TWILIO_TASKROUTER_WORKSPACE_SID!);
  const DELETE_OLDER_THAN_X_DAYS = 0;

  const now = new Date().getTime();

  // Fetch all workers
  const workers = await workspace.workers.list({ available: 'false', pageSize: 500 });
  console.log('workers total: ', workers.length);

  // Filter the old ones
  const workersToDelete = workers.filter(({ dateStatusChanged }) => {
    const lastTime = new Date(dateStatusChanged).getTime();
    const daysAgo = (now - lastTime) / (24 * 60 * 60 * 1000);
    return daysAgo >= DELETE_OLDER_THAN_X_DAYS;
  });

  console.log('workers to delete: ', workersToDelete.length);

  // Delete
  workersToDelete.map(async ({ sid, friendlyName }) => {
    try {
      // TODO: only remove this line below once you are sure this code are not going to delete your real workers.
      if (friendlyName.includes('test')) {
        await workspace.workers(sid).remove();
        console.log(`worker has been deleted`, sid, friendlyName);
      }
    } catch (e) {
      console.log(`failed to delete worker`, sid, friendlyName, e);
    }
  });
};

run();
