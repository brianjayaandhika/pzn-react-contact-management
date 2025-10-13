import Swal from "sweetalert2";

export const successAlert = async (message) => {
  return Swal.fire({
    title: "Success",
    text: message || "Success",
    icon: "success",
  });
};

export const errorAlert = async (message) => {
  return Swal.fire({
    title: "Oops..",
    text: message || "Something went wrong...",
    icon: "error",
  });
};

export const infoAlert = async (message) => {
  return Swal.fire({
    title: "Info",
    text: message || "For your information",
    icon: "info",
  });
};

export const confirmAlert = async ({
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  cbConfirmText = "Done",
  cbConfirm,
}) => {
  await Swal.fire({
    title: "Are you sure?",
    text: message || "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then(async (result) => {
    if (result.isConfirmed && cbConfirm && typeof cbConfirm === "function") {
      try {
        await cbConfirm();
        await Swal.fire({ title: cbConfirmText, icon: "success" });
      } catch (err) {
        await errorAlert(err?.message || "Operation failed");
      }
    }
  });
};
