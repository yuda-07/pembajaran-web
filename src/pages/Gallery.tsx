import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import Modal from '../components/UI/Modal';

const Gallery: React.FC = () => {
  const { gallery, loading, errors } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use gallery data instead of galleryItems
  const galleryItems = gallery || [];

  const categories = [
    { key: 'all', label: 'Semua' },
    { key: 'makrab', label: 'Makrab' },
    { key: 'graduation', label: 'Wisuda' },
    { key: 'social', label: 'Kegiatan Sosial' },
    { key: 'academic', label: 'Akademik' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (item: any, index: number) => {
    setSelectedImage(item);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + filteredItems.length) % filteredItems.length
      : (currentIndex + 1) % filteredItems.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  // Show loading state
  if (loading.gallery) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Memuat Galeri...
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
  if (errors.gallery) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Gagal Memuat Galeri
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {errors.gallery}
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
            Galeri Kegiatan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dokumentasi foto dan video dari berbagai kegiatan kelas TRPL A
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item._id || item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(item, index)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="aspect-square">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold mb-1 text-sm line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-200">
                      {new Date(item.createdAt || item.date).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  
                  {/* View Icon */}
                  <div className="absolute top-4 right-4">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                      <ImageIcon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                    {categories.find(c => c.key === item.category)?.label || 'Lainnya'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Belum ada media
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {selectedCategory === 'all' 
                ? 'Belum ada foto atau video yang diupload.'
                : 'Belum ada foto atau video untuk kategori ini.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!selectedImage}
        onClose={closeLightbox}
        size="xl"
      >
        {selectedImage && (
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-2 -right-2 z-10 p-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Navigation Buttons */}
            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="relative">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                  {categories.find(c => c.key === selectedImage.category)?.label || 'Lainnya'}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(selectedImage.createdAt || selectedImage.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedImage.description}
              </p>
              
              {/* Image Counter */}
              {filteredItems.length > 1 && (
                <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  {currentIndex + 1} dari {filteredItems.length}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Gallery;