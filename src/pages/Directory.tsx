import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, MapPin, Award, ExternalLink, AlertCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import Modal from '../components/UI/Modal';

const Directory: React.FC = () => {
  const { directory, loading, errors } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Use directory data instead of students
  const students = directory || [];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.nim && student.nim.includes(searchTerm)) ||
    (student.origin && student.origin.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Show loading state
  if (loading.directory) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Memuat Direktori...
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
  if (errors.directory) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Gagal Memuat Direktori
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {errors.directory}
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
            Direktori Mahasiswa
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Profil lengkap mahasiswa TRPL A dengan informasi kontak dan pencapaian
          </p>
        </motion.div>

        {/* Search and Stats */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari nama, NIM, atau asal daerah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary-600" />
                <span>Total: {students.length} mahasiswa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student, index) => (
            <motion.div
              key={student._id || student.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedStudent(student)}
            >
              {/* Photo */}
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={student.photo || 'https://via.placeholder.com/300x300?text=No+Photo'}
                    alt={student.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 right-3">
                    <button className="w-full py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg font-medium transition-colors">
                      📄 Lihat Profil
                    </button>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1">
                  {student.name}
                </h3>
                {student.position && (
                  <p className="text-primary-600 dark:text-primary-400 font-medium text-sm mb-2">
                    {student.position}
                  </p>
                )}
                {student.origin && (
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="line-clamp-1">{student.origin}</span>
                  </div>
                )}
                
                {/* Social Media Indicators */}
                <div className="flex items-center mt-2 space-x-2">
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
        {filteredStudents.length === 0 && (
          <div className="text-center py-16">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {students.length === 0 ? 'Belum ada mahasiswa' : 'Tidak ada hasil'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {students.length === 0 
                ? 'Data mahasiswa akan ditampilkan setelah admin menambahkan data.'
                : 'Coba ubah kata kunci pencarian Anda.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Student Profile Modal */}
      <Modal
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        size="lg"
      >
        {selectedStudent && (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <img
                  src={selectedStudent.photo || 'https://via.placeholder.com/300x300?text=No+Photo'}
                  alt={selectedStudent.name}
                  className="w-32 h-32 rounded-2xl object-cover shadow-lg"
                />
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedStudent.name}
                </h2>
                <div className="space-y-1 text-gray-600 dark:text-gray-300">
                  {selectedStudent.position && (
                    <p className="flex items-center justify-center sm:justify-start">
                      <span className="font-medium">Posisi:</span>
                      <span className="ml-2">{selectedStudent.position}</span>
                    </p>
                  )}
                  {selectedStudent.origin && (
                    <p className="flex items-center justify-center sm:justify-start">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{selectedStudent.origin}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            {selectedStudent.bio && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Tentang
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedStudent.bio}
                </p>
              </div>
            )}

            {/* Social Media */}
            {(selectedStudent.instagram || selectedStudent.linkedin || selectedStudent.github) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Sosial Media
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedStudent.instagram && (
                    <a
                      href={selectedStudent.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      <span className="mr-2">📷</span>
                      Instagram
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  )}
                  {selectedStudent.linkedin && (
                    <a
                      href={selectedStudent.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      <span className="mr-2">💼</span>
                      LinkedIn
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  )}
                  {selectedStudent.github && (
                    <a
                      href={selectedStudent.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      <span className="mr-2">🐙</span>
                      GitHub
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Directory;