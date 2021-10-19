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
  const workersToDelete = workers.filter(({ dateStatusChanged, friendlyName }) => {
    const lastTime = new Date(dateStatusChanged).getTime();
    const daysAgo = (now - lastTime) / (24 * 60 * 60 * 1000);

    // TODO BEGIN: only remove this IF below once you are sure this code are not going to delete your real workers.
    //             so please, check once more if DELETE_OLDER_THAN_X_DAYS is correct!
    if (!friendlyName.includes('test')) {
      return false;
    }
    // TODO END

    return daysAgo >= DELETE_OLDER_THAN_X_DAYS;
  });

  console.log('workers to delete: ', workersToDelete.length);

  // Delete
  for (let { sid, friendlyName } of workersToDelete) {
    try {
      await workspace.workers(sid).remove();
      console.log(`worker has been deleted`, sid, friendlyName);
    } catch (e) {
      console.log(`failed to delete worker`, sid, friendlyName, e);
    }
  }

  console.log('bye bye!');
};

run();
