import getFirebase from '@/utils/firebase';

const processToken = async (token, apiEndpoint, onSuccess, onError) => {
  const backendResponse = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ idToken: token }),
  });

  if (backendResponse.status === 200) {
    if (onSuccess) onSuccess();
  } else if (onError) onError();
};

export const getUser = async () => {
  const backendResponse = await fetch('/api/user', {
    method: 'GET',
    credentials: 'include',
  });
  if (backendResponse.status === 200) {
    return backendResponse.json();
  }
  return {};
};

export const logout = async (onSuccess, onError) => {
  const backendResponse = await fetch('/api/logout', {
    method: 'POST',
    credentials: 'include',
  });
  if (backendResponse.status === 200) {
    if (onSuccess) onSuccess();
  } else if (onError) onError();
};

export const googleSignIn = async (onSuccess, onError) => {
  const firebase = getFirebase();
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const res = await firebase.auth().signInWithPopup(provider);
    const token = await res.user.getIdToken();

    if (!token || !res || !res.user) {
      if (onError) onError();
      return;
    }

    console.log('SIGNED IN', res);

    await processToken(token, '/api/login', () => onSuccess(res.user), onError);
  } catch (e) {
    console.log('ERROR', e);
    if (onError) onError();
  }
};

export const googleSignUp = async (onSuccess, onError) => {
  const firebase = getFirebase();
  const provider = new firebase.auth.GoogleAuthProvider();
  console.log('STARTED');

  try {
    const res = await firebase.auth().signInWithPopup(provider);
    const token = await res.user.getIdToken();

    if (!res || !res.user || !token) {
      if (onError) onError();
      return;
    }
    console.log('SIGNED UP', res);

    await processToken(token, '/api/signup', () => onSuccess(res.user), onError);
  } catch (e) {
    console.log('ERROR', e);
    if (onError) onError();
  }
};

export const defaultSignIn = async (email, password, onSuccess, onError) => {
  const firebase = getFirebase();
  try {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password);
    const token = await res.user.getIdToken();

    if (!token || !res || !res.user) {
      if (onError) onError();
      return;
    }

    console.log('SIGNED IN', res);

    await processToken(token, '/api/login', () => onSuccess(res.user), onError);
  } catch (e) {
    console.log('ERROR', e);
    if (onError) onError();
  }
};

export const defaultSignUp = async (email, password, onSuccess, onError) => {
  const firebase = getFirebase();
  try {
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const token = await res.user.getIdToken();

    if (!token || !res || !res.user) {
      if (onError) onError();
      return;
    }

    console.log('SIGNED UP', res);

    await processToken(token, '/api/signup', () => onSuccess(res.user), onError);
  } catch (e) {
    console.log('ERROR', e);
    if (onError) onError();
  }
};
