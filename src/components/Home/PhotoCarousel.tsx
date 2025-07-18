import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Eye } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const PhotoCarousel: React.FC = () => {
  const { galleryItems } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isPlaying || galleryItems.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, galleryItems.length]);

  // Reset current index if it's out of bounds
  useEffect(() => {
    if (currentIndex >= galleryItems.length && galleryItems.length > 0) {
      setCurrentIndex(0);
    }
  }, [galleryItems.length, currentIndex]);

  const nextSlide = () => {
    if (galleryItems.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryItems.length);
    }
  };

  const prevSlide = () => {
    if (galleryItems.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'makrab': return 'from-orange-500 to-red-500';
      case 'graduation': return 'from-blue-500 to-purple-600';
      case 'social': return 'from-green-500 to-teal-500';
      case 'academic': return 'from-indigo-500 to-blue-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'makrab': return 'Makrab';
      case 'graduation': return 'Wisuda';
      case 'social': return 'Kegiatan Sosial';
      case 'academic': return 'Akademik';
      default: return 'Lainnya';
    }
  };

  // Show empty state if no gallery items
  if (galleryItems.length === 0) {
    return (
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Dokumentasi Kegiatan
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Momen-momen berharga dari berbagai kegiatan kelas TRPL A
            </p>
          </motion.div>

          <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl p-16 text-center">
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Belum Ada Dokumentasi
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Dokumentasi kegiatan akan ditampilkan di sini setelah admin mengunggah foto.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentItem = galleryItems[currentIndex];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Dokumentasi Kegiatan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Momen-momen berharga dari berbagai kegiatan kelas TRPL A
          </p>
        </motion.div>

        {/* Main Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Carousel Container */}
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={currentItem.imageUrl}
                  alt={currentItem.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="max-w-4xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="flex items-center space-x-3 mb-4"
                    >
                      <span className={`px-4 py-2 rounded-full text-white font-medium text-sm bg-gradient-to-r ${getCategoryColor(currentItem.category)}`}>
                        {getCategoryLabel(currentItem.category)}
                      </span>
                      <span className="text-white/80 text-sm">
                        {new Date(currentItem.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </motion.div>
                    
                    <motion.h3
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-2xl md:text-4xl font-bold text-white mb-3"
                    >
                      {currentItem.title}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="text-white/90 text-lg max-w-2xl leading-relaxed"
                    >
                      {currentItem.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="absolute top-4 right-4 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-300 hover:scale-110"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>

            {/* View Counter */}
            <div className="absolute top-4 left-4 flex items-center space-x-2 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
              <Eye className="h-4 w-4" />
              <span>{currentIndex + 1} / {galleryItems.length}</span>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-8 space-x-3 overflow-x-auto pb-4">
            {galleryItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? 'ring-4 ring-primary-500 scale-110'
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Active Indicator */}
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-primary-500/20" />
                )}
                
                {/* Hover Tooltip */}
                <AnimatePresence>
                  {hoveredIndex === index && index !== currentIndex && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10"
                    >
                      {item.title}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative"
              >
                <div className={`w-12 h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-600'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`} />
                
                {/* Auto-play Progress */}
                {index === currentIndex && isPlaying && (
                  <motion.div
                    className="absolute top-0 left-0 h-1 bg-primary-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4, ease: "linear" }}
                    key={currentIndex}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Auto-play Status */}
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span>
                {isPlaying ? 'Auto-play aktif • Berganti setiap 4 detik' : 'Auto-play dijeda'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/gallery"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-full hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            📷 Lihat Semua Galeri
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PhotoCarousel;