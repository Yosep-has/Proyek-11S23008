import apiHelper from '../../../helpers/apiHelper';

const authApi = (() => {
  // Kita asumsikan endpoint auth sama seperti latihan sebelumnya
  const BASE_URL = `${CASHFLOW_BASEURL}/auth`;

  async function login({ email, password }) {
    const response = await apiHelper.fetchData(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const { success, message, data } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    return data.token; // API mengembalikan token
  }

  return { login };
})();

export default authApi;