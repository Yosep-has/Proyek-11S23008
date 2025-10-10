import { useDispatch } from 'react-redux';
import { asyncAddCashFlow } from '../states/action';
import useInput from '../../../hooks/useInput';

// Fungsi getTodayDate sudah tidak diperlukan dan bisa dihapus

function AddTransactionModal({ show, onClose }) {
  const dispatch = useDispatch();

  const [type, onTypeChange] = useInput('inflow');
  const [source, onSourceChange] = useInput('cash');
  const [label, onLabelChange, setLabel] = useInput('');
  const [description, onDescriptionChange, setDescription] = useInput('');
  const [nominal, onNominalChange, setNominal] = useInput('');
  // State untuk 'date' sudah dihapus

  function handleSave() {
    // Validasi tanpa tanggal
    if (!label || !description || !nominal) {
      alert("Semua field harus diisi!");
      return;
    }

    const formData = new FormData();
    formData.append('type', type);
    formData.append('source', source);
    formData.append('label', label);
    formData.append('description', description);
    formData.append('nominal', nominal);
    // Pengiriman 'created_at' sudah dihapus

    // Kita perlu me-reset field setelah berhasil
    const onSuccess = () => {
      setLabel('');
      setDescription('');
      setNominal('');
      onClose(); // Tutup modal
    };

    dispatch(asyncAddCashFlow(formData, onSuccess));
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