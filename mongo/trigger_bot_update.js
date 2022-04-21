// On create/update/replace

exports = function(changeEvent) {
  const auth_secret = context.values.get("auth_secret_value");
  const url = context.values.get('event_url') + 'doc/' + changeEvent.documentKey._id.toString();
  const updatedFields = changeEvent.updateDescription?.updatedFields;

  if (updatedFields?.src || updatedFields?.token || updatedFields?.status) {
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
