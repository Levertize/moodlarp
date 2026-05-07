# 🌈 Mood-Based Color Universe — Project Plan

> Sebuah web app yang mengubah mood menjadi alam semesta warna hidup yang bergerak organik.
> Vibe: Artistik, menenangkan, dan bisa dijadiin wallpaper.

---

## 🧠 Konsep Singkat

User ketik atau pilih mood → layar dipenuhi blob-blob warna yang bergerak pelan seperti lava lamp → warnanya disesuaikan sama mood → bisa di-screenshot / save jadi wallpaper desktop.

---

## 🛠️ Tech Stack

| Kebutuhan | Library / API | Alasan |
|---|---|---|
| Framework | **React 18 + TypeScript** | Udah familiar dari ZenSpace |
| Build tool | **Vite** | Sama kayak ZenSpace, cepet |
| Styling | **Tailwind CSS** | Buat UI minimal di atas canvas |
| Animasi blob | **Canvas API** (raw) | Full control, no extra lib |
| Warna & harmony | **chroma.js** | Manipulasi warna, generate palette |
| Noise organik | **simplex-noise** | Biar gerak blobnya natural, bukan robotik |
| Export gambar | **Canvas `.toDataURL()`** | Built-in browser, no lib needed |

### Install dependencies tambahan:
```bash
npm install chroma-js simplex-noise
npm install -D @types/chroma-js
```

---

## ✨ Fitur

### Core (wajib ada)
- [ ] Input mood — ketik bebas atau pilih dari preset
- [ ] Generate blob universe berdasarkan mood
- [ ] Warna berubah sesuai mood (tiap mood punya palette sendiri)
- [ ] Blob bergerak organik menggunakan Simplex Noise
- [ ] Tombol **Save as Wallpaper** (download PNG)
- [ ] Tombol **Regenerate** — buat universe baru dengan seed berbeda

### Polish (kalau udah selesai core)
- [ ] Transisi smooth antar mood (warna fade perlahan)
- [ ] Slider untuk ngatur jumlah blob & kecepatan
- [ ] Mode **Idle** mirip ZenSpace — UI hilang setelah beberapa detik
- [ ] Beberapa preset resolusi wallpaper (1920x1080, 2560x1440, dll)
- [ ] Share URL — mood tersimpan di URL params

---

## 🎨 Mood → Palette Mapping

```typescript
const moodPalettes = {
  melancholy:  ['#2C3E6B', '#4A6FA5', '#7BA7C2', '#B8D4E3', '#1a1a2e'],
  euphoria:    ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6FC8'],
  cozy:        ['#D4876A', '#C4956A', '#E8C39E', '#F2DBA8', '#8B5E3C'],
  anxiety:     ['#2D0000', '#8B0000', '#C41E3A', '#FF4500', '#1a0a0a'],
  serene:      ['#A8D5BA', '#7FB5A0', '#5C9E8A', '#3D7A6E', '#E8F5EE'],
  nostalgia:   ['#D4A5A5', '#C3B1C0', '#A89BB8', '#9B8DB0', '#F5E6E8'],
  rage:        ['#FF0000', '#CC0000', '#FF4400', '#880000', '#1a0000'],
  dreamy:      ['#B8A9C9', '#D4C5E2', '#C9D4F0', '#A9C4D4', '#F0E6FA'],
  hopeful:     ['#FFD700', '#FFA500', '#FF8C42', '#FFEC94', '#FFF3B0'],
  void:        ['#000000', '#0a0a0a', '#111111', '#1a1a1a', '#050505'],
}
```

> Kalau user ngetik mood yang ga ada di list, app akan auto-detect sentiment dan assign palette terdekat — atau generate palette random yang harmonis pakai chroma.js.

---

## 📁 Struktur File

