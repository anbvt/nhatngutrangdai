export function previewApplication(formData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!name || !email || !phone) {
    throw new Error("Application preview requires a name, email, and phone number.");
  }

  return { mode: "preview-only", submitted: false };
}
