import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Image, Calendar, Bell, TrendingUp, Activity, Upload, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const Dashboard: React.FC = () => {
  const { directory, info, gallery, agenda, loading, errors } = useData();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use new data structure
  const students = directory || [];
  const announcements = info || [];
  const galleryItems = gallery || [];
  const events = agenda || [];

  useEffect(() => {
    if (galleryItems.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [galleryItems.length]);

  const stats = [
    {
      title: 'Total Mahasiswa',
      value: students.length,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: '+2 bulan ini'
    },
    {
      title: 'Informasi Aktif',
      value: announcements.length,
      icon: Bell,
      color: 'from-green-500 to-green-600',
      change: '+1 minggu ini'
    },
    {
      title: 'Media Galeri',
      value: galleryItems.length,
      icon: Image,
      color: 'from-purple-500 to-purple-600',
      change: '+5 bulan ini'
    },
    {
      title: 'Agenda Mendatang',
      value: events.length,
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
      change: '+2 minggu ini'
    }
  ];

  const recentActivities = [
    { action: 'Menambahkan mahasiswa baru', item: 'Maya Sari', time: '2 jam lalu', type: 'add' },
    { action: 'Mengupload foto galeri', item: 'Foto Makrab 2024', time: '5 jam lalu', type: 'update' },
    { action: 'Membuat informasi', item: 'Ujian Akhir Semester', time: '1 hari lalu', type: 'add' },
    { action: 'Mengedit agenda', item: 'Seminar Teknologi Web', time: '2 hari lalu', type: 'update' },
    { action: 'Menghapus media lama', item: 'Foto kegiatan lama', time: '3 hari lalu', type: 'delete' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'add': return '➕';
      case 'update': return '✏️';
      case 'delete': return '🗑️';
      default: return '📝';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'add': return 'text-green-600';
      case 'update': return 'text-blue-600';
      case 'delete': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const nextImage = () => {
    if (galleryItems.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryItems.length);
    }
  };

  const prevImage = () => {
    if (galleryItems.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  // Show loading state
  if (loading.info || loading.gallery || loading.directory || loading.agenda) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Memuat Dashboard...
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Sedang mengambil data dari server.
        </p>
      </div>
    );
  }

  // Show error state
  if (errors.info || errors.gallery || errors.directory || errors.agenda) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Gagal Memuat Dashboard
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Terjadi kesalahan saat memuat data.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard Admin
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Selamat datang kembali! Berikut ringkasan aktivitas website TRPL A.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Moving Photo Gallery Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Image className="h-6 w-6 text-primary-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Dokumentasi Kegiatan Terbaru
            </h3>
          </div>
          {galleryItems.length > 0 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={prevImage}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={nextImage}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          )}
        </div>
        
        {galleryItems.length > 0 ? (
          <>
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-xl">
              <motion.div
                className="flex"
                animate={{
                  x: `-${currentImageIndex * 100}%`
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                style={{ width: `${galleryItems.length * 100}%` }}
              >
                {galleryItems.map((item, index) => (
                  <div
                    key={item._id || item.id}
                    className="relative w-full h-64 flex-shrink-0"
                    style={{ width: `${100 / galleryItems.length}%` }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                            {(item.category || 'academic').charAt(0).toUpperCase() + (item.category || 'academic').slice(1)}
                          </span>
                          <span className="text-xs text-gray-200">
                            {new Date(item.createdAt || item.date).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                        <h4 className="font-bold text-lg mb-1 line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-200 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-primary-600/0 hover:bg-primary-600/10 transition-colors duration-300" />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Photo Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {galleryItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-primary-600 scale-110'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            {/* Auto-play indicator */}
            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Auto-play aktif • Berganti setiap 3 detik</span>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Belum ada dokumentasi
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Upload foto kegiatan pertama untuk melihat carousel di sini.
            </p>
          </div>
        )}
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center mb-6">
          <Activity className="h-6 w-6 text-primary-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Aktivitas Terbaru
          </h3>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="text-2xl">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.item} • {activity.time}
                </p>
              </div>
              <div className={`text-xs font-medium ${getActivityColor(activity.type)}`}>
                {activity.type.toUpperCase()}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;