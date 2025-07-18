import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, Image, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickInfo: React.FC = () => {
  const quickLinks = [
    {
      icon: Bell,
      title: 'Pengumuman Terbaru',
      description: 'Lihat info dan pengumuman terkini dari kelas',
      link: '/info',
      color: 'from-blue-500 to-blue-600',
      count: '3'
    },
    {
      icon: Image,
      title: 'Galeri Kegiatan',
      description: 'Dokumentasi foto dan video kegiatan kelas',
      link: '/gallery',
      color: 'from-purple-500 to-purple-600',
      count: '24'
    },
    {
      icon: Users,
      title: 'Direktori Mahasiswa',
      description: 'Profil lengkap mahasiswa TRPL A',
      link: '/directory',
      color: 'from-green-500 to-green-600',
      count: '30'
    },
    {
      icon: Calendar,
      title: 'Agenda Kegiatan',
      description: 'Jadwal dan rencana kegiatan mendatang',
      link: '/agenda',
      color: 'from-orange-500 to-orange-600',
      count: '5'
    }
  ];

  return (
    <section id="content" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Jelajahi Platform Kelas
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Akses semua informasi, dokumentasi, dan direktori mahasiswa dalam satu platform terintegrasi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickLinks.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={item.link} className="block">
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Count Badge */}
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center">
                    {item.count}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl mb-4`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Lihat selengkapnya →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickInfo;