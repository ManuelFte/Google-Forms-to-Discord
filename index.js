'use strict';
/* global UrlFetchApp Logger gftdConfig */

function googleFormsToDiscord(form) {
  const {
    webhookUrl,
    title,
    color = 7506394,
    timeZone = 'America/Chicago',
    locale = 'en-US',
    skipQuestions = [],
    username,
    avatarUrl,
    useEmbedTimestamp = true,
    includeFooterTimestamp = true,
    joinWith = '\n',
    trimValues = true,
    maxFieldNameLength = 256,
    maxFieldValueLength = 1024,
    maxFields = 25
  } = gftdConfig || {};

  const truncate = (value, max) => {
    let str = typeof value === 'string' ? value : String(value);
    if (!trimValues) return str;
    if (str.length <= max) return str;
    return str.slice(0, Math.max(0, max - 3)) + '...';
  };

  const formatDate = (date) => {
    try {
      return new Intl.DateTimeFormat(locale, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone,
        timeZoneName: 'short'
      }).format(date);
    } catch (err) {
      return String(date);
    }
  };

  const normalizeAnswer = (answer) => {
    if (answer == null) return '`<Empty>`';
    if (Array.isArray(answer)) {
      if (answer.length === 0) return '`<Empty>`';
      return answer.map((v) => (typeof v === 'string' ? v : String(v))).join(joinWith);
    }
    if (answer instanceof Date) {
      return formatDate(answer);
    }
    if (typeof answer === 'object') {
      try {
        return JSON.stringify(answer);
      } catch (e) {
        return String(answer);
      }
    }
    if (typeof answer === 'string') {
      return answer || '`<Empty>`';
    }
    return String(answer);
  };

  const createFields = (responses) => {
    return responses
      .map((response) => {
        const question = response.getItem().getTitle();
        if (skipQuestions && skipQuestions.indexOf(question) !== -1) return;

        const raw = response.getResponse();
        const normalized = normalizeAnswer(raw);

        const field = {
          name: truncate(question, maxFieldNameLength),
          value: truncate(normalized, maxFieldValueLength)
        };

        return field;
      })
      .filter(Boolean);
  };

  const createPayloadObject = () => {
    const embedTitle = title || form.source.getTitle();
    const responses = form.response.getItemResponses();
    const fields = createFields(responses).slice(0, maxFields);

    const timestamp = form.response.getTimestamp();
    const formattedDate = formatDate(timestamp);

    const embed = {
      type: 'rich',
      color,
      title: embedTitle,
      fields
    };

    if (includeFooterTimestamp) {
      embed.footer = { text: formattedDate };
    }
    if (useEmbedTimestamp) {
      embed.timestamp = new Date(timestamp).toISOString();
    }

    const payload = { embeds: [embed] };
    if (username) payload.username = username;
    if (avatarUrl) payload.avatar_url = avatarUrl;

    return payload;
  };

  const sendToDiscord = () => {
    const params = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(createPayloadObject()),
      muteHttpExceptions: true
    };

    try {
      return UrlFetchApp.fetch(webhookUrl, params);
    } catch (err) {
      try {
        Logger.log('Failed to send to Discord: ' + err);
      } catch (e) {}
      return null;
    }
  };

  return sendToDiscord();
}
