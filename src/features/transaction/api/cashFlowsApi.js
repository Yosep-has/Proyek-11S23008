import apiHelper from "../../../helpers/apiHelper";

const cashFlowsApi = (() => {
  const BASE_URL = `${CASHFLOW_BASEURL}/cash-flows`;

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
    const response = await apiHelper.fetchData(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    const result = await response.json();
    const { success, message, data } = result;

    if (!success) {
      throw new Error(message);
    }
    return data;
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