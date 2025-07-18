import React from 'react';
import { Mail, Instagram, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">TRPL A</h3>
            <p className="text-gray-400 mb-4">
              Website resmi kelas Teknologi Rekayasa Perangkat Lunak A - 
              Politeknik Negeri Lampung. Platform digital untuk dokumentasi, 
              komunikasi, dan pengelolaan data mahasiswa.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/trplaclass" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="mailto:trplA@polinela.ac.id" 
                className="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="/info" className="hover:text-white transition-colors">Informasi</a></li>
              <li><a href="/gallery" className="hover:text-white transition-colors">Galeri</a></li>
              <li><a href="/directory" className="hover:text-white transition-colors">Direktori Mahasiswa</a></li>
              <li><a href="/agenda" className="hover:text-white transition-colors">Agenda Kegiatan</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">Tentang Kelas</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Kontak</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-500" />
                <span>trplA@polinela.ac.id</span>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="h-5 w-5 text-primary-500" />
                <span>@trplaclass</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-500" />
                <span>Politeknik Negeri Lampung<br />Jl. Soekarno Hatta No.10, Bandar Lampung</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 TRPL A - Politeknik Negeri Lampung. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Dibuat dengan ❤️ oleh mahasiswa TRPL A untuk kemajuan kelas
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;