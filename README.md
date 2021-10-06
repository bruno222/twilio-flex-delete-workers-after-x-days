## What this little script is about

You can use this script to delete former workers from Flex.

The way to trigger this script varies:

a) You could spin up a Kubernetes Pod to run every day at 3 AM and execute this script

b) Or you can host this function in Twilio Serverless and create a Flex plugin to call this function once Flex is loaded.

- If you choose this option, just make sure you are only executing this function once a day to not overload our lovely TaskRouter with useless CPU load.

- For that, one idea is that you could use Twilio Sync to create a dummy document using YYYY-MM-DD as UniqueName. So if the Sync document is created: You run the function, else: it means someone else already called this function and therefore you can abort.

## How to use it

1. clone this repo;
2. `npm install`
3. rename `.env-example` to `.env` and put your secrets there.
4. create some dummy workers to be deleted with `npm run create`
5. now delete these workers doing `npm run delete`
6. you will notice no workers were deleted, this is because:
   - you just created the workers and this script is only deleting workers older than 30 days. Open `delete-workers.ts` and change `DELETE_OLDER_THAN_X_DAYS` to `0`.
   - once you are fine with this script and trust it will work in production, you can remove the line `if (friendlyName.includes('test'))`... I added this safety to make sure you won't delete real workers by mistake while working with this script.
