import apiHelper from "../../../helpers/apiHelper";

const cashFlowsApi = (() => {
  const BASE_URL = `${CASHFLOW_BASEURL}/cash-flows`;  // Asumsi CASHFLOW_BASEURL didefinisikan di env atau global

  // Helper: Format created_at ke ISO datetime (standar, aman untuk backend)
  function formatDateTime(dateInput) {
    if (!dateInput) return null;
    let dateObj;
    if (typeof dateInput === 'string') {
      dateObj = new Date(dateInput);
    } else if (dateInput instanceof Date) {
      dateObj = dateInput;
    } else {
      return null; // Invalid
    }
    if (isNaN(dateObj.getTime())) {
      console.error('Invalid date input:', dateInput);
      return null;
    }
    // Return ISO: "2023-10-11T00:00:00.000Z" (full datetime, timezone-aware)
    return dateObj.toISOString();
    // Jika backend expect "YYYY-MM-DD HH:mm:ss" tanpa Z, gunakan:
    // return dateObj.toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }).replace(' ', 'T');
    // Atau untuk date-only: return dateObj.toISOString().split('T')[0];
  }

  async function getAllCashFlows(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await apiHelper.fetchData(`${BASE_URL}?${query}`, {
      method: "GET",
    });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data;
  }

  async function addCashFlow(formData) {
    const response = await apiHelper.fetchData(BASE_URL, {
      method: "POST",
      body: formData,
    });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data;
  }
  
  async function updateCashFlow(id, updateData) {
    // Validasi dan format created_at
    const formattedData = { ...updateData };
    if (updateData.created_at !== undefined) {  // Gunakan !== undefined untuk allow null/empty
      formattedData.created_at = formatDateTime(updateData.created_at);
      if (formattedData.created_at === null) {
        throw new Error('Format tanggal tidak valid. Gunakan YYYY-MM-DD atau Date object.');
      }
    }

    // Log input untuk debug
    console.log('Update API called:', { id, formattedData });

    // Ganti ke JSON body (lebih aman untuk datetime, tidak perlu encode)
    const response = await apiHelper.fetchData(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        // Jika auth diperlukan: 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formattedData),
    });

    const result = await response.json();
    const { success, message, data } = result;

    if (!success) {
      console.error('Update API failed:', { id, message, response: result });
      throw new Error(message);
    }

    console.log('Update API success:', { id, data, message });
    return data || { message };  // Return full data jika ada, fallback ke { message }
  }

  async function deleteCashFlow(id) {
    const response = await apiHelper.fetchData(`${BASE_URL}/${id}`, { method: 'DELETE' });
    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    return message;
  }
  
  async function getStatsDaily(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await apiHelper.fetchData(`${BASE_URL}/stats/daily?${query}`, { method: 'GET' });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data;
  }

  async function getStatsMonthly(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await apiHelper.fetchData(`${BASE_URL}/stats/monthly?${query}`, { method: 'GET' });
    const { success, message, data } = await response.json();
    if (!success) throw new Error(message);
    return data;
  }

  return {
    getAllCashFlows,
    addCashFlow,
    updateCashFlow,
    deleteCashFlow,
    getStatsDaily,
    getStatsMonthly,
  };
})();

export default cashFlowsApi;