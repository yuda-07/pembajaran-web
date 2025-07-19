import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { uploadToCloudinary, validateImageFile } from '../../services/cloudinary';

const GalleryManager: React.FC = () => {
  const { gallery, loading, errors, createGallery, updateGallery, deleteGallery } = useData();
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    imageFile: null as File | null,
    category: 'academic' as 'makrab' | 'graduation' | 'social' | 'academic'
  });
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    { key: 'academic', label: 'Akademik' },
    { key: 'makrab', label: 'Makrab' },
    { key: 'graduation', label: 'Wisuda' },
    { key: 'social', label: 'Kegiatan Sosial' }
  ];

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({ 
      title: '', 
      description: '', 
      imageUrl: '', 
      imageFile: null,
      category: 'academic' 
    });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      imageFile: null,
      category: item.category || 'academic'
    });
  };

  const handleFileSelect = (file: File) => {
    try {
      validateImageFile(file);
      setFormData({ ...formData, imageFile: file, imageUrl: '' });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, imageUrl: e.target?.result as string }));
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
      let finalImageUrl = formData.imageUrl;

      // Upload to Cloudinary if there's a file
      if (formData.imageFile) {
        setUploadProgress(0);
        finalImageUrl = await uploadToCloudinary(formData.imageFile);
        setUploadProgress(100);
      }

      const itemData = {
        title: formData.title,
        description: formData.description,
        imageUrl: finalImageUrl,
        category: formData.category
      };

      if (isAdding) {
        await createGallery(itemData);
        setIsAdding(false);
      } else if (editingItem) {
        await updateGallery(editingItem._id || editingItem.id, itemData);
        setEditingItem(null);
      }
      
      setFormData({ 
        title: '', 
        description: '', 
        imageUrl: '', 
        imageFile: null,
        category: 'academic' 
      });
      setUploadProgress(0);
    } catch (error) {
      console.error('Error saving gallery item:', error);
      alert('Gagal menyimpan data');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingItem(null);
    setFormData({ 
      title: '', 
      description: '', 
      imageUrl: '', 
      imageFile: null,
      category: 'academic' 
    });
    setUploadProgress(0);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus item galeri ini?')) {
      try {
        await deleteGallery(id);
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        alert('Gagal menghapus data');
      }
    }
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.key === category)?.label || category;
  };

  // Show loading state
  if (loading.gallery) {
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
  if (errors.gallery) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Gagal Memuat Data
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {errors.gallery}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Kelola Galeri
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tambah Media
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
            {isAdding ? 'Tambah Media Baru' : 'Edit Media'}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Judul
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  placeholder="Masukkan judul media"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                >
                  {categories.map(cat => (
                    <option key={cat.key} value={cat.key}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL Gambar (Opsional)
                </label>
                <input
                  type="url"
                  value={formData.imageFile ? '' : formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value, imageFile: null })}
                  disabled={!!formData.imageFile}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  placeholder="Masukkan deskripsi media"
                />
              </div>
            </div>

            <div className="space-y-4">
              {/* File Upload Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Gambar
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
                  
                  {formData.imageUrl ? (
                    <div className="space-y-4">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg mx-auto"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, imageUrl: '', imageFile: null })}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Hapus Gambar
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Drag & drop gambar di sini, atau <span className="text-primary-600">klik untuk memilih</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          PNG, JPG, GIF hingga 5MB
                        </p>
                      </div>
                    </div>
                  )}
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
                  disabled={isUploading || !formData.title || !formData.imageUrl}
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

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery && gallery.map((item, index) => (
          <motion.div
            key={item._id || item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2">
                <span className="px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                  {getCategoryLabel(item.category || 'academic')}
                </span>
              </div>
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1 bg-white/80 hover:bg-white text-gray-700 rounded transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id || item.id)}
                  className="p-1 bg-white/80 hover:bg-white text-red-600 rounded transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                {item.description}
              </p>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {new Date(item.createdAt || item.date).toLocaleDateString('id-ID')}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {(!gallery || gallery.length === 0) && (
        <div className="text-center py-16">
          <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Belum ada media
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Tambahkan media pertama untuk memulai galeri.
          </p>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;