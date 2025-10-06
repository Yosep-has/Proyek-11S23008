import Swal from "sweetalert2";

export function showErrorDialog(message) {
  Swal.fire({
    title: "Terjadi Kesalahan",
    text: message,
    icon: "error",
    confirmButtonText: "Tutup",
  });
}

export function showSuccessDialog(message) {
  Swal.fire({
    title: "Tindakan Berhasil",
    text: message,
    icon: "success",
    confirmButtonText: "Tutup",
  });
}

// TAMBAHKAN FUNGSI INI
export function showConfirmDialog(message) {
  return Swal.fire({
    title: "Konfirmasi",
    text: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Tidak",
  });
}