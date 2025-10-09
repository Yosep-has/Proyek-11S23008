import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncUpdateCashFlow } from '../states/action';
import useInput from '../../../hooks/useInput';

function EditTransactionModal({ show, onClose, transaction }) {
  const dispatch = useDispatch();

  const [type, onTypeChange, setType] = useInput('');
  const [source, onSourceChange, setSource] = useInput('');
  const [label, onLabelChange, setLabel] = useInput('');
  const [description, onDescriptionChange, setDescription] = useInput('');
  const [nominal, onNominalChange, setNominal] = useInput('');
  const [date, onDateChange, setDate] = useInput('');

  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setSource(transaction.source);
      setLabel(transaction.label);
      setDescription(transaction.description);
      setNominal(transaction.nominal);

      // --- PERBAIKAN ADA DI SINI ---
      // Mengubah format tanggal dari server menjadi 'YYYY-MM-DD' 
      // agar sesuai dengan input type="date"
      const transactionDate = new Date(transaction.created_at);
      const year = transactionDate.getFullYear();
      const month = String(transactionDate.getMonth() + 1).padStart(2, '0');
      const day = String(transactionDate.getDate()).padStart(2, '0');
      setDate(`${year}-${month}-${day}`);
      // --- SELESAI ---
    }
  }, [transaction, setType, setSource, setLabel, setDescription, setNominal, setDate]);

  function handleUpdate() {
    if (!label || !description || !nominal || !date) {
      alert('Semua field harus diisi!');
      return;
    }

    const updatedData = {
      type,
      source,
      label,
      description,
      nominal,
      created_at: `${date} 00:00:00`,
    };

    dispatch(asyncUpdateCashFlow(transaction.id, updatedData, onClose));
  }

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Transaksi</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Tanggal Transaksi</label>
                <input type="date" className="form-control" value={date} onChange={onDateChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Tipe</label>
                <select className="form-select" value={type} onChange={onTypeChange}>
                  <option value="inflow">Pemasukan (Inflow)</option>
                  <option value="outflow">Pengeluaran (Outflow)</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Sumber Dana</label>
                <select className="form-select" value={source} onChange={onSourceChange}>
                  <option value="cash">Uang Tunai (Cash)</option>
                  <option value="savings">Tabungan (Savings)</option>
                  <option value="loans">Pinjaman (Loans)</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Label</label>
                <input type="text" className="form-control" value={label} onChange={onLabelChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Deskripsi</label>
                <textarea className="form-control" value={description} onChange={onDescriptionChange} rows="2"></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Nominal (Rp)</label>
                <input type="number" className="form-control" value={nominal} onChange={onNominalChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Simpan Perubahan</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTransactionModal;
