// scheduled

exports = function() {
  const auth_secret = context.values.get("auth_secret_value");
  const url = context.values.get('event_url') + 'schedule';

  return context.http.post({
    url: url, 
    headers: {
      "Content-Type": [ "application/json" ],
      "Authorization": [`Bearer ${auth_secret}`],
    }
  });
}
