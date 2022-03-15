exports = function(changeEvent) {
  const auth_secret = context.values.get("auth_secret_value");
  const url = context.values.get('event_url');

  return context.http.post({
    url: url, 
    body: changeEvent.fullDocument,
    encodeBodyAsJSON: true,
    headers: {
      "Content-Type": [ "application/json" ],
      "Authorization": [`Bearer ${auth_secret}`],
    }
  });
};
