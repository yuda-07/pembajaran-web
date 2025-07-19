import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, AlertCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const InfoManager: React.FC = () => {
  const { info, loading, errors, createInfo, updateInfo, deleteInfo } = useData();
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'info' as 'exam' | 'event' | 'info'
  });

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({ title: '', description: '', category: 'info' });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category || 'info'
    });
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        await createInfo(formData);
        setIsAdding(false);
      } else if (editingItem) {
        await updateInfo(editingItem._id || editingItem.id, formData);
        setEditingItem(null);
      }
      setFormData({ title: '', description: '', category: 'info' });
    } catch (error) {
      console.error('Error saving info:', error);
      alert('Gagal menyimpan data');
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingItem(null);
    setFormData({ title: '', description: '', category: 'info' });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus informasi ini?')) {
      try {
        await deleteInfo(id);
      } catch (error) {
        console.error('Error deleting info:', error);
        alert('Gagal menghapus data');
      }
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'exam': return 'Ujian';
      case 'event': return 'Kegiatan';
      case 'info': return 'Informasi';
      default: return 'Lainnya';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'exam': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      case 'event': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'info': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  // Show loading state
  if (loading.info) {
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
  if (errors.info) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Gagal Memuat Data
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {errors.info}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Kelola Informasi Kelas
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tambah Informasi
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
            {isAdding ? 'Tambah Informasi Baru' : 'Edit Informasi'}
          </h3>
          
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
                placeholder="Masukkan judul informasi"
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
                <option value="info">Informasi</option>
                <option value="exam">Ujian</option>
                <option value="event">Kegiatan</option>
              </select>
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
                placeholder="Masukkan deskripsi informasi"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Simpan
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
        </motion.div>
      )}

      {/* Items List */}
      <div className="space-y-4">
        {info && info.map((item, index) => (
          <motion.div
            key={item._id || item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category || 'info')}`}>
                    {getCategoryLabel(item.category || 'info')}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(item.createdAt || item.date).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.description}
                </p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id || item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {(!info || info.length === 0) && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📢</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Belum ada informasi
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Tambahkan informasi pertama untuk memulai.
          </p>
        </div>
      )}
    </div>
  );
};

export default InfoManager;