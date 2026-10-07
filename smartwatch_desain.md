# DESAIN --- INCLUNOVA Smartwatch

## 1. Design Direction

### Tema

**"Tiny Smart Learning Companion"**

Smartwatch harus terasa seperti: - Teman belajar. - Lucu. - Friendly. -
Futuristic. - Interaktif. - Tidak seperti alat medis. - Tidak seperti
smartwatch olahraga biasa.

------------------------------------------------------------------------

## 2. Visual Language

Gunakan: - Rounded UI. - Big typography. - Large tap target. - Colorful
cards. - Friendly mascot. - Emoji/icon secukupnya. - Simple animation. -
Progress visualization.

Karena layar smartwatch kecil, jangan memasukkan terlalu banyak
informasi dalam satu layar.

------------------------------------------------------------------------

## 3. Color System

Primary: `#5B5FEF`

Learning Green: `#22C55E`

Happy Yellow: `#FACC15`

Sky: `#38BDF8`

Pink: `#FB7185`

Background: `#F8FAFC`

Text: `#172033`

------------------------------------------------------------------------

## 4. Navigation

Gunakan struktur sederhana:

``` text
HOME
 │
 ├── Notifications
 │
 ├── Learn
 │
 ├── Quiz
 │
 ├── Progress
 │
 └── Settings
```

Swipe navigation dapat digunakan sebagai pelengkap, tetapi tombol utama
harus tetap jelas.

------------------------------------------------------------------------

## 5. Home Screen

``` text
┌──────────────────┐
│ 08:24       🔋82%│
│                  │
│      🌈          │
│   Hai, Alya!     │
│                  │
│ 📚 2 materi baru │
│                  │
│   [ MULAI ]      │
│                  │
│ ❤️ 78 BPM        │
└──────────────────┘
```

Fokus: - Greeting. - Notification. - Quick learning action. - Basic
device status.

------------------------------------------------------------------------

## 6. Notification Screen

``` text
┌──────────────────┐
│ ← Notifikasi     │
│                  │
│ 📚 Materi Baru   │
│ Pecahan Dasar    │
│ Dari Bu Rina     │
│                  │
│ 🎮 Kuis Baru     │
│ 5 pertanyaan     │
│                  │
│ 🔔 PR Hari Ini   │
└──────────────────┘
```

Notification harus menggunakan: - Icon. - Short title. - Short
description. - Timestamp.

------------------------------------------------------------------------

## 7. Learning Screen

``` text
┌──────────────────┐
│ ← Pecahan        │
│                  │
│     2 / 5        │
│                  │
│  Pecahan adalah  │
│  bagian dari...  │
│                  │
│ 🔊 Dengarkan     │
│                  │
│ ━━━━━━━━━░░      │
│                  │
│      NEXT →      │
└──────────────────┘
```

------------------------------------------------------------------------

## 8. TTS

Button:

**🔊 Dengarkan**

Ketika aktif: - Icon berubah. - Haptic feedback pendek. - Progress audio
terlihat.

------------------------------------------------------------------------

## 9. STT

``` text
┌──────────────────┐
│ Jawab dengan suara│
│                  │
│       🎙️         │
│    Listening...  │
│                  │
│ "Pecahan..."     │
│                  │
│ [ SELESAI ]      │
└──────────────────┘
```

------------------------------------------------------------------------

## 10. Haptic

Haptic patterns:

-   Notification → 1 short vibration.
-   Correct answer → 2 light pulses.
-   Wrong answer → 1 longer pulse.
-   Important alert → repeated pattern.

Pattern harus sederhana dan konsisten.

------------------------------------------------------------------------

## 11. Quiz Screen

``` text
┌──────────────────┐
│ Quiz 2/5         │
│                  │
│ 2/5 dari 10      │
│                  │
│ Mana yang benar? │
│                  │
│ ┌──────────────┐ │
│ │ A. 1/2       │ │
│ ├──────────────┤ │
│ │ B. 2/3       │ │
│ ├──────────────┤ │
│ │ C. 3/4       │ │
│ └──────────────┘ │
└──────────────────┘
```

