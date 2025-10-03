import apiHelper from "../../../helpers/apiHelper";

const cashFlowsApi = (() => {
  const BASE_URL = `${CASHFLOW_BASEURL}/cash-flows`; // Menggunakan variabel global dari vite.config.js

  // GET /cash-flows - Mengambil semua data cash flow
  async function getAllCashFlows(params = {}) {
    // Membuat query string dari parameter filter (jika ada)
    const query = new URLSearchParams(params).toString();
    const response = await apiHelper.fetchData(`${BASE_URL}?${query}`, {
      method: "GET",
    });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data; // Mengembalikan { cash_flows: [...], stats: {...} }
  }

  // POST /cash-flows - Menambahkan data baru
  async function addCashFlow(formData) { // Menerima FormData
    const response = await apiHelper.fetchData(BASE_URL, {
      method: "POST",
      // Headers tidak perlu Content-Type, browser akan set otomatis untuk FormData
      body: formData,
    });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data;
  }
  
  // PUT /cash-flows/:id - Mengubah data
  async function updateCashFlow(id, { type, source, label, description, nominal }) {
    const response = await apiHelper.fetchData(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ type, source, label, description, nominal }),
    });
    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    return message;
  }

  // DELETE /cash-flows/:id - Menghapus data
  async function deleteCashFlow(id) {
    const response = await apiHelper.fetchData(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    return message;
  }
  
  // GET /cash-flows/labels - Mengambil daftar label
  async function getLabels() {
    const response = await apiHelper.fetchData(`${BASE_URL}/labels`, {
        method: 'GET',
    });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data.labels;
  }

  return {
    getAllCashFlows,
    addCashFlow,
    updateCashFlow,
    deleteCashFlow,
    getLabels,
  };
})();

export default cashFlowsApi;