import { NotificationItem, QuizQuestion, LearningLesson } from '@/types/smartwatch';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Materi Baru: Pecahan Dasar',
    sender: 'Bu Rina (Guru Matematika)',
    category: 'materi',
    time: '08:15',
    read: false,
    actionScreen: 'learn',
  },
  {
    id: 'notif-2',
    title: 'Kuis Ceria: Tebak Pecahan',
    sender: 'AI Adaptive Engine',
    category: 'kuis',
    time: '08:20',
    read: false,
    actionScreen: 'quiz',
  },
  {
    id: 'notif-3',
    title: 'Pesan Suara Baru',
    sender: 'Bu Rina',
    category: 'voice',
    time: '07:50',
    read: false,
    actionScreen: 'teacher-voice',
  },
  {
    id: 'notif-4',
    title: 'PR Hari Ini: Halaman 12',
    sender: 'Sistem Sekolah',
    category: 'pr',
    time: '07:30',
    read: true,
    actionScreen: 'learn',
  },
];

export const LESSONS: LearningLesson[] = [
  {
    id: 1,
    title: 'Pecahan Dasar',
    subtitle: 'Mengenal Satu per Dua (1/2)',
    step: 1,
    totalSteps: 4,
    content: 'Bayangkan sebuah kue utuh yang dibagi menjadi 2 potong sama besar. 1 potong dinamakan 1/2 (setengah)!',
    visualType: 'fraction-bar',
    visualData: { numerator: 1, denominator: 2 },
    audioScript: 'Halo Alya! Bayangkan sebuah kue utuh dibagi menjadi 2 potong sama besar. Satu potong bernilai satu per dua atau setengah.',
  },
  {
    id: 2,
    title: 'Pecahan Dasar',
    subtitle: 'Mengenal Satu per Empat (1/4)',
    step: 2,
    totalSteps: 4,
    content: 'Jika kuenya dibagi untuk 4 orang teman sama banyak, tiap anak dapat 1 bagian dari 4, yaitu 1/4 (seperempat)!',
    visualType: 'fraction-pizza',
    visualData: { numerator: 1, denominator: 4 },
    audioScript: 'Jika kuenya dibagi untuk 4 orang teman sama banyak, tiap anak mendapatkan satu bagian dari empat, yaitu satu per empat.',
  },
  {
    id: 3,
    title: 'Pecahan Dasar',
    subtitle: 'Dua per Empat (2/4 = 1/2)',
    step: 3,
    totalSteps: 4,
    content: 'Kalau Alya mengambil 2 potong dari 4 potong, jumlahnya sama besarnya dengan setengah kue utuh!',
    visualType: 'fraction-pizza',
    visualData: { numerator: 2, denominator: 4 },
    audioScript: 'Kalau Alya mengambil dua potong dari empat potong, ternyata besarnya sama dengan setengah kue utuh!',
  },
  {
    id: 4,
    title: 'Pecahan Dasar',
    subtitle: 'Dua per Lima (2/5)',
    step: 4,
    totalSteps: 4,
    content: 'Ada 5 kotak pensil warna. 2 kotak warna biru. Maka bagian warna biru adalah 2 dari 5 kotak, atau 2/5!',
    visualType: 'fraction-bar',
    visualData: { numerator: 2, denominator: 5 },
    audioScript: 'Ada lima kotak pensil warna. Dua kotak berwarna biru. Maka bagian warna biru adalah dua per lima.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Jika 1 pizza dipotong 4 bagian sama rata, dan kamu makan 1 potong, berapa bagian yang kamu makan?',
    options: [
      { id: 'A', text: '1/2', isCorrect: false },
      { id: 'B', text: '1/4', isCorrect: true },
      { id: 'C', text: '3/4', isCorrect: false },
    ],
    hint: 'Kamu memakan 1 bagian dari total 4 potongan.',
    explanation: 'Hebat! 1 potong dari 4 potong adalah 1/4.',
  },
  {
    id: 2,
    question: 'Berapa 2/5 dari 10 butir kelereng?',
    context: 'Tips: 10 dibagi 5 sama dengan 2. Lalu dikalikan 2.',
    options: [
      { id: 'A', text: '4 butir', isCorrect: true },
      { id: 'B', text: '2 butir', isCorrect: false },
      { id: 'C', text: '5 butir', isCorrect: false },
    ],
    hint: '10 dibagi 5 = 2. Kemudian 2 x 2 = ?',
    explanation: 'Luar biasa! 10 dibagi 5 adalah 2, lalu dikali 2 adalah 4 butir kelereng.',
  },
  {
    id: 3,
    question: 'Manakah pecahan yang nilainya sama dengan 1/2 (setengah)?',
    options: [
      { id: 'A', text: '2/4', isCorrect: true },
      { id: 'B', text: '1/3', isCorrect: false },
      { id: 'C', text: '3/5', isCorrect: false },
    ],
    hint: 'Dua potong dari empat potong sama dengan setengah.',
    explanation: 'Tepat sekali! 2/4 itu senilai dengan 1/2.',
  },
];

export const TEACHER_VOICE_MESSAGE = {
  sender: 'Bu Rina',
  role: 'Wali Kelas 3A - SD Inklusi Ceria',
  date: 'Hari ini, 07:50 WIB',
  duration: '0:14',
  text: 'Halo Alya! Hebat sekali kamu sudah aktif belajar pagi ini. Jangan lupa selesaikan latihan pecahan di smartwatch kamu ya! Kalau ada kesulitan, tekan tombol suara untuk bertanya. Semangat!',
};
