/* global UrlFetchApp gftdConfigs */
'use strict';

const googleFormsToDiscord = (form) => {
  const { webhookURL, title, color, timeZone, skipQuestions } = gftdConfigs;

  const createFields = (responses) => {
    return responses.map((response) => {
      const question = response.getItem().getTitle();

      if (skipQuestions.includes(question)) {
        return;
      }

      const answer = response.getResponse() || '`<Empty>`';

      if (typeof answer !== 'string') {
        return;
      }

      const field = {
        name: question,
        value: answer
      };

      return field;
    }).filter((field) => Boolean(field));
  };

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone,
      timeZoneName: 'short'
    }).format(timestamp);
  };

  const createPayload = () => {
    const embedTitle = title || form.source.getTitle();

    const responses = form.response.getItemResponses();
    const fields = createFields(responses);

    const timestamp = form.response.getTimestamp();
    const formattedDate = formatTimestamp(timestamp);

    const payload = JSON.stringify({
      embeds: [{
        type: 'rich',
        color,
        title: embedTitle,
        fields,
        footer: {
          text: formattedDate
        }
      }]
    });

    return payload;
  };

  const sendToDiscord = () => {
    const params = {
      method: 'post',
      contentType: 'application/json',
      payload: createPayload()
    };

    const response = UrlFetchApp.fetch(webhookURL, params);

    return response;
  };

  return sendToDiscord();
};
