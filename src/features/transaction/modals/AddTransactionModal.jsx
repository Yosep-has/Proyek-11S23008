import { useDispatch } from 'react-redux';
import { asyncAddCashFlow } from '../states/action';
import useInput from '../../../hooks/useInput';

// Fungsi untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function AddTransactionModal({ show, onClose }) {
  const dispatch = useDispatch();

  const [type, onTypeChange] = useInput('inflow');
  const [source, onSourceChange] = useInput('cash');
  const [label, onLabelChange] = useInput('');
  const [description, onDescriptionChange] = useInput('');
  const [nominal, onNominalChange] = useInput('');
  // State baru untuk tanggal, defaultnya hari ini
  const [date, onDateChange] = useInput(getTodayDate());

  function handleSave() {
    if (!label || !description || !nominal || !date) {
      alert("Semua field harus diisi!");
      return;
    }

    const formData = new FormData();
    formData.append('type', type);
    formData.append('source', source);
    formData.append('label', label);
    formData.append('description', description);
    formData.append('nominal', nominal);
    // Tambahkan tanggal ke FormData. API akan menerima ini sebagai 'created_at'.
    // Kita tambahkan waktu agar sesuai format timestamp.
    formData.append('created_at', `${date} 00:00:00`);

    dispatch(asyncAddCashFlow(formData, onClose));
  }

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Tambah Transaksi Baru</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {/* Input Tanggal Baru */}
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
                <input type="text" className="form-control" value={label} onChange={onLabelChange} placeholder="Contoh: gaji, makanan" />
              </div>
              <div className="mb-3">
                <label className="form-label">Deskripsi</label>
                <textarea className="form-control" value={description} onChange={onDescriptionChange} rows="2"></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Nominal (Rp)</label>
                <input type="number" className="form-control" value={nominal} onChange={onNominalChange} placeholder="Contoh: 50000" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>Simpan</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTransactionModal;