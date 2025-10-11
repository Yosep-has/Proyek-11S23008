import apiHelper from '../../../helpers/apiHelper';

const authApi = (() => {
  const BASE_URL = AUTH_BASEURL; // Gunakan URL khusus auth

  async function login({ email, password }) {
    const response = await apiHelper.fetchData(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    // Kembalikan seluruh data (termasuk user)
    return data;
  }

  async function register({ name, email, password }) {
    const response = await apiHelper.fetchData(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    return message;
  }

  // Fungsi untuk mengambil profil pengguna
  async function getOwnProfile() {
    // URL DIUBAH KE ENDPOINT YANG BENAR (/auth/me)
    const response = await apiHelper.fetchData(`${BASE_URL}/me`, {
      method: 'GET',
    });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data; // Kembalikan data user
  }

  return { login, register, getOwnProfile }; // Ekspor fungsi baru
})();

export default authApi;