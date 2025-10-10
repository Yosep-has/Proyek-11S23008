import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncUpdateCashFlow } from '../states/action';
import useInput from '../../../hooks/useInput';

function EditTransactionModal({ show, onClose, transaction }) {
  const dispatch = useDispatch();

  // State untuk input form, 'date' sudah dihapus
  const [type, onTypeChange, setType] = useInput('');
  const [source, onSourceChange, setSource] = useInput('');
  const [label, onLabelChange, setLabel] = useInput('');
  const [description, onDescriptionChange, setDescription] = useInput('');
  const [nominal, onNominalChange, setNominal] = useInput('');

  // Mengisi form saat data transaksi tersedia
  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setSource(transaction.source);
      setLabel(transaction.label);
      setDescription(transaction.description);
      setNominal(transaction.nominal);
      // Logika untuk 'setDate' sudah dihapus
    }
  }, [transaction, setType, setSource, setLabel, setDescription, setNominal]);

  function handleUpdate() {
    // Validasi tanpa tanggal
    if (!label || !description || !nominal) {
      alert('Semua field harus diisi!');
      return;
    }

    // Data yang akan dikirim, tanpa 'created_at'
    const updatedData = {
      type,
      source,
      label,
      description,
      nominal,
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
              {/* === INPUT TANGGAL TELAH DIHAPUS DARI SINI === */}
              
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