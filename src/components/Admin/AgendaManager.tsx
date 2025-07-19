import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const AgendaManager: React.FC = () => {
  const { agenda, loading, errors, createAgenda, updateAgenda, deleteAgenda } = useData();
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'academic' as 'academic' | 'social' | 'competition'
  });

  const categories = [
    { key: 'academic', label: 'Akademik' },
    { key: 'social', label: 'Sosial' },
    { key: 'competition', label: 'Kompetisi' }
  ];

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'academic'
    });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      date: item.date || new Date(item.createdAt).toISOString().split('T')[0],
      time: item.time || '',
      location: item.location || '',
      category: item.category || 'academic'
    });
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        await createAgenda(formData);
        setIsAdding(false);
      } else if (editingItem) {
        await updateAgenda(editingItem._id || editingItem.id, formData);
        setEditingItem(null);
      }
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: 'academic'
      });
    } catch (error) {
      console.error('Error saving agenda:', error);
      alert('Gagal menyimpan data');
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'academic'
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus agenda ini?')) {
      try {
        await deleteAgenda(id);
      } catch (error) {
        console.error('Error deleting agenda:', error);
        alert('Gagal menghapus data');
      }
    }
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.key === category)?.label || category;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'social': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'competition': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return '📚';
      case 'social': return '🤝';
      case 'competition': return '🏆';
      default: return '📅';
    }
  };

  // Show loading state
  if (loading.agenda) {
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
  if (errors.agenda) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Gagal Memuat Data
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {errors.agenda}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Kelola Agenda Kegiatan
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tambah Agenda
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
            {isAdding ? 'Tambah Agenda Baru' : 'Edit Agenda'}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Judul Kegiatan
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  placeholder="Masukkan judul kegiatan"
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Waktu
                  </label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    placeholder="08:00 - 12:00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Lokasi
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  placeholder="Masukkan lokasi kegiatan"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deskripsi
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                placeholder="Masukkan deskripsi kegiatan"
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleSave}
              disabled={!formData.title || !formData.date}
              className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
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
        </motion.div>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {agenda && agenda.map((item, index) => (
          <motion.div
            key={item._id || item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="text-3xl">
                  {getCategoryIcon(item.category || 'academic')}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category || 'academic')}`}>
                      {getCategoryLabel(item.category || 'academic')}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(item.date || item.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    {item.time && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{item.time}</span>
                      </div>
                    )}
                    {item.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>
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
      {(!agenda || agenda.length === 0) && (
        <div className="text-center py-16">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Belum ada agenda
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Tambahkan agenda pertama untuk memulai.
          </p>
        </div>
      )}
    </div>
  );
};

export default AgendaManager;