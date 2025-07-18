export interface Student {
  id: string;
  name: string;
  nim: string;
  photo: string;
  origin: string;
  bio: string;
  achievements: string[];
  socialMedia: {
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  isActive: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'exam' | 'event' | 'info';
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'makrab' | 'graduation' | 'social' | 'academic';
  date: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'academic' | 'social' | 'competition';
}

export const students: Student[] = [
  {
    id: '1',
    name: 'Rizky Ramadhan',
    nim: '2104010001',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    origin: 'Bandar Lampung',
    bio: 'Passionate full-stack developer with expertise in React and Node.js. Always eager to learn new technologies.',
    achievements: [
      'Juara 2 UI/UX Competition Nasional 2024',
      'Finalis Hackathon BUMN 2024',
      'Best Student Award 2023'
    ],
    socialMedia: {
      instagram: 'https://instagram.com/rizkyramadhan',
      linkedin: 'https://linkedin.com/in/rizkyramadhan',
      github: 'https://github.com/rizkyramadhan'
    },
    isActive: true
  },
  {
    id: '2',
    name: 'Sari Indah Putri',
    nim: '2104010002',
    photo: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=300',
    origin: 'Metro',
    bio: 'Mobile app developer specializing in Flutter and React Native. Love creating user-friendly applications.',
    achievements: [
      'Winner Mobile App Competition 2024',
      'Google Developer Challenge Participant',
      'Outstanding Academic Performance'
    ],
    socialMedia: {
      instagram: 'https://instagram.com/sariindah',
      linkedin: 'https://linkedin.com/in/sariindah'
    },
    isActive: true
  },
  {
    id: '3',
    name: 'Ahmad Fauzi',
    nim: '2104010003',
    photo: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=300',
    origin: 'Pringsewu',
    bio: 'Backend developer with strong knowledge in database design and API development.',
    achievements: [
      'Database Design Competition Winner',
      'Scholarship Recipient 2023-2024',
      'Active in Student Organization'
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/ahmadfauzi',
      github: 'https://github.com/ahmadfauzi'
    },
    isActive: true
  },
  {
    id: '4',
    name: 'Maya Sari',
    nim: '2104010004',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    origin: 'Lampung Tengah',
    bio: 'UI/UX Designer passionate about creating beautiful and intuitive user experiences.',
    achievements: [
      'Best Design Portfolio 2024',
      'Adobe Creative Jam Winner',
      'Design Thinking Workshop Leader'
    ],
    socialMedia: {
      instagram: 'https://instagram.com/mayasari',
      linkedin: 'https://linkedin.com/in/mayasari'
    },
    isActive: true
  }
];

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Ujian Akhir Semester Dimulai 15 Juli',
    content: 'Pelaksanaan UAS akan dimulai pada tanggal 15 Juli dengan protokol kesehatan yang ketat. Pastikan membawa KTM dan alat tulis.',
    date: '2024-07-10',
    category: 'exam'
  },
  {
    id: '2',
    title: 'Kunjungan Industri ke PT. Telkom Indonesia',
    content: 'Kunjungan industri akan dilaksanakan pada tanggal 20 Juli. Biaya transportasi ditanggung program studi.',
    date: '2024-07-08',
    category: 'event'
  },
  {
    id: '3',
    title: 'Seminar Teknologi Web Modern',
    content: 'Menghadirkan speaker dari industri untuk membahas tren teknologi web terkini dan peluang karir.',
    date: '2024-07-05',
    category: 'info'
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Makrab TRPL A 2024',
    description: 'Kegiatan malam keakraban di Pantai Klara, mempererat tali persaudaraan antar mahasiswa.',
    imageUrl: 'https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'makrab',
    date: '2024-03-15'
  },
  {
    id: '2',
    title: 'Wisuda Sarjana Terapan 2024',
    description: 'Momen kebanggaan wisuda mahasiswa TRPL A angkatan 2021.',
    imageUrl: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'graduation',
    date: '2024-05-20'
  },
  {
    id: '3',
    title: 'Kegiatan Sosial Bakti Sosial',
    description: 'Kegiatan bakti sosial di Panti Asuhan Sinar Harapan.',
    imageUrl: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'social',
    date: '2024-04-10'
  },
  {
    id: '4',
    title: 'Presentasi Tugas Akhir',
    description: 'Sesi presentasi dan ujian tugas akhir mahasiswa semester 6.',
    imageUrl: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'academic',
    date: '2024-06-15'
  }
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Seminar Teknologi Web',
    description: 'Seminar dari alumni TRPL tentang perkembangan teknologi web dan peluang karir di industri IT.',
    date: '2024-07-10',
    time: '10:00 - 12:00',
    location: 'Zoom Meeting',
    category: 'academic'
  },
  {
    id: '2',
    title: 'Ujian Akhir Semester',
    description: 'Pelaksanaan ujian akhir semester genap 2023/2024 untuk semua mata kuliah.',
    date: '2024-07-15',
    time: '08:00 - 17:00',
    location: 'Ruang Ujian Gedung B',
    category: 'academic'
  },
  {
    id: '3',
    title: 'Kunjungan Industri',
    description: 'Kunjungan ke PT. Telkom Indonesia untuk melihat implementasi teknologi di dunia kerja.',
    date: '2024-07-20',
    time: '08:00 - 16:00',
    location: 'PT. Telkom Indonesia',
    category: 'academic'
  }
];