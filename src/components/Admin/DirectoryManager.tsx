import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, User, Upload, Camera, AlertCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { uploadToCloudinary, validateImageFile } from '../../services/cloudinary';

const DirectoryManager: React.FC = () => {
  const { directory, loading, errors, createDirectory, updateDirectory, deleteDirectory } = useData();
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    photo: '',
    photoFile: null as File | null,
    origin: '',
    bio: '',
    instagram: '',
    linkedin: '',
    github: ''
  });
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      name: '',
      position: '',
      photo: '',
      photoFile: null,
      origin: '',
      bio: '',
      instagram: '',
      linkedin: '',
      github: ''
    });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      position: item.position || '',
      photo: item.photo,
      photoFile: null,
      origin: item.origin || '',
      bio: item.bio || '',
      instagram: item.instagram || '',
      linkedin: item.linkedin || '',
      github: item.github || ''
    });
  };

  const handleFileSelect = (file: File) => {
    try {
      validateImageFile(file);
      setFormData({ ...formData, photoFile: file, photo: '' });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, photo: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'File tidak valid');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleSave = async () => {
    try {
      setIsUploading(true);
      let finalPhotoUrl = formData.photo;

      // Upload to Cloudinary if there's a file
      if (formData.photoFile) {
        setUploadProgress(0);
        finalPhotoUrl = await uploadToCloudinary(formData.photoFile);
        setUploadProgress(100);
      }

      const studentData = {
        name: formData.name,
        position: formData.position,
        photo: finalPhotoUrl,
        origin: formData.origin,
        bio: formData.bio,
        instagram: formData.instagram,
        linkedin: formData.linkedin,
        github: formData.github
      };

      if (isAdding) {
        await createDirectory(studentData);
        setIsAdding(false);
      } else if (editingItem) {
        await updateDirectory(editingItem._id || editingItem.id, studentData);
        setEditingItem(null);
      }
      
      setFormData({
        name: '',
        position: '',
        photo: '',
        photoFile: null,
        origin: '',
        bio: '',
        instagram: '',
        linkedin: '',
        github: ''
      });
      setUploadProgress(0);
    } catch (error) {
      console.error('Error saving directory item:', error);
      alert('Gagal menyimpan data');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingItem(null);
    setFormData({
      name: '',
      position: '',
      photo: '',
      photoFile: null,
      origin: '',
      bio: '',
      instagram: '',
      linkedin: '',
      github: ''
    });
    setUploadProgress(0);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus data mahasiswa ini?')) {
      try {
        await deleteDirectory(id);
      } catch (error) {
        console.error('Error deleting directory item:', error);
        alert('Gagal menghapus data');
      }
    }
  };

  // Show loading state
  if (loading.directory) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Memuat Data...
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Sedang mengambil data dari server.
        </p>
      </div>
    );
  }

  // Show error state
  if (errors.directory) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Gagal Memuat Data
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {errors.directory}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Kelola Direktori Mahasiswa
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tambah Mahasiswa
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingItem) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {isAdding ? 'Tambah Mahasiswa Baru' : 'Edit Data Mahasiswa'}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Posisi
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  placeholder="Masukkan posisi/jabatan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL Foto (Opsional)
                </label>
                <input
                  type="url"
                  value={formData.photoFile ? '' : formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value, photoFile: null })}
                  disabled={!!formData.photoFile}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Asal Daerah
                </label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  placeholder="Masukkan asal daerah"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  placeholder="Masukkan bio singkat"
                />
              </div>
            </div>

            <div className="space-y-4">
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Foto
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {formData.photo ? (
                    <div className="space-y-4">
                      <img
                        src={formData.photo}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg mx-auto"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, photo: '', photoFile: null })}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Hapus Foto
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Drag & drop foto di sini, atau <span className="text-primary-600">klik untuk memilih</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          PNG, JPG, GIF hingga 5MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Sosial Media</h4>
                
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 text-sm"
                    placeholder="https://instagram.com/username"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 text-sm"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    GitHub
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 text-sm"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>

              {/* Upload Progress */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  disabled={isUploading || !formData.name}
                  className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isUploading ? 'Menyimpan...' : 'Simpan'}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 mr-2" />
                  Batal
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {directory && directory.map((student, index) => (
          <motion.div
            key={student._id || student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={student.photo || 'https://via.placeholder.com/300x300?text=No+Photo'}
                alt={student.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={() => handleEdit(student)}
                  className="p-1 bg-white/80 hover:bg-white text-gray-700 rounded transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(student._id || student.id)}
                  className="p-1 bg-white/80 hover:bg-white text-red-600 rounded transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {student.name}
              </h3>
              {student.position && (
                <p className="text-primary-600 dark:text-primary-400 text-sm mb-2">
                  {student.position}
                </p>
              )}
              {student.origin && (
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                  📍 {student.origin}
                </p>
              )}
              
              {/* Social Media Indicators */}
              <div className="flex items-center space-x-2">
                {student.instagram && (
                  <span className="text-pink-500">📷</span>
                )}
                {student.linkedin && (
                  <span className="text-blue-500">💼</span>
                )}
                {student.github && (
                  <span className="text-gray-700 dark:text-gray-300">🐙</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {(!directory || directory.length === 0) && (
        <div className="text-center py-16">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Belum ada data mahasiswa
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Tambahkan data mahasiswa pertama untuk memulai direktori.
          </p>
        </div>
      )}
    </div>
  );
};

export default DirectoryManager;