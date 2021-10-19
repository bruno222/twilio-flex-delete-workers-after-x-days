## What this little script is about

You can use this script to delete former workers from Flex.

This script will be executed nightly via Github Actions. More details [here](https://github.com/bruno222/twilio-flex-delete-workers-after-x-days/actions/workflows/npm-run-delete.yml).

## How to use it

1. clone this repo;
2. `npm install`
3. rename `.env-example` to `.env` and put your secrets there.
4. create some dummy workers to be deleted with `npm run create`
5. now delete these workers doing `npm run delete`
6. you will notice no workers were deleted, this is because:
   - you just created the workers and this script is only deleting workers older than 30 days. Open `delete-workers.ts` and change `DELETE_OLDER_THAN_X_DAYS` to `0`.
   - once you are fine with this script and trust it will work in production, you can remove the block `if (!friendlyName.includes('test'))`... I added this safety to make sure you won't delete real workers by mistake while working with this script.
