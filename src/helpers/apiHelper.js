const apiHelper = (() => {
  // Fungsi untuk mengambil data dengan menyertakan token
  async function fetchData(url, options) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`, // Token ditambahkan di sini
      },
    });
  }

  // Fungsi untuk menyimpan dan mengambil token dari localStorage
  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  return {
    fetchData,
    putAccessToken,
    getAccessToken,
  };
})();

export default apiHelper;