# 🎬 Drama Korea Streaming Platform

Platform streaming drama Korea modern berbasis **Laravel**, **Inertia.js**, dan **React** dengan tampilan premium dark-mode. Aplikasi ini mengonsumsi data dari API eksternal dan menyajikannya sebagai Single Page Application (SPA) yang cepat dan responsif.

---

## ✨ Fitur Utama

- 🏠 **Landing Page** — Menampilkan katalog drama Korea terbaru dengan grid responsif
- 🔍 **Pencarian** — Cari drama berdasarkan judul secara real-time
- 📂 **Kategori** — Jelajahi drama berdasarkan negara (Korea, China)
- 🔥 **Drama Terpopuler** — Peringkat drama berdasarkan jumlah kunjungan (hits)
- 📖 **Detail Drama** — Halaman detail lengkap dengan sinopsis, genre, dan daftar episode
- ▶️ **Streaming Video** — Pemutar video bawaan dengan pilihan kualitas (360p, 480p, 720p)
- 🧭 **Navigasi SPA** — Perpindahan halaman instan tanpa reload berkat Inertia.js
- 🛡️ **Error Handling** — Penanganan error API yang aman dengan timeout dan fallback data

---

## 🛠️ Tech Stack

| Layer        | Teknologi                          |
|--------------|-------------------------------------|
| Backend      | Laravel 11, PHP 8.x                |
| Frontend     | React 18, TypeScript               |
| Bridge       | Inertia.js (SPA tanpa API terpisah) |
| Styling      | Tailwind CSS                       |
| Build Tool   | Vite                               |
| Dev Server   | Laravel Herd                       |

---

## 📁 Struktur Proyek

```
app/Http/Controllers/
└── DramaController.php         # Controller utama (index, show, watch, popular)

resources/js/
├── Components/Drama/
│   ├── Navbar.tsx               # Navigasi utama (Home, Populer, Kategori)
│   ├── Header.tsx               # Header halaman dengan judul
│   ├── SearchBar.tsx            # Komponen pencarian
│   ├── DramaCard.tsx            # Kartu drama (grid item)
│   └── Pagination.tsx           # Navigasi halaman
│
└── Pages/Drama/
    ├── Index.tsx                 # Landing page / katalog drama
    ├── Popular.tsx               # Halaman drama terpopuler
    ├── Show.tsx                  # Halaman detail drama + daftar episode
    └── Stream.tsx                # Halaman pemutar video streaming

routes/
└── web.php                      # Definisi semua rute aplikasi
```

---

## 🌐 API Endpoints

Aplikasi ini menggunakan API eksternal:

| Endpoint                          | Fungsi                          |
|-----------------------------------|---------------------------------|
| `/drama/home/{category}?page=`    | Daftar drama per kategori       |
| `/drama/search?q=&page=`         | Pencarian drama                 |
| `/drama/info?id=`                 | Detail informasi drama          |
| `/drama/stream?id=`              | Link streaming video (mp4)      |

---

## 🚀 Rute Aplikasi

| URL                              | Nama Rute        | Fungsi                        |
|----------------------------------|-------------------|-------------------------------|
| `/`                              | `drama.index`     | Halaman utama (Drama Korea)   |
| `/category/{category}`           | `drama.category`  | Filter drama per kategori     |
| `/popular`                       | `drama.popular`   | Drama terpopuler              |
| `/drama/{id}`                    | `drama.show`      | Detail drama + episode list   |
| `/watch/{drama_id}/{streaming_id}` | `drama.watch`   | Halaman streaming video       |

---

## ⚙️ Instalasi & Menjalankan

### Prasyarat
- PHP 8.2+
- Composer
- Node.js 18+
- Laravel Herd (opsional, bisa pakai `php artisan serve`)

### Langkah-langkah

```bash
# 1. Clone & masuk ke direktori
git clone <repo-url>
cd laravel

# 2. Install dependensi
composer install
npm install

# 3. Konfigurasi environment
cp .env.example .env
php artisan key:generate

# 4. Jalankan migrasi (opsional, untuk fitur auth bawaan)
php artisan migrate

# 5. Jalankan development server
npm run dev              # Vite dev server (terminal 1)
php artisan serve        # Laravel server  (terminal 2)
# Atau gunakan Laravel Herd → akses http://laravel.test
```

---

## 📸 Preview

### Landing Page
Menampilkan grid drama Korea terbaru dengan efek hover interaktif dan pencarian.

### Detail Drama
Layout 2 kolom dengan poster, sinopsis, dan daftar episode yang bisa diklik langsung.

### Streaming
Pemutar video HTML5 dengan pemilih kualitas (360p/480p/720p) dan navigasi episode horizontal.

---

## 📝 Catatan Pengembangan

- **SPA Behavior**: Semua navigasi menggunakan Inertia.js, tidak ada full page reload.
- **Error Resilience**: Semua pemanggilan API dibungkus `try-catch` dengan timeout 10 detik.
- **Tanpa Auth**: Fitur dashboard & autentikasi bawaan Laravel telah dihapus untuk fokus pada streaming.
- **Data Filtering**: Field `author` dan `contact` dari API dihapus sebelum dikirim ke frontend.

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dan pengembangan pribadi.
