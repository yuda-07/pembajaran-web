import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, ChevronRight, AlertCircle, BookOpen, Trophy } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import Modal from '../components/UI/Modal';

const Info: React.FC = () => {
  const { info, loading, errors } = useData();
  const [selectedInfo, setSelectedInfo] = useState<any>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'exam': return AlertCircle;
      case 'event': return Calendar;
      case 'info': return BookOpen;
      default: return Bell;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'exam': return 'from-red-500 to-red-600';
      case 'event': return 'from-blue-500 to-blue-600';
      case 'info': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
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

  // Show loading state
  if (loading.info) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Memuat Informasi...
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Sedang mengambil data dari server.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (errors.info) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Gagal Memuat Data
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {errors.info}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Informasi Kelas
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dapatkan informasi terbaru tentang pengumuman, jadwal, dan kegiatan kelas TRPL A
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <Bell className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Informasi Terbaru
                </h2>
              </div>

              {info && info.length > 0 ? (
                <div className="space-y-4">
                  {info.map((item, index) => {
                    const IconComponent = getCategoryIcon(item.category || 'info');
                    return (
                      <motion.div
                        key={item._id || item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedInfo(item)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(item.category || 'info')}`}>
                              <IconComponent className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getCategoryColor(item.category || 'info')} text-white`}>
                                  {getCategoryLabel(item.category || 'info')}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(item.createdAt || item.date).toLocaleDateString('id-ID')}
                                </span>
                              </div>
                              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {item.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Belum ada informasi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Informasi terbaru akan ditampilkan di sini.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Statistik Cepat
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Informasi</span>
                  <span className="font-bold text-primary-600">{info ? info.length : 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Informasi Ujian</span>
                  <span className="font-bold text-red-600">
                    {info ? info.filter(i => i.category === 'exam').length : 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Info Kegiatan</span>
                  <span className="font-bold text-blue-600">
                    {info ? info.filter(i => i.category === 'event').length : 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Calendar Widget */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-primary-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Kalender
                </h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {new Date().getDate()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {new Date().toLocaleDateString('id-ID', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </div>
              </div>
            </div>

            {/* Achievement Highlight */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
              <div className="flex items-center mb-2">
                <Trophy className="h-6 w-6 mr-2" />
                <h3 className="text-lg font-bold">Prestasi Terbaru</h3>
              </div>
              <p className="text-sm opacity-90">
                Rizky Ramadhan meraih Juara 2 UI/UX Competition Nasional 2024
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Detail Modal */}
      <Modal
        isOpen={!!selectedInfo}
        onClose={() => setSelectedInfo(null)}
        title={selectedInfo?.title}
        size="lg"
      >
        {selectedInfo && (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r ${getCategoryColor(selectedInfo.category || 'info')} text-white`}>
                {getCategoryLabel(selectedInfo.category || 'info')}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(selectedInfo.createdAt || selectedInfo.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedInfo.description}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Info;