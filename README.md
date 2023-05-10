# Google Forms to Discord

Automatically forwards Google Forms responses to a Discord channel via a webhook.

# Instructions

## Create a webhook

1. On Discord, go to the desired channel and click `Edit Channel` (the gear icon).
2. Go to `Webhooks` -> `Create Webhook`, and set up your webhook as you wish.
2. Copy the `WEBHOOK URL` and save it somewhere.

## Install the script

1. On your Google Form, click the icon of the 3 dots on the top right, and choose `Script Editor`.
2. Replace the default content with the contents of [googleFormsToDiscord.js](https://raw.githubusercontent.com/ManuelFte/Google-Forms-to-Discord/master/googleFormToDiscord.js).
3. Fill the variables at the top of the script with the requested information.
4. Click `Save`.

## Set up the trigger

1. On the menu at the top, click `Edit` -> `Current project's triggers`.
2. On the next window, click `Add Trigger` ( the blue button on the bottom right).
3. Set up the trigger as shown below and save:

![image](https://user-images.githubusercontent.com/896973/87218403-fe84c680-c317-11ea-8ab1-1a8e8dbdf324.png)

### Note

Each Discord embed field value can only contain up to 1024 characters, and each embed as a whole can only contain up to 6000 characters. If these numbers are exceeded, the message will fail to be posted. Take this into account and limit the number of characters your form accepts to avoid exceeding these restrictions (icon of the 3 dots under each response -> `Response validation` -> `Maximum character count`).