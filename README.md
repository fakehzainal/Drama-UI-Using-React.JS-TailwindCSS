# 🎬 Drama Streaming Platform

Platform streaming drama Korea & China dengan tampilan premium dark-mode. Dibangun menggunakan **React 18**, **TypeScript**, **Tailwind CSS**, dan **Vite**. Bisa di-deploy ke **Vercel** secara gratis.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-22.x-339933?logo=nodedotjs&logoColor=white)

---

## ✨ Fitur Utama

- 🏠 **Landing Page** — Katalog drama Korea terbaru dengan grid responsif
- 🔍 **Pencarian** — Cari drama berdasarkan judul
- 📂 **Kategori** — Jelajahi drama berdasarkan negara (Korea, China)
- 🔥 **Drama Terpopuler** — Peringkat drama berdasarkan jumlah kunjungan
- 📖 **Detail Drama** — Halaman detail lengkap dengan sinopsis dan daftar episode
- ▶️ **Streaming Video** — Pemutar video dengan pilihan kualitas (360p, 480p, 720p)
- 🧭 **SPA Navigation** — Perpindahan halaman instan tanpa reload (React Router)
- 💀 **Skeleton Loading** — Animasi loading yang halus saat memuat data

---

## 🛠️ Tech Stack

| Layer      | Teknologi                          |
|------------|------------------------------------|
| Frontend   | React 18, TypeScript               |
| Routing    | React Router DOM v6                |
| Styling    | Tailwind CSS 3                     |
| Build Tool | Vite 5                             |
| Runtime    | Node.js 22.x                      |
| Hosting    | Vercel (atau hosting statis lain)  |

---

## 📋 Prasyarat

Sebelum memulai, pastikan perangkat kamu sudah memiliki software berikut:

### 1. Node.js v22.x

Download dan install dari: https://nodejs.org/

Setelah install, verifikasi dengan membuka terminal:

```bash
node --version
```

Output yang diharapkan:

```
v22.x.x
```