```
mood-universe/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Canvas.tsx          # Core — render semua blob di sini
│   │   ├── MoodInput.tsx       # Input + preset buttons
│   │   ├── Controls.tsx        # Regenerate, Save, slider
│   │   └── IdleWrapper.tsx     # UI fade out saat idle (opsional)
│   ├── hooks/
│   │   ├── useBlobs.ts         # Logic blob — posisi, ukuran, gerak
│   │   └── useNoise.ts         # Simplex noise helper
│   ├── utils/
│   │   ├── moodPalettes.ts     # Semua mapping mood → warna
│   │   ├── colorUtils.ts       # Generate palette dari chroma.js
│   │   └── exportCanvas.ts     # Save as PNG logic
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🗺️ Fase Development

### 🟢 Fase 1 — Setup & Blob Dasar (1–2 hari)
> Goal: Ada sesuatu yang bergerak di layar

- [ ] Init project: `npm create vite@latest mood-universe -- --template react-ts`
- [ ] Install Tailwind, chroma-js, simplex-noise
- [ ] Bikin `Canvas.tsx` dengan `useRef` ke `<canvas>`
- [ ] Bikin beberapa blob statis (lingkaran berwarna di canvas)
- [ ] Buat blob bergerak pelan dengan `requestAnimationFrame`
- [ ] Blob bounce di tepi layar

**Checkpoint:** Layar penuh blob warna yang bergerak, walau masih kaku.

---

### 🟡 Fase 2 — Gerak Organik (2–3 hari)
> Goal: Blob geraknya kayak makhluk hidup

- [ ] Install dan setup `simplex-noise`
- [ ] Tiap blob punya offset noise sendiri (biar ga gerak barengan)
- [ ] Posisi X dan Y tiap blob dipengaruhi noise value yang berubah seiring waktu
- [ ] Ukuran blob juga sedikit berubah (breathing effect)
- [ ] Blob punya transparansi dan blur (CSS: `filter: blur(60px)`)

**Checkpoint:** Blob geraknya smooth dan organik, kayak lava lamp / amoeba.

---

### 🟡 Fase 3 — Mood System (2–3 hari)
> Goal: Input mood → tampilan berubah

- [ ] Buat `moodPalettes.ts` dengan semua mapping
- [ ] Buat `MoodInput.tsx` — text input + preset buttons (Cozy, Dreamy, dll)
- [ ] Saat mood dipilih, warna blob berubah smooth (interpolasi warna dengan chroma.js)
- [ ] Jumlah & ukuran blob juga beda per mood (mood `void` = sedikit blob gelap besar, `euphoria` = banyak blob kecil warna-warni)
- [ ] Kalau user ngetik mood custom → cari closest match atau assign random harmonis

**Checkpoint:** Ganti mood → seluruh universe berubah karakter.

---

### 🟠 Fase 4 — UI & Polish (2–3 hari)
> Goal: Kelihatan bagus dan enak dipakai

- [ ] Glassmorphism UI di atas canvas (sama kayak ZenSpace)
- [ ] Tombol Regenerate — generate posisi blob baru dengan seed beda
- [ ] Tombol Save — download canvas sebagai PNG
- [ ] Animasi fade-in saat pertama load
- [ ] Transisi warna smooth antar mood
- [ ] Responsive — enak dilihat di mobile juga

**Checkpoint:** Bisa dipamer dan enak dilihat.

---

### 🔵 Fase 5 — Extra Features (opsional, santai)
> Goal: Bikin lebih berkesan

- [ ] Idle Mode — UI hilang setelah 5 detik, layar jadi "living wallpaper"
- [ ] URL params: `/?mood=melancholy` langsung load mood itu
- [ ] Resolusi export pilihan (HD, 4K, dll)
- [ ] Slider: jumlah blob, kecepatan, blur intensity
- [ ] Sound reactive — kalau disambungin ke mic, blob geraknya lebih aktif

---

## 🔑 Konsep Kunci yang Perlu Dipahami

### 1. Canvas API Basics
```typescript
const canvas = canvasRef.current;
const ctx = canvas.getContext('2d');

// Gambar lingkaran
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2);
ctx.fillStyle = 'rgba(255, 100, 100, 0.5)';
ctx.fill();
```

### 2. Animation Loop
```typescript
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // hapus frame lama
  drawBlobs(); // gambar ulang
  requestAnimationFrame(animate); // panggil lagi di frame berikutnya
};
animate();
```

### 3. Simplex Noise untuk Gerak Organik
```typescript
import { createNoise2D } from 'simplex-noise';
const noise2D = createNoise2D();

// Tiap blob punya offset berbeda supaya geraknya ga sync
const x = baseX + noise2D(time * 0.001, blob.offsetX) * 100;
const y = baseY + noise2D(time * 0.001, blob.offsetY) * 100;
```

### 4. Blur Effect (CSS Filter)
```css
/* Di canvas wrapper */
.blob-canvas {
  filter: blur(0px); /* blur di-handle per-blob lewat shadow */
}
```
Atau pakai `ctx.filter = 'blur(40px)'` langsung di canvas context.

### 5. Export Canvas sebagai PNG
```typescript
const saveAsWallpaper = () => {
  const link = document.createElement('a');
  link.download = `mood-universe-${mood}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};
```

---

## 🚀 Cara Mulai (Langkah Pertama)

```bash
# 1. Buat project
npm create vite@latest mood-universe -- --template react-ts
cd mood-universe

# 2. Install dependencies
npm install
npm install chroma-js simplex-noise
npm install -D @types/chroma-js

# 3. Install Tailwind
npm install -D tailwindcss @tailwindcss/vite

# 4. Jalankan
npm run dev
```

Setelah itu, mulai dari `Canvas.tsx` — bikin satu blob dulu yang bisa bergerak. Satu blob dulu, baru scale up.

---

## 🎯 Definition of Done

Project ini selesai dan siap di-push ke GitHub kalau:
- ✅ User bisa input / pilih mood
- ✅ Canvas berubah sesuai mood dengan warna yang sesuai
- ✅ Blob bergerak organik dan smooth
- ✅ Ada tombol Save as Wallpaper yang works
- ✅ UI-nya enak dilihat (glassmorphism / minimal)
- ✅ README yang bagus (bisa contek struktur ZenSpace punya)

---

## 💡 Tips Vibe Coding

- Mulai dari yang **visual duluan** — blob bergerak dulu baru sistem mood. Lebih motivating.
- Kalau stuck di matematika noise, **cari contoh p5.js / canvas blob** di CodePen buat referensi visual.
- Jangan terlalu mikirin arsitektur di awal — **make it work, then make it pretty**.
- Commit sering, tiap fase selesai langsung push ke GitHub biar keliatan progresnya.

---

*Dibuat untuk: Iqbal / Levertize*
*Sister project dari: [ZenSpace](https://zenspace-sand.vercel.app/)*
