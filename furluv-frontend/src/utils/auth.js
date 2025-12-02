export function register({ username, email, password, petName }) {
  const users = JSON.parse(localStorage.getItem('furluv_users') || '[]');

  if (users.find(u => u.email === email)) {
    return { success: false, message: 'Email already registered.' };
  }

  const newUser = {
    id: Date.now(),
    username,
    email,
    password,
    petName: petName || '',
  };

  users.push(newUser);
  localStorage.setItem('furluv_users', JSON.stringify(users));
  localStorage.setItem('furluv_current_user', JSON.stringify(newUser));
  return { success: true, user: newUser };
}

export function login({ email, password }) {
  const users = JSON.parse(localStorage.getItem('furluv_users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return { success: false, message: 'Invalid credentials.' };
  localStorage.setItem('furluv_current_user', JSON.stringify(user));
  return { success: true, user };
}

export function logout() {
  localStorage.removeItem('furluv_current_user');
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('furluv_current_user') || 'null');
}
