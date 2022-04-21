// On create/update/replace

exports = function(changeEvent) {
  const auth_secret = context.values.get("auth_secret_value");
  const url = context.values.get('event_url') + 'doc/' + changeEvent.documentKey._id.toString();
  const fields = changeEvent.updateDescription?.updatedFields;

  if (fields?.hasOwnProperty('src') || fields?.hasOwnProperty('token') || fields?.hasOwnProperty('status')) {
    return context.http.post({
      url: url, 
      headers: {
        "Content-Type": [ "application/json" ],
        "Authorization": [`Bearer ${auth_secret}`],
      }
    });
  }

  return null;
}
