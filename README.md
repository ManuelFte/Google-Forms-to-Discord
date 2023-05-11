# Google Forms to Discord

Automatically forwards Google Forms responses to a Discord channel via a webhook.

# Instructions

## Create a webhook

1. On Discord, go to the desired channel and click `Edit Channel` (the gear icon).
2. Go to `Webhooks` -> `Create Webhook`, and set up your webhook as you wish.
2. Copy the `WEBHOOK URL` and save it somewhere.

## Install the script

1. On your Google Form, click the icon of the 3 dots on the top right, and choose `Script Editor`.
2. Replace the default content with the contents of [index.js](https://raw.githubusercontent.com/ManuelFte/Google-Forms-to-Discord/master/index.js).
3. Click the "+" button to add a new file and replace the contents with the contents of [config.default.js](https://raw.githubusercontent.com/ManuelFte/Google-Forms-to-Discord/master/config.default.js).
4. Fill the variables with the requested information.
5. Click `Save`.

## Set up the trigger

1. Hover the icons on the left sidebar and click `Triggers`.
2. On the next window, click `Add Trigger` (the blue button on the bottom right).
3. Set up the trigger as shown below and save:

![image](https://github.com/ManuelFte/Google-Forms-to-Discord/assets/68722732/6455de65-9b29-4ba7-8ba7-3a0b767c0673)

### Note

Each Discord embed field value can only contain up to 1024 characters, and each embed as a whole can only contain up to 6000 characters. If these numbers are exceeded, the message will fail to be posted.

The script does not incorporate any character limit feature because this limit can be set directly from Google Forms, which is the ideal way (icon of the 3 dots under each response -> `Response validation` -> `Maximum character count`).