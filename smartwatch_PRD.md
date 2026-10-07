# PRD --- INCLUNOVA Smartwatch

## 1. Ringkasan Produk

INCLUNOVA Smartwatch adalah perangkat wearable utama dalam ekosistem
INCLUNOVA dan menjadi antarmuka pembelajaran personal bagi siswa.

Smartwatch bukan sekadar perangkat notifikasi. Perangkat ini menjadi
titik interaksi siswa dengan: - Materi pembelajaran. - Kuis. - AI
Adaptive Learning. - TTS. - STT. - Haptic feedback. - Monitoring
aktivitas. - Sinkronisasi data. - Offline learning.

------------------------------------------------------------------------

## 2. Tujuan Produk

-   Membawa pembelajaran langsung ke perangkat yang digunakan siswa.
-   Mendukung kebutuhan pembelajaran inklusif.
-   Menyediakan interaksi multimodal.
-   Mengumpulkan data pembelajaran untuk adaptive learning.
-   Menjaga materi tetap dapat digunakan ketika offline.
-   Menjadi penghubung antara siswa dan ekosistem sekolah.

------------------------------------------------------------------------

## 3. Target User

Siswa sekolah yang menggunakan INCLUNOVA dalam aktivitas belajar di
sekolah maupun di rumah.

------------------------------------------------------------------------

## 4. Core Features

### 4.1 Smart Notification

-   Materi baru.
-   Tugas.
-   Kuis.
-   Pengingat.
-   Update pembelajaran.

### 4.2 Learning Materials

-   Teks.
-   Audio.
-   Video/visual sesuai kemampuan perangkat/prototipe.
-   Materi dari guru.
-   Materi rekomendasi AI.

### 4.3 TTS

Text-to-Speech untuk membantu akses materi dalam bentuk audio.

### 4.4 STT

Speech-to-Text untuk input suara dan interaksi.

### 4.5 Haptic Feedback

-   Notifikasi getar.
-   Feedback jawaban.
-   Penanda aktivitas.

### 4.6 Interactive Quiz

-   Multiple choice.
-   Pilihan jawaban.
-   Feedback.
-   Score.
-   Progress.

### 4.7 AI Learning

Smartwatch menerima rekomendasi dari AI: - Materi. - Difficulty. -
Delivery mode. - Aktivitas lanjutan.

### 4.8 Learning Monitoring

Data: - Aktivitas belajar. - Durasi. - Interaksi. - Jawaban kuis. -
Materi yang dibuka. - Voice/STT interaction. - Haptic interaction.

### 4.9 Student Monitoring

-   Heart rate.
-   Real-time location sesuai izin.
-   Device status.

### 4.10 Offline Learning

Materi terbaru disimpan sebelum siswa meninggalkan sekolah.

Di rumah: - Materi tetap dapat diakses. - Aktivitas disimpan lokal. -
Data disinkronkan ketika koneksi tersedia.

------------------------------------------------------------------------

## 5. Home Learning

Fitur tambahan: - Alarm. - PR reminder. - Materi dari guru. -
Video/audio explanation. - AI notes. - Teacher voice recording/replay. -
Offline materials.

------------------------------------------------------------------------

## 6. Learning Flow

``` text
Guru membuat materi
       ↓
Platform
       ↓
AI Personalization
       ↓
Smartwatch
       ↓
Siswa belajar
       ↓
Siswa menjawab / berinteraksi
       ↓
Smartwatch mengumpulkan data
       ↓
AI Analytics
       ↓
Recommendation
       ↓
Materi berikutnya
```

------------------------------------------------------------------------

## 7. Functional Requirements

  ID      Requirement                 Priority
  ------- --------------------------- ----------
  SW-01   Login / pairing device      Must
  SW-02   Receive notification        Must
  SW-03   Receive learning material   Must
  SW-04   TTS                         Must
  SW-05   STT                         Must
  SW-06   Haptic feedback             Must
  SW-07   Interactive quiz            Must
  SW-08   Receive AI recommendation   Must
  SW-09   Store learning data         Must
  SW-10   Offline learning            Must
  SW-11   Sync learning data          Must
  SW-12   Heart rate                  Should
  SW-13   Location                    Should
  SW-14   Teacher voice recording     Should
  SW-15   Alarm / reminder            Should

------------------------------------------------------------------------

## 8. Battery

Smartwatch menggunakan dua slot energi:

### Main

Rechargeable battery.

Pengisian dilakukan melalui solar charging station di sekolah.

### Backup

Bio-battery berbasis ekstrak limbah kulit buah.

Sistem:

``` text
Main Battery
     ↓
Battery Level Low
     ↓
Automatic Switching
     ↓
Bio-Battery Backup
```

Kapasitas dan ketahanan aktual bio-battery harus divalidasi melalui
prototipe dan pengujian.

------------------------------------------------------------------------

## 9. Materials

-   Casing dari material daur ulang.
-   Strap/bracelet dari material daur ulang.
-   Komponen elektronik dari component suppliers.

------------------------------------------------------------------------

## 10. Success Metrics

-   Materi berhasil diterima.
-   Kuis dapat dikerjakan.
-   Data interaksi berhasil tersimpan.
-   Offline learning dapat digunakan.
-   Data berhasil sinkron kembali.
-   Guru menerima progress.
-   AI dapat menghasilkan recommendation.
