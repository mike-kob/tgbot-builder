export const getBotList = async () => {
  const backendResponse = await fetch('/api/bots', {
    method: 'GET',
    credentials: 'include',
  });

  if (backendResponse.status === 200) {
    return backendResponse.json();
  }
  return [];
};

export const getBot = async (id) => {
  const backendResponse = await fetch(`/api/bot/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (backendResponse.status === 200) {
    return backendResponse.json();
  }
  return [];
};

export const getBotUsers = async (id) => {
  const backendResponse = await fetch(`/api/bot/${id}/users/`, {
    method: 'GET',
    credentials: 'include',
  });

  if (backendResponse.status === 200) {
    return backendResponse.json();
  }
  return [];
};

export const getBotUserChat = async (id, userId) => {
  const backendResponse = await fetch(`/api/bot/${id}/user/${userId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (backendResponse.status === 200) {
    return backendResponse.json();
  }
  return [];
};

export const addBot = async (bot, onSuccess, onError) => {
  const backendResponse = await fetch('/api/bot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(bot),
  });

  if (backendResponse.status === 201) {
    const responseBot = await backendResponse.json();
    if (onSuccess) onSuccess(responseBot);
  } else if (onError) onError();
};

export const updateBotInfo = async (id, bot, onSuccess, onError) => {
  const backendResponse = await fetch(`/api/bot/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(bot),
  });

  if (backendResponse.status === 200) {
    const responseBot = await backendResponse.json();
    if (onSuccess) onSuccess(responseBot);
  } else if (onError) onError();
};

export const saveBot = async (id, state, onSuccess, onError) => {
  const backendResponse = await fetch(`/api/bot/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ src: state }),
  });

  if (backendResponse.status === 200) {
    const bot = await backendResponse.json();
    if (onSuccess) onSuccess(bot);
  } else if (onError) onError();
};

export const deleteBot = async (id, onSuccess, onError) => {
  const backendResponse = await fetch(`/api/bot/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (backendResponse.status === 204) {
    if (onSuccess) onSuccess();
  } else if (onError) onError();
};

export const deployBot = async (id, onSuccess, onError) => {
  const backendResponse = await fetch(`/api/bot/deploy/${id}`, {
    method: 'POST',
    credentials: 'include',
  });

  if (backendResponse.status === 200) {
    const bot = await backendResponse.json();
    if (onSuccess) onSuccess(bot);
  } else if (onError) onError();
};

export const postMessage = async (id, chatId, text, onSuccess, onError) => {
  const backendResponse = await fetch(`/api/bot/${id}/postMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ chatId, text }),
  });

  if (backendResponse.status === 201) {
    const message = await backendResponse.json();
    if (onSuccess) onSuccess(message);
  } else if (onError) onError();
};
