# Jawaban Worksheet P9 — DOM, Events, dan Interactivity

Nama: ______  NIM: ______  Kelas: ______  Tanggal: ______

## Sheet A.2 — Elemen yang saya isi

| Area halaman | Selector | Diisi dengan | Nama variabel |
|---|---|---|---|
| Daftar proyek | `#list` | kartu `<li class="card">` dari array `projects` | `container` |
| Baris tombol filter | `#filter` | (tidak diisi; hanya tempat listener) | `filterRow` |
| Pesan daftar kosong | `#empty-message` | teks tetap, ditampilkan lewat `hidden` | `emptyMessage` |
| Formulir dan isiannya | `#contact-form`, `input, textarea`, `#error-<nama>` | pesan error per isian | `form`, `fields`, `submitButton` |
| Nama di beranda | `#nama-profil` | `profile.name` | `profileName` |

## Sheet B.3 — Perbandingan hasil
| Yang diperiksa | Benar | Hasil saya |
|---|---|---|
| Jumlah kartu | sama dengan `projects.length` (5) | isi setelah mencoba |
| Kartu teratas | judul = data pertama ("Halaman Profil") | isi setelah mencoba |
| Isi kartu | tampil sebagai teks | isi setelah mencoba |

## Sheet C.2 / D.3
Isi kolom "hasil saya" sesuai yang Anda lihat sendiri di browser:
halaman baru (semua proyek, tombol "Semua" aktif), klik kategori, klik "Mobile" (pesan kosong muncul), klik cepat dua kali (kartu tidak berlipat), kirim formulir kosong, perbaiki satu isian, isian hanya spasi (tetap tidak valid).

## Sheet E.4 — Kasus (isi dari pengalaman Anda sendiri)
Kasus yang bisa Anda coba dan catat (buat screenshot-nya):

| Gejala | Penyebab | Baris yang diubah |
|---|---|---|
| Halaman diam, Console: `Cannot read properties of null` | id di JS berbeda satu huruf dari id di HTML, misalnya `#lists` bukan `#list` | `dom.js`, baris `getElement("#list")` |
| Satu klik filter menjalankan render berkali-kali | `addEventListener` dipanggil di dalam `render` | pindahkan ke luar `render` |
| Kartu berlipat tiap klik | baris `container.textContent = ""` dihapus | kembalikan sebagai baris pertama `render` |

Catatan: E.4 harus diisi dari kesalahan yang benar-benar Anda alami. Sengajakan satu kesalahan, lihat gejalanya di DevTools, lalu perbaiki.

## Sheet F — Exit ticket (draf, tulis ulang dengan kata Anda sendiri)

1. Elemen `#list`, diambil dengan `document.querySelector("#list")`, disimpan di variabel `container`.
2. `querySelector` mengembalikan satu elemen pertama yang cocok (atau `null`), `querySelectorAll` mengembalikan semua yang cocok sebagai NodeList. NodeList bukan array, jadi tidak punya `map`; ubah dulu dengan `Array.from(...)`.
3. Manfaatnya: cukup satu listener dan tombol yang dibuat belakangan tetap terlayani. Buktinya di `dom.js`: `filterRow.addEventListener("click", ...)` hanya satu kali, memakai `event.target.closest("button")`.
4. Jika baris `container.textContent = ""` dihapus, setiap klik filter menambahkan kartu baru di bawah kartu lama sehingga kartu menumpuk. Coba sendiri, lalu tulis hasilnya.
5. `innerHTML` membaca teks sebagai HTML, sehingga teks dari pengguna yang berisi tag atau skrip ikut dijalankan (XSS). Saya memakai `createElement` dan `textContent`.

## F.1 — Daftar periksa
- [ ] File profile.html, CSS, js/app.js, js/dom.js ada di repositori dan Console bersih
- [ ] Semua selector mengembalikan elemen (tidak ada null)
- [ ] Daftar proyek dibangun dari array dengan createElement dan textContent
- [ ] Container dikosongkan di baris pertama render
- [ ] Satu listener di parent melayani semua tombol filter
- [ ] Pesan kosong tampil saat filter tidak menghasilkan apa-apa
- [ ] Formulir tidak reload, ada pesan error per isian, tombol menunggu valid
- [ ] Bagian pengungkapan AI di README terisi
- [ ] Lebih dari satu commit hari ini

## F.2 — Satu kalimat untuk diingat
Tulis sendiri, misalnya: "Cek dulu ejaan id di Elements sebelum menulis selector."

## F.3 — Penilaian diri
Isi nilai dan bukti sendiri setelah Anda menguji. Petunjuk bukti:
- Memilih dan mengisi elemen: `dom.js` (`getElement`, `buildCard`)
- Render dari data: `dom.js` fungsi `render`
- Event delegation: `dom.js` listener pada `filterRow`
- Validasi formulir: `dom.js` listener `submit` dan `input`, `app.js` `validateField`
- Kebersihan kode: pemisahan `app.js` dan `dom.js`, README
