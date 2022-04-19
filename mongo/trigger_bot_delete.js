// On delete

exports = function(changeEvent) {
  const auth_secret = context.values.get("auth_secret_value");
  const url = context.values.get('event_url') + 'doc/' + changeEvent.documentKey._id.toString();

  return context.http.delete({
    url: url, 
    headers: {
      "Content-Type": [ "application/json" ],
      "Authorization": [`Bearer ${auth_secret}`],
    }
  });
}
