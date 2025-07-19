// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = 'your-cloud-name'; // Ganti dengan cloud name kamu
const CLOUDINARY_UPLOAD_PRESET = 'your-upload-preset'; // Ganti dengan upload preset kamu

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.secure_url; // Return URL gambar yang sudah diupload
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

// Helper function untuk validasi file gambar
export const validateImageFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error('File harus berupa gambar (JPEG, PNG, GIF)');
  }

  if (file.size > maxSize) {
    throw new Error('Ukuran file maksimal 5MB');
  }

  return true;
}; 