Setelah menjawab:

``` text
🎉 Benar!

+10 XP

[ LANJUT ]
```

XP/badge dapat digunakan sebagai gamification opsional.

------------------------------------------------------------------------

## 12. AI Recommendation

``` text
┌──────────────────┐
│ ✨ Untukmu       │
│                  │
│ Latihan Pecahan  │
│ Level: Easy      │
│                  │
│ 🔊 Audio         │
│ 👁 Visual        │
│                  │
│ [ MULAI ]        │
└──────────────────┘
```

AI harus terasa seperti teman belajar, bukan robot teknis.

------------------------------------------------------------------------

## 13. Progress

``` text
┌──────────────────┐
│ ← Progress       │
│                  │
│       82%        │
│    🌟 Hebat!     │
│                  │
│ 📚 Matematika 90%│
│ █████████░       │
│                  │
│ 🔬 IPA       75% │
│ ███████░░░       │
└──────────────────┘
```

------------------------------------------------------------------------

## 14. Offline Mode

Indikator:

**☁️ Synced**

atau

**📥 Offline Ready**

Jika tidak ada koneksi:

> "Materi tetap bisa dipelajari. Data akan disinkronkan nanti."

Jangan membuat offline state terasa seperti error.

------------------------------------------------------------------------

## 15. Sync Screen

``` text
┌──────────────────┐
│ Sinkronisasi     │
│                  │
│ ████████░░ 80%   │
│                  │
│ 4 materi          │
│ 2 kuis            │
│ 18 aktivitas      │
│                  │
│ ✓ Aman tersimpan  │
└──────────────────┘
```

------------------------------------------------------------------------

## 16. Home Learning

Menu:

-   📚 Materi.
-   📝 PR.
-   🎙️ Rekaman Guru.
-   🤖 AI Notes.
-   ⏰ Reminder.

------------------------------------------------------------------------

## 17. Teacher Voice

``` text
🎙️ Pesan dari Guru

"Jangan lupa latihan
pecahan halaman 12."

▶ Play
```

------------------------------------------------------------------------

## 18. Battery UI

``` text
🔋 Battery

Main Battery     24%
Backup Battery   87%

Status:
Using Main Battery

[ Info Energi ]
```

Saat automatic switching:

``` text
⚡ Main battery low

Backup battery activated.
Learning can continue.
```

Tidak perlu menampilkan detail teknis kepada siswa kecuali diperlukan.

------------------------------------------------------------------------

## 19. Child-Friendly Feedback

Gunakan microcopy: - "Mantap! 🎉" - "Coba lagi!" - "Sedikit lagi!" -
"Kamu hebat!" - "Yuk lanjut!" - "Materi baru sudah datang!"

Hindari: - "ERROR." - "FAILED." - "INVALID INPUT."

------------------------------------------------------------------------

## 20. Accessibility

-   Font besar.
-   High contrast.
-   Icon + text.
-   Haptic feedback.
-   TTS.
-   STT.
-   Jangan bergantung hanya pada warna.
-   Interaksi sederhana.
-   Tap target besar.

------------------------------------------------------------------------

## 21. Prototype Screens

Minimal prototype:

1.  Home.
2.  Notification.
3.  Learning Material.
4.  TTS.
5.  STT.
6.  Quiz.
7.  Quiz Result.
8.  AI Recommendation.
9.  Progress.
10. Offline Learning.
11. Sync.
12. Home Learning.
13. Teacher Voice.
14. Battery/Energy.

------------------------------------------------------------------------

## 22. Prototype Priority

### P0 --- Wajib

-   Home.
-   Notification.
-   Learning.
-   Quiz.
-   Result.
-   AI Recommendation.
-   Offline.
-   Sync.

### P1

-   TTS.
-   STT.
-   Haptic.
-   Progress.
-   Teacher Voice.

### P2

-   Energy detail.
-   Advanced gamification.
-   Additional personalization.
