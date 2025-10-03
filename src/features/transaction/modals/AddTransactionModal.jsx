import { useDispatch } from 'react-redux';
import { asyncAddCashFlow } from '../states/action';
import useInput from '../../../hooks/useInput';

function AddTransactionModal({ show, onClose }) {
  const dispatch = useDispatch();

  // States untuk setiap input form
  const [type, onTypeChange] = useInput('inflow');
  const [source, onSourceChange] = useInput('cash');
  const [label, onLabelChange] = useInput('');
  const [description, onDescriptionChange] = useInput('');
  const [nominal, onNominalChange] = useInput('');

  function handleSave() {
    // Membuat objek FormData untuk dikirim ke API
    const formData = new FormData();
    formData.append('type', type);
    formData.append('source', source);
    formData.append('label', label);
    formData.append('description', description);
    formData.append('nominal', nominal);

    // Memanggil thunk dari Redux, dengan callback untuk menutup modal
    dispatch(asyncAddCashFlow(formData, onClose));
  }

  if (!show) return null;

  return (
    // JSX untuk modal
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Tambah Transaksi</h5>
          </div>
          <div className="modal-body">
            {/* ... form inputs untuk type, source, label, description, nominal ... */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTransactionModal;