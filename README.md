# Google Forms to Discord

Automatically forwards Google Forms responses to a Discord channel via a webhook.

## Features

- Works with the Google Forms "On form submit" trigger
- Maps responses into Discord embed fields
- Handles multiple answer types:
  - Strings and numbers
  - Checkboxes (arrays are joined with a newline by default)
  - Dates (formatted using your locale and timezone)
- Adds both a human-readable footer timestamp and a proper embed timestamp
- Trims field names/values to Discord limits by default (configurable)
- Optionally skip specific questions
- Optional webhook username and avatar

## Installation

1. On your Google Form, click the 3 dots in the top-right and choose "Script editor".
2. Replace the default file content with the contents of `index.js` from this repository.
3. Click the "+" button to add a new file and paste the contents of `config.default.js`.
4. Rename it to `config.js` and fill out the configuration values.
5. Click Save.

## Configure the trigger

1. In the Apps Script editor, open the left sidebar and click Triggers.
2. Click Add Trigger.
3. Choose the function `googleFormsToDiscord`, Select event source: From form, Select event type: On form submit.
4. Save and authorize if prompted.

## Configuration

The `config.js` file should export a `gftdConfig` object. Available options:

- webhookUrl: string (required). Your Discord webhook URL.
- title: string. Custom embed title. Defaults to the form title.
- color: number. Embed color in decimal (e.g., 7506394).
- timeZone: string. IANA timezone (e.g., "America/Chicago").
- locale: string. Locale used for date formatting (e.g., "en-US").
- skipQuestions: string[]. Exact question titles to skip.
- username: string. Optional webhook username override.
- avatarUrl: string. Optional webhook avatar URL.
- joinWith: string. Separator for multi-select answers (default: "\n").
- useEmbedTimestamp: boolean. Adds ISO timestamp to the embed (default: true).
- includeFooterTimestamp: boolean. Adds human-readable date to the footer (default: true).
- trimValues: boolean. If true, trims to Discord limits (default: true).
- maxFieldNameLength: number. Max characters for field names (default: 256).
- maxFieldValueLength: number. Max characters for field values (default: 1024).

## Notes

- Discord embed limits: field name ≤ 256 chars, field value ≤ 1024 chars, total embed ≤ 6000 chars. This script trims field names/values to their per-field limits by default. You can disable trimming by setting `trimValues: false`.
- If a response is empty, the script uses ``<Empty>`` as the value.
- Checkbox responses are joined by a newline. You can change this with `joinWith`.

## Privacy and permissions

This script posts responses to Discord via UrlFetchApp and requires permission to run on form submit. Ensure your webhook URL is kept private.
