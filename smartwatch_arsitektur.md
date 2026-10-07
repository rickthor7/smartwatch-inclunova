# ARSITEKTUR --- INCLUNOVA Smartwatch

## 1. High-Level Architecture

``` text
                 TEACHER
                    │
                    ▼
            INCLUNOVA PLATFORM
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
     AI ENGINE           CONTENT SERVICE
          │                   │
          └─────────┬─────────┘
                    ▼
              SYNC LAYER
                    │
                    ▼
              SMARTWATCH
                    │
          ┌─────────┼──────────┐
          ▼         ▼          ▼
       Student   Sensors    Local Storage
          │         │          │
          └─────────┼──────────┘
                    ▼
                 Sync Back
                    │
                    ▼
              DATA PLATFORM
                    │
                    ▼
                AI ENGINE
```

------------------------------------------------------------------------

## 2. Smartwatch Internal Architecture

``` text
SMARTWATCH
│
├── UI Layer
│   ├── Home
│   ├── Notification
│   ├── Learning
│   ├── Quiz
│   ├── Progress
│   └── Settings
│
├── Interaction Layer
│   ├── Touch
│   ├── TTS
│   ├── STT
│   └── Haptic
│
├── Learning Engine
│   ├── Material Reader
│   ├── Quiz Engine
│   ├── Offline Learning
│   └── Progress Tracker
│
├── Data Layer
│   ├── Local Cache
│   ├── Learning Activity
│   ├── Quiz Result
│   └── Sync Queue
│
├── Sensor Layer
│   ├── Heart Rate
│   └── Location
│
└── Device Layer
    ├── Battery
    ├── Connectivity
    └── Device Status
```

------------------------------------------------------------------------

## 3. Content Delivery

``` text
Teacher Dashboard
       ↓
Content Service
       ↓
AI Personalization
       ↓
Sync Layer
       ↓
Smartwatch
       ↓
Local Content Cache
       ↓
Student
```

Content yang diterima: - Materi. - Quiz. - Task. - Audio. - Visual. - AI
recommendation.

------------------------------------------------------------------------

## 4. Learning Data

``` text
Student Interaction
       ↓
Smartwatch
       ↓
Learning Event
       ↓
Local Event Queue
       ↓
Sync
       ↓
Data Platform
       ↓
AI Analytics
```

Contoh event:

``` json
{
  "student_id": "student-id",
  "material_id": "material-id",
  "event": "quiz_answer",
  "duration": 42,
  "timestamp": "..."
}
```

------------------------------------------------------------------------

## 5. Offline Architecture

Saat online:

``` text
Cloud
  ↓
Sync
  ↓
Local Storage
```

Saat offline:

``` text
Local Storage
  ↓
Student Learning
  ↓
Local Event Queue
```

Saat kembali online:

``` text
Local Event Queue
  ↓
Sync Engine
  ↓
Cloud
```

Sync harus memperhatikan: - Last synced timestamp. - Pending events. -
Failed events. - Retry. - Duplicate prevention.

------------------------------------------------------------------------

## 6. Connectivity

Connectivity harus dipisahkan menjadi beberapa layer:

### Device Communication

Komunikasi antara smartwatch dan perangkat/gateway sesuai teknologi yang
digunakan pada implementasi.

### Gateway / School Network

Menghubungkan perangkat dengan platform.

### Internet / Cloud

Mengirim data ke backend/cloud.

Jika LoRa digunakan, LoRa ditempatkan secara eksplisit sebagai
komunikasi perangkat/gateway sesuai rancangan implementasi, bukan
sebagai pengganti koneksi cloud.

------------------------------------------------------------------------

## 7. AI Architecture

Input: - Quiz results. - Learning duration. - Activity. - Material
interaction. - Accessibility needs. - Historical progress.

Process:

``` text
Raw Data
   ↓
Validation
   ↓
Feature Extraction
   ↓
Learning Profile
   ↓
AI Recommendation
```

Output: - Recommended material. - Difficulty. - Delivery mode. -
Learning priority.

------------------------------------------------------------------------

## 8. Multimodal Accessibility

``` text
                 LEARNING CONTENT
                        │
           ┌────────────┼────────────┐
           ↓            ↓            ↓
         Visual       Audio        Haptic
           │            │            │
         Display        TTS       Vibration
                        ↑
                       STT
```

Mode penyampaian dapat disesuaikan berdasarkan kebutuhan aksesibilitas
dan profil pembelajaran.

------------------------------------------------------------------------

## 9. Sensor Data

### Heart Rate

Digunakan sebagai bagian dari data monitoring perangkat sesuai kebutuhan
sistem.

### Location

Digunakan untuk monitoring lokasi siswa sesuai izin.

Data sensitif harus: - Memiliki permission. - Memiliki role-based
access. - Tidak ditampilkan kepada pihak yang tidak berwenang.

------------------------------------------------------------------------

## 10. Energy Architecture

``` text
SOLAR PANEL
     ↓
CHARGING STATION
     ↓
RECHARGEABLE BATTERY
     ↓
SMARTWATCH

BACKUP:
BIO-BATTERY
     ↓
AUTOMATIC SWITCHING
     ↓
SMARTWATCH
```

Smartwatch memiliki dua slot baterai.

Bio-battery diposisikan sebagai backup. Performa aktual harus divalidasi
melalui eksperimen/prototipe.

------------------------------------------------------------------------

## 11. Data Synchronization

Data yang disinkronkan:

### Downstream

Platform → Smartwatch - Material. - Quiz. - Task. - Recommendation. -
Notification.

### Upstream

Smartwatch → Platform - Quiz answers. - Learning activity. - Duration. -
Interaction. - Device data. - Monitoring data.

------------------------------------------------------------------------

## 12. Reliability

Jika sinkronisasi gagal: 1. Simpan event lokal. 2. Tandai pending. 3.
Retry saat koneksi tersedia. 4. Kirim data. 5. Server melakukan
deduplication. 6. Tandai synced.

------------------------------------------------------------------------

## 13. Security

-   Device pairing.
-   Authentication.
-   Secure communication.
-   Encrypted transport.
-   Local data protection.
-   Role-based access.
-   Permission untuk location.
-   Permission untuk monitoring data.