> **Catatan:** Versi 22.x wajib digunakan karena sudah dikonfigurasi di `.nvmrc` dan `package.json`. Jika kamu menggunakan [nvm](https://github.com/nvm-sh/nvm), cukup jalankan `nvm install 22` dan `nvm use 22`.

### 2. npm (sudah termasuk bersama Node.js)

Verifikasi:

```bash
npm --version
```

### 3. Git

Download dan install dari: https://git-scm.com/

Verifikasi:

```bash
git --version
```

---

## 🚀 Instalasi & Menjalankan

Ikuti langkah-langkah berikut secara berurutan.

### Langkah 1 — Clone Repository

Buka terminal (Command Prompt, PowerShell, atau Terminal), lalu jalankan:

```bash
git clone https://github.com/USERNAME/drama.git
```

> Ganti `USERNAME` dengan username GitHub kamu atau URL repository yang benar.

### Langkah 2 — Masuk ke Direktori Project

```bash
cd drama
```

### Langkah 3 — Install Dependencies

Jalankan perintah berikut untuk menginstall semua package yang dibutuhkan:

```bash
npm install
```

Tunggu hingga proses selesai. Output yang diharapkan kurang lebih:

```
added 137 packages, and audited 138 packages in 27s
```

> **Troubleshooting:** Jika terjadi error permission pada Windows, buka PowerShell sebagai Administrator dan jalankan:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
> ```
> Lalu ulangi `npm install`.

### Langkah 4 — Jalankan Development Server

```bash
npm run dev
```

Output yang diharapkan:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Langkah 5 — Buka di Browser

Buka browser (Chrome, Firefox, Edge, dll.) dan akses:

```
http://localhost:5173
```

🎉 **Selesai!** Kamu seharusnya melihat halaman utama Drama Korea Streaming.

---

## 📦 Perintah yang Tersedia

| Perintah           | Fungsi                                           |
|--------------------|--------------------------------------------------|
| `npm run dev`      | Jalankan development server (hot reload)         |
| `npm run build`    | Build production (output ke folder `dist/`)      |
| `npm run preview`  | Preview hasil build production secara lokal      |

---

## 🌐 Deploy ke Vercel

### Cara 1 — Deploy via GitHub (Disarankan)

#### 1. Push ke GitHub

Jika belum punya repository GitHub, buat dulu di https://github.com/new, lalu:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/drama.git
git push -u origin main
```

> Ganti `USERNAME` dan `drama` sesuai repository kamu.

#### 2. Import di Vercel

1. Buka https://vercel.com dan login (bisa pakai akun GitHub)
2. Klik tombol **"Add New..."** → **"Project"**
3. Pilih repository GitHub yang baru saja kamu push
4. Vercel akan otomatis mendeteksi konfigurasi berikut:

   | Setting          | Nilai            |
   |------------------|------------------|
   | Framework        | Vite             |
   | Build Command    | `npm run build`  |
   | Output Directory | `dist`           |
   | Node.js Version  | 22.x             |

5. Klik **"Deploy"**
6. Tunggu 1-2 menit sampai build selesai
7. Vercel akan memberikan URL seperti: `https://drama-xxxxx.vercel.app`

#### 3. Verifikasi

Buka URL yang diberikan Vercel, lalu coba akses halaman-halaman berikut:

| URL                              | Halaman                      |
|----------------------------------|------------------------------|
| `/`                              | Halaman utama (Drama Korea)  |
| `/category/china`                | Drama China                  |
| `/popular`                       | Drama terpopuler             |
| `/drama/{id}`                    | Detail drama + daftar episode|
| `/watch/{dramaId}/{streamingId}` | Streaming video              |

> Semua route SPA sudah dikonfigurasi di `vercel.json` dengan rewrite rule, jadi refresh halaman di path manapun akan tetap bekerja.

### Cara 2 — Deploy via Vercel CLI

```bash
# 1. Install Vercel CLI secara global
npm install -g vercel

# 2. Login ke akun Vercel
vercel login

# 3. Deploy
vercel

# 4. Deploy ke production
vercel --prod
```

---

## 📁 Struktur Project

```
drama/
├── public/
│   ├── favicon.png             # Favicon website
│   └── robots.txt              # SEO robots config
│
├── src/
│   ├── components/
│   │   ├── BackgroundBlur.tsx   # Efek blur dekoratif latar belakang
│   │   ├── DramaCard.tsx       # Kartu drama (item grid)
│   │   ├── Header.tsx          # Header halaman + SearchBar
│   │   ├── Navbar.tsx          # Navigasi utama (Home, Populer, Kategori)
│   │   ├── Pagination.tsx      # Navigasi halaman (sebelumnya/selanjutnya)
│   │   ├── SearchBar.tsx       # Form pencarian drama
│   │   └── Skeletons.tsx       # Komponen loading skeleton
│   │
│   ├── lib/
│   │   └── api.ts              # Service untuk memanggil API drama
│   │
│   ├── pages/
│   │   ├── DramaIndex.tsx      # Halaman utama / katalog drama
│   │   ├── DramaPopular.tsx    # Halaman drama terpopuler
│   │   ├── DramaShow.tsx       # Halaman detail drama + episode list
│   │   └── DramaStream.tsx     # Halaman pemutar video streaming
│   │
│   ├── App.tsx                 # Root component + React Router
│   ├── main.tsx                # Entry point aplikasi
│   ├── index.css               # Global styles + Tailwind directives
│   └── vite-env.d.ts           # Type declaration untuk Vite
│
├── index.html                  # HTML entry point
├── package.json                # Dependencies & scripts
├── tsconfig.json               # Konfigurasi TypeScript
├── tsconfig.node.json          # TypeScript config untuk Vite
├── vite.config.ts              # Konfigurasi Vite
├── tailwind.config.js          # Konfigurasi Tailwind CSS
├── postcss.config.js           # Konfigurasi PostCSS
├── vercel.json                 # Konfigurasi deployment Vercel
├── .nvmrc                      # Versi Node.js (22)
└── .gitignore                  # File yang diabaikan Git
```

---

## 🌐 API yang Digunakan

Aplikasi ini mengonsumsi API eksternal dari `https://api.sonzaix.indevs.in/drama`:

| Endpoint                         | Fungsi                      | Contoh                                              |
|----------------------------------|-----------------------------|-----------------------------------------------------|
| `GET /drama/home/{category}?page=` | Daftar drama per kategori | `/drama/home/korea?page=1`                          |
| `GET /drama/search?q=&page=`    | Pencarian drama             | `/drama/search?q=vincenzo&page=1`                   |
| `GET /drama/info?id=`           | Detail informasi drama      | `/drama/info?id=drama-korea-vincenzo-subtitle-indonesia` |
| `GET /drama/stream?id=`         | Link streaming video (mp4)  | `/drama/stream?id=12345`                            |

---

## 🔧 Troubleshooting

### ❌ `npm install` gagal

**Masalah:** Permission error pada Windows PowerShell

**Solusi:**
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

### ❌ `npm run dev` error "port already in use"

**Masalah:** Port 5173 sudah digunakan aplikasi lain

**Solusi:** Gunakan port lain:
```bash
npm run dev -- --port 3000
```

---

### ❌ Halaman blank / data tidak muncul

**Masalah:** API eksternal mungkin sedang down atau di-block ISP

**Solusi:**
1. Coba buka langsung di browser: `https://api.sonzaix.indevs.in/drama/home/korea?page=1`
2. Jika tidak bisa diakses, gunakan VPN atau ganti DNS ke `1.1.1.1` atau `8.8.8.8`

---

### ❌ Vercel deploy gagal dengan error Node version

**Masalah:** Vercel menggunakan versi Node yang tidak sesuai

**Solusi:** Pastikan file `.nvmrc` berisi `22` dan `package.json` memiliki:
```json
"engines": {
    "node": "22.x"
}
```

---

### ❌ Refresh halaman di Vercel menghasilkan 404

**Masalah:** Vercel tidak tahu cara menangani route SPA

**Solusi:** Pastikan file `vercel.json` berisi rewrite rule:
```json
{
    "rewrites": [
        { "source": "/(.*)", "destination": "/index.html" }
    ]
}
```

---

## 🗺️ Rute Aplikasi

| URL                                  | Halaman                   |
|--------------------------------------|---------------------------|
| `/`                                  | Halaman utama (Korea)     |
| `/category/{category}`               | Filter per kategori       |
| `/popular`                           | Drama terpopuler          |
| `/drama/{id}`                        | Detail drama + episode    |
| `/watch/{dramaId}/{streamingId}`     | Streaming video           |

---

## 📝 Catatan

- Aplikasi ini sepenuhnya **client-side** (SPA) — tidak memerlukan backend/server PHP
- Semua data diambil langsung dari API eksternal melalui `fetch()` di browser
- Tidak memerlukan database atau konfigurasi `.env`
- Cukup `npm install` → `npm run dev` untuk mulai development

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dan pengembangan pribadi.
