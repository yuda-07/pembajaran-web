import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Filter, AlertCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import Modal from '../components/UI/Modal';

const Agenda: React.FC = () => {
  const { agenda, loading, errors } = useData();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Use agenda data instead of events
  const events = agenda || [];

  const categories = [
    { key: 'all', label: 'Semua' },
    { key: 'academic', label: 'Akademik' },
    { key: 'social', label: 'Sosial' },
    { key: 'competition', label: 'Kompetisi' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'from-blue-500 to-blue-600';
      case 'social': return 'from-green-500 to-green-600';
      case 'competition': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
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

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newMonth);
  };

  // Show loading state
  if (loading.agenda) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Memuat Agenda...
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
  if (errors.agenda) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Gagal Memuat Agenda
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {errors.agenda}
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
            Agenda Kegiatan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Jadwal dan rencana kegiatan kelas TRPL A yang akan datang
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center mr-4">
                <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
              </div>
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.key
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>

            {/* Events List */}
            {filteredEvents.length > 0 ? (
              <div className="space-y-4">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event._id || event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryColor(event.category || 'default')} text-white text-2xl`}>
                            {getCategoryIcon(event.category || 'default')}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getCategoryColor(event.category || 'default')} text-white`}>
                                {categories.find(c => c.key === event.category)?.label || 'Lainnya'}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(event.date || event.createdAt).toLocaleDateString('id-ID')}
                              </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {event.title}
                            </h3>
                            
                            <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                              {event.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{event.time || 'TBD'}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{event.location || 'TBD'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                              {new Date(event.date || event.createdAt).getDate()}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                              {new Date(event.date || event.createdAt).toLocaleDateString('id-ID', { month: 'short' })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {events.length === 0 ? 'Belum ada agenda' : 'Tidak ada agenda untuk kategori ini'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {events.length === 0 
                    ? 'Agenda kegiatan akan ditampilkan setelah admin menambahkan jadwal.'
                    : 'Belum ada kegiatan untuk kategori ini.'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mini Calendar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {currentMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex space-x-1">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {new Date().getDate()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Hari ini
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Statistik Agenda
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Agenda</span>
                  <span className="font-bold text-primary-600">{events.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Akademik</span>
                  <span className="font-bold text-blue-600">
                    {events.filter(e => e.category === 'academic').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Sosial</span>
                  <span className="font-bold text-green-600">
                    {events.filter(e => e.category === 'social').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Kompetisi</span>
                  <span className="font-bold text-purple-600">
                    {events.filter(e => e.category === 'competition').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Upcoming Event Highlight */}
            {events.length > 0 && (
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Agenda Terdekat</h3>
                <div className="text-sm opacity-90">
                  <p className="font-medium">{events[0].title}</p>
                  <p className="text-xs mt-1">
                    {new Date(events[0].date || events[0].createdAt).toLocaleDateString('id-ID')} • {events[0].time || 'TBD'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title}
        size="lg"
      >
        {selectedEvent && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r ${getCategoryColor(selectedEvent.category || 'default')} text-white`}>
                {categories.find(c => c.key === selectedEvent.category)?.label || 'Lainnya'}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(selectedEvent.date || selectedEvent.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Waktu</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedEvent.time || 'TBD'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Lokasi</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedEvent.location || 'TBD'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Agenda;