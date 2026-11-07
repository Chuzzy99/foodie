import { getItem, setItem, removeItem, STORAGE_KEYS } from './storage';

export const getUsers = async () => {
  return await getItem(STORAGE_KEYS.USERS, []);
};

export const saveUser = async (user) => {
  const users = await getUsers();
  const normalizedEmail = (user.email || '').trim().toLowerCase();
  const exists = users.some((u) => u.email.toLowerCase() === normalizedEmail);
  if (exists) {
    throw new Error('An account with this email is already registered.');
  }

  const newUser = {
    id: 'user_' + Date.now(),
    username: user.username.trim(),
    email: normalizedEmail,
    password: user.password,
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...users, newUser];
  await setItem(STORAGE_KEYS.USERS, updatedUsers);
  return newUser;
};

export const authenticateUser = async (email, password) => {
  const users = await getUsers();
  const normalizedEmail = (email || '').trim().toLowerCase();
  const user = users.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const session = {
    id: user.id,
    username: user.username,
    email: user.email,
    loggedInAt: new Date().toISOString(),
  };

  await setItem(STORAGE_KEYS.SESSION, session);
  return session;
};

export const getSession = async () => {
  return await getItem(STORAGE_KEYS.SESSION, null);
};

export const setSession = async (session) => {
  return await setItem(STORAGE_KEYS.SESSION, session);
};

export const clearSession = async () => {
  return await removeItem(STORAGE_KEYS.SESSION);
};
