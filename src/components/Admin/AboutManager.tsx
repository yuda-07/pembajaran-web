import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Edit, BookOpen } from 'lucide-react';

const AboutManager: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutData, setAboutData] = useState({
    description: 'Kelas TRPL A adalah bagian dari Program Studi Teknologi Rekayasa Perangkat Lunak di Jurusan Teknologi Informasi, Politeknik Negeri Lampung. Kami adalah komunitas pembelajar yang berdedikasi untuk mengembangkan keahlian di bidang pengembangan perangkat lunak, dengan fokus pada inovasi, kolaborasi, dan excellence.',
    vision: 'Menjadi kelas yang unggul dalam bidang teknologi rekayasa perangkat lunak dengan menghasilkan lulusan yang kompeten, inovatif, dan berjiwa entrepreneur.',
    mission: 'Membangun solidaritas dan kebersamaan, meningkatkan prestasi akademik dan non-akademik, serta berkontribusi positif untuk almamater dan masyarakat.',
    contact: {
      email: 'trplA@polinela.ac.id',
      instagram: '@trplaclass',
      address: 'Politeknik Negeri Lampung\nJl. Soekarno Hatta No.10, Bandar Lampung'
    },
    stats: {
      totalStudents: '30+',
      achievements: '15+',
      activities: '50+',
      establishedYear: '2022'
    }
  });

  const handleSave = () => {
    // Here you would typically save to a backend
    setIsEditing(false);
    alert('Data berhasil disimpan!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Kelola Halaman Tentang
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Konten
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              Simpan
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Batal
            </button>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center mb-4">
            <BookOpen className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Deskripsi Kelas
            </h3>
          </div>
          
          {isEditing ? (
            <textarea
              value={aboutData.description}
              onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {aboutData.description}
            </p>
          )}
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Visi Kelas
            </h3>
            
            {isEditing ? (
              <textarea
                value={aboutData.vision}
                onChange={(e) => setAboutData({ ...aboutData, vision: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {aboutData.vision}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Misi Kelas
            </h3>
            
            {isEditing ? (
              <textarea
                value={aboutData.mission}
                onChange={(e) => setAboutData({ ...aboutData, mission: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {aboutData.mission}
              </p>
            )}
          </motion.div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Statistik Kelas
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Total Mahasiswa
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={aboutData.stats.totalStudents}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    stats: { ...aboutData.stats, totalStudents: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <div className="text-2xl font-bold text-primary-600">
                  {aboutData.stats.totalStudents}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prestasi Diraih
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={aboutData.stats.achievements}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    stats: { ...aboutData.stats, achievements: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <div className="text-2xl font-bold text-primary-600">
                  {aboutData.stats.achievements}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kegiatan Terselenggara
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={aboutData.stats.activities}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    stats: { ...aboutData.stats, activities: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <div className="text-2xl font-bold text-primary-600">
                  {aboutData.stats.activities}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tahun Berdiri
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={aboutData.stats.establishedYear}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    stats: { ...aboutData.stats, establishedYear: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <div className="text-2xl font-bold text-primary-600">
                  {aboutData.stats.establishedYear}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Informasi Kontak
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={aboutData.contact.email}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    contact: { ...aboutData.contact, email: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  {aboutData.contact.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Instagram
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={aboutData.contact.instagram}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    contact: { ...aboutData.contact, instagram: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  {aboutData.contact.instagram}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Alamat
              </label>
              {isEditing ? (
                <textarea
                  value={aboutData.contact.address}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    contact: { ...aboutData.contact, address: e.target.value }
                  })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {aboutData.contact.address}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutManager;