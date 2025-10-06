import cashFlowsApi from '../api/cashFlowsApi';
import { showSuccessDialog, showErrorDialog, showConfirmDialog } from '../../../helpers/toolsHelper';

export const ActionType = {
  SET_CASH_FLOWS: 'SET_CASH_FLOWS',
  SET_STATS: 'SET_STATS',
  ADD_CASH_FLOW: 'ADD_CASH_FLOW',
};

// Action creators (tidak ada perubahan di sini)
export function setCashFlowsActionCreator(cashFlows) {
  return { type: ActionType.SET_CASH_FLOWS, payload: cashFlows };
}

export function setStatsActionCreator(stats) {
    return { type: ActionType.SET_STATS, payload: stats };
}

// Thunks (Async Actions)
export function asyncGetAllCashFlows(params) {
  return async (dispatch) => {
    try {
      const { cash_flows, stats } = await cashFlowsApi.getAllCashFlows(params);
      dispatch(setCashFlowsActionCreator(cash_flows));
      dispatch(setStatsActionCreator(stats));
    } catch (error) {
      showErrorDialog(error.message);
    }
  };
}

export function asyncAddCashFlow(formData, onSuccess) {
    return async (dispatch) => {
        try {
            const { cash_flow_id } = await cashFlowsApi.addCashFlow(formData);
            showSuccessDialog('Berhasil menambahkan data');
            dispatch(asyncGetAllCashFlows());
            if (onSuccess) onSuccess();
        } catch (error) {
            showErrorDialog(error.message);
        }
    };
}

// THUNK BARU UNTUK FUNGSI HAPUS
export function asyncDeleteCashFlow(id) {
  return async (dispatch) => {
    const confirmation = await showConfirmDialog('Apakah Anda yakin ingin menghapus transaksi ini?');
    if (confirmation.isConfirmed) {
      try {
        const message = await cashFlowsApi.deleteCashFlow(id);
        showSuccessDialog(message);
        // Muat ulang semua data setelah berhasil menghapus
        dispatch(asyncGetAllCashFlows());
      } catch (error) {
        showErrorDialog(error.message);
      }
    }
  };
}