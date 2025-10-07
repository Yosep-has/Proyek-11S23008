import cashFlowsApi from '../api/cashFlowsApi';
import { showSuccessDialog, showErrorDialog, showConfirmDialog } from '../../../helpers/toolsHelper';

export const ActionType = {
  SET_CASH_FLOWS: 'SET_CASH_FLOWS',
  SET_STATS: 'SET_STATS',
  ADD_CASH_FLOW: 'ADD_CASH_FLOW',
  // Action types baru untuk statistik
  SET_STATS_DAILY: 'SET_STATS_DAILY',
  SET_STATS_MONTHLY: 'SET_STATS_MONTHLY',
};

// Action creators
export function setCashFlowsActionCreator(cashFlows) {
  return { type: ActionType.SET_CASH_FLOWS, payload: cashFlows };
}

export function setStatsActionCreator(stats) {
    return { type: ActionType.SET_STATS, payload: stats };
}

// Action creators baru
export function setStatsDailyActionCreator(statsDaily) {
  return { type: ActionType.SET_STATS_DAILY, payload: statsDaily };
}

export function setStatsMonthlyActionCreator(statsMonthly) {
  return { type: ActionType.SET_STATS_MONTHLY, payload: statsMonthly };
}


// Thunks (Async Actions)
export function asyncGetAllCashFlows(params) {
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
          // Muat ulang semua data agar ringkasan dan statistik terupdate
          dispatch(asyncGetAllCashFlows());
          dispatch(asyncGetStatsDaily({ total_data: 7 }));
          dispatch(asyncGetStatsMonthly({ total_data: 12 }));
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
        // Muat ulang semua data agar ringkasan dan statistik terupdate
        dispatch(asyncGetAllCashFlows());
        dispatch(asyncGetStatsDaily({ total_data: 7 }));
        dispatch(asyncGetStatsMonthly({ total_data: 12 }));
      } catch (error) {
        showErrorDialog(error.message);
      }
    }
  };
}

// Thunks baru untuk statistik
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

export function asyncUpdateCashFlow(id, formData, onSuccess) {
  return async (dispatch) => {
    try {
      await cashFlowsApi.updateCashFlow(id, formData);
      showSuccessDialog('Berhasil memperbarui data');
      dispatch(asyncGetAllCashFlows());
      dispatch(asyncGetStatsDaily({ total_data: 7 }));
      dispatch(asyncGetStatsMonthly({ total_data: 12 }));
      if (onSuccess) onSuccess();
    } catch (error) {
      showErrorDialog(error.message);
    }
  };
}