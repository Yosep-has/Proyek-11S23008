import apiHelper from "../../../helpers/apiHelper";

const cashFlowsApi = (() => {
  const BASE_URL = `${CASHFLOW_BASEURL}/cash-flows`; // Menggunakan variabel global dari vite.config.js

  /**
   * Mengambil semua data cash flow dengan filter opsional.
   * @param {object} params - Objek parameter filter (e.g., { type: 'inflow', start_date: '...' }).
   * @returns {Promise<object>} Data yang berisi cash_flows dan stats.
   */
  async function getAllCashFlows(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await apiHelper.fetchData(`${BASE_URL}?${query}`, {
      method: "GET",
    });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data;
  }

  /**
   * Mengambil detail satu data cash flow berdasarkan ID.
   * @param {string|number} id - ID dari cash flow.
   * @returns {Promise<object>} Objek detail cash_flow.
   */
  async function getDetailCashFlow(id) {
    const response = await apiHelper.fetchData(`${BASE_URL}/${id}`, { method: 'GET' });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data.cash_flow;
  }

  /**
   * Menambahkan data cash flow baru.
   * @param {FormData} formData - Data form yang akan dikirim.
   * @returns {Promise<object>} Data respons dari API.
   */
  async function addCashFlow(formData) {
    const response = await apiHelper.fetchData(BASE_URL, {
      method: "POST",
      body: formData,
    });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data;
  }
  
  /**
   * Mengubah data cash flow yang sudah ada.
   * @param {string|number} id - ID dari cash flow yang akan diubah.
   * @param {object} cashFlowData - Data baru untuk cash flow.
   * @returns {Promise<string>} Pesan sukses dari API.
   */
  async function updateCashFlow(id, { type, source, label, description, nominal }) {
    const response = await apiHelper.fetchData(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ type, source, label, description, nominal }),
    });
    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    return message;
  }

  /**
   * Menghapus data cash flow berdasarkan ID.
   * @param {string|number} id - ID dari cash flow yang akan dihapus.
   * @returns {Promise<string>} Pesan sukses dari API.
   */
  async function deleteCashFlow(id) {
    const response = await apiHelper.fetchData(`${BASE_URL}/${id}`, { method: 'DELETE' });
    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    return message;
  }
  
  /**
   * Mengambil semua label unik milik pengguna.
   * @returns {Promise<Array<string>>} Array berisi string label.
   */
  async function getLabels() {
    const response = await apiHelper.fetchData(`${BASE_URL}/labels`, { method: 'GET' });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data.labels;
  }

  /**
   * Mengambil statistik harian.
   * @param {object} params - Parameter filter (e.g., { end_date: '...', total_data: 7 }).
   * @returns {Promise<object>} Objek berisi statistik inflow, outflow, dan cashflow harian.
   */
  async function getStatsDaily(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await apiHelper.fetchData(`${BASE_URL}/stats/daily?${query}`, { method: 'GET' });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data;
  }

  /**
   * Mengambil statistik bulanan.
   * @param {object} params - Parameter filter (e.g., { end_date: '...', total_data: 12 }).
   * @returns {Promise<object>} Objek berisi statistik inflow, outflow, dan cashflow bulanan.
   */
  async function getStatsMonthly(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await apiHelper.fetchData(`${BASE_URL}/stats/monthly?${query}`, { method: 'GET' });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data;
  }

  // Ekspor semua fungsi agar bisa digunakan di tempat lain
  return {
    getAllCashFlows,
    getDetailCashFlow,
    addCashFlow,
    updateCashFlow,
    deleteCashFlow,
    getLabels,
    getStatsDaily,
    getStatsMonthly,
  };
})();

export default cashFlowsApi;