/* global UrlFetchApp */
'use strict';
/* DO NOT EDIT ABOVE THIS LINE */
const webhook = ''; // Paste your webhook URL within the simple quotes.
const title = ''; // Specify the title of the embed within the simple quotes. If not provided, it will default to the form's title.
const color = 7506394; // Color of the embed in decimal.
/* DO NOT EDIT UNDER THIS LINE */

function onFormSubmit (form) {
  const responses = form.response.getItemResponses();
  const fields = responses.map(response => {
    const field = {
      name: response.getItem().getTitle(),
      value: response.getResponse() || '`<Empty>`'
    };

    return field;
  });

  const payload = {
    embeds: [{
      type: 'rich',
      color,
      title: title || form.source.getTitle(),
      fields
    }]
  };

  UrlFetchApp.fetch(webhook, {
    method: 'post',
    payload: JSON.stringify(payload),
    contentType: 'application/json'
  });
}
