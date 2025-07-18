import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, BookOpen, Award, Heart, Code2 } from 'lucide-react';

const About: React.FC = () => {
  const visionMission = [
    {
      icon: Target,
      title: 'Visi Kelas',
      content: 'Menjadi kelas yang unggul dalam bidang teknologi rekayasa perangkat lunak dengan menghasilkan lulusan yang kompeten, inovatif, dan berjiwa entrepreneur.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Heart,
      title: 'Misi Kelas',
      content: 'Membangun solidaritas dan kebersamaan, meningkatkan prestasi akademik dan non-akademik, serta berkontribusi positif untuk almamater dan masyarakat.',
      color: 'from-red-500 to-red-600'
    }
  ];

  const timelineEvents = [
    {
      year: '2022',
      title: 'Awal Perkuliahan',
      description: 'Mahasiswa TRPL A angkatan 2022 memulai perjalanan akademik di Politeknik Negeri Lampung',
      icon: '🎓'
    },
    {
      year: '2023',
      title: 'Makrab Pertama',
      description: 'Kegiatan malam keakraban pertama untuk mempererat tali persaudaraan antar mahasiswa',
      icon: '🏕️'
    },
    {
      year: '2023',
      title: 'Studi Banding',
      description: 'Kunjungan ke berbagai perusahaan teknologi untuk menambah wawasan industri',
      icon: '🏢'
    },
    {
      year: '2024',
      title: 'Prestasi Gemilang',
      description: 'Meraih berbagai prestasi di kompetisi nasional dan regional',
      icon: '🏆'
    },
    {
      year: '2024',
      title: 'Website Kelas',
      description: 'Peluncuran website resmi kelas sebagai platform digital terintegrasi',
      icon: '💻'
    }
  ];

  const classFacts = [
    { label: 'Total Mahasiswa', value: '30+', icon: Users },
    { label: 'Prestasi Diraih', value: '15+', icon: Award },
    { label: 'Kegiatan Terselenggara', value: '50+', icon: BookOpen },
    { label: 'Tahun Berdiri', value: '2022', icon: Code2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tentang Kelas TRPL A
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Mengenal lebih dekat profil, visi misi, dan perjalanan kelas Teknologi Rekayasa Perangkat Lunak A
          </p>
        </motion.div>

        {/* Hero Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl mb-6">
              <Code2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Teknologi Rekayasa Perangkat Lunak A
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Kelas TRPL A adalah bagian dari Program Studi Teknologi Rekayasa Perangkat Lunak di 
              Jurusan Teknologi Informasi, Politeknik Negeri Lampung. Kami adalah komunitas pembelajar 
              yang berdedikasi untuk mengembangkan keahlian di bidang pengembangan perangkat lunak, 
              dengan fokus pada inovasi, kolaborasi, dan excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
                Software Engineering
              </span>
              <span className="px-4 py-2 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-200 rounded-full text-sm font-medium">
                Web Development
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                Mobile Apps
              </span>
              <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
                Innovation
              </span>
            </div>
          </div>
        </motion.div>

        {/* Class Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {classFacts.map((fact, index) => (
            <div key={fact.label} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl mb-4">
                <fact.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {fact.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {fact.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {visionMission.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl mb-6`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Perjalanan Kelas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Timeline kegiatan dan pencapaian kelas TRPL A
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                      <div className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-2">
                        {event.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 rounded-full border-4 border-primary-500 shadow-lg">
                    <span className="text-2xl">{event.icon}</span>
                  </div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl shadow-xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Mari Berkenalan Lebih Dekat
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Tertarik untuk mengetahui lebih lanjut tentang kelas TRPL A? 
            Jangan ragu untuk menghubungi kami!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:trplA@polinela.ac.id"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              📧 trplA@polinela.ac.id
            </a>
            <a
              href="https://instagram.com/trplaclass"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              📷 @trplaclass
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;