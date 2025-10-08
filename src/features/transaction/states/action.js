import cashFlowsApi from '../api/cashFlowsApi';
import { showSuccessDialog, showErrorDialog, showConfirmDialog } from '../../../helpers/toolsHelper';

// Helper untuk mendapatkan tanggal hari ini
const getTodayDate = () => new Date().toISOString().split('T')[0];

export const ActionType = {
  SET_CASH_FLOWS: 'SET_CASH_FLOWS',
  SET_FILTERED_CASH_FLOWS: 'SET_FILTERED_CASH_FLOWS',
  SET_STATS: 'SET_STATS',
  ADD_CASH_FLOW: 'ADD_CASH_FLOW',
  SET_STATS_DAILY: 'SET_STATS_DAILY',
  SET_STATS_MONTHLY: 'SET_STATS_MONTHLY',
};

// ... (semua action creator tidak berubah)
export function setCashFlowsActionCreator(cashFlows) { return { type: ActionType.SET_CASH_FLOWS, payload: cashFlows }; }
export function setFilteredCashFlowsActionCreator(cashFlows) { return { type: ActionType.SET_FILTERED_CASH_FLOWS, payload: cashFlows }; }
export function setStatsActionCreator(stats) { return { type: ActionType.SET_STATS, payload: stats }; }
export function setStatsDailyActionCreator(statsDaily) { return { type: ActionType.SET_STATS_DAILY, payload: statsDaily }; }
export function setStatsMonthlyActionCreator(statsMonthly) { return { type: ActionType.SET_STATS_MONTHLY, payload: statsMonthly }; }


// --- PERBAIKAN UTAMA DI SINI ---
// Fungsi terpusat untuk memuat ulang semua data dan statistik
function fetchAllData() {
  return async (dispatch) => {
    const today = getTodayDate();
    dispatch(asyncGetAllCashFlows());
    dispatch(asyncGetStatsDaily({ end_date: today, total_data: 7 }));
    dispatch(asyncGetStatsMonthly({ end_date: today, total_data: 12 }));
  };
}
// --- SELESAI ---

export function asyncGetAllCashFlows(params = {}) {
  return async (dispatch) => {
    try {
      const { cash_flows, stats } = await cashFlowsApi.getAllCashFlows(params);
      dispatch(setCashFlowsActionCreator(cash_flows || []));
      dispatch(setStatsActionCreator(stats || {}));
    } catch (error) {
      showErrorDialog(error.message);
    }
  };
}

export function asyncAddCashFlow(formData, onSuccess) {
  return async (dispatch) => {
    try {
      await cashFlowsApi.addCashFlow(formData);
      showSuccessDialog('Berhasil menambahkan data');
      dispatch(fetchAllData()); // Panggil fungsi terpusat
      if (onSuccess) onSuccess();
    } catch (error) {
      showErrorDialog(error.message);
    }
  };
}

export function asyncUpdateCashFlow(id, data, onSuccess) {
  return async (dispatch) => {
    try {
      await cashFlowsApi.updateCashFlow(id, data);
      showSuccessDialog('Berhasil memperbarui data');
      dispatch(fetchAllData()); // Panggil fungsi terpusat
      if (onSuccess) onSuccess();
    } catch (error) {
      showErrorDialog(error.message);
    }
  };
}

export function asyncDeleteCashFlow(id) {
  return async (dispatch) => {
    const confirmation = await showConfirmDialog('Apakah Anda yakin ingin menghapus transaksi ini?');
    if (confirmation.isConfirmed) {
      try {
        const message = await cashFlowsApi.deleteCashFlow(id);
        showSuccessDialog(message);
        dispatch(fetchAllData()); // Panggil fungsi terpusat
      } catch (error) {
        showErrorDialog(error.message);
      }
    }
  };
}

export function asyncGetStatsDaily(params) {
  return async (dispatch) => {
    try {
      const stats = await cashFlowsApi.getStatsDaily(params);
      dispatch(setStatsDailyActionCreator(stats));
    } catch (error) {
      showErrorDialog(error.message);
    }
  };
}

export function asyncGetStatsMonthly(params) {
  return async (dispatch) => {
    try {
      const stats = await cashFlowsApi.getStatsMonthly(params);
      dispatch(setStatsMonthlyActionCreator(stats));
    } catch (error) {
      showErrorDialog(error.message);
    }
  };
}