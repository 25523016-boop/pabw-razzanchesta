// app.js — DATA dan FUNGSI MURNI (hasil Pertemuan 8).
// File ini tidak menyentuh halaman; yang menyentuh halaman adalah dom.js.

// ---------- Data ----------
export const profile = {
  name: "Razzan Chesta Ugama", // ganti dengan nama Anda
  role: "Mahasiswa Teknik Informatika Ip UII",
  skills: ["HTML", "CSS", "JavaScript"],
};

export const projects = [
  {
    id: 1,
    title: "Halaman Profil",
    category: "web",
    year: 2026,
    done: true,
    description: "Halaman profil pribadi dengan HTML dan CSS.",
  },
  {
    id: 2,
    title: "Katalog Produk",
    category: "web",
    year: 2026,
    done: false,
    description: "Daftar produk yang dibuat dari data JavaScript.",
  },
  {
    id: 3,
    title: "Kuis JavaScript",
    category: "javascript",
    year: 2026,
    done: true,
    description: "Latihan soal pilihan ganda dengan array dan objek.",
  },
  {
    id: 4,
    title: "Kalkulator Sederhana",
    category: "javascript",
    year: 2026,
    done: false,
    description: "Menghitung dua angka dari input pengguna.",
  },
  {
    id: 5,
    title: "Poster Kampus",
    category: "desain",
    year: 2026,
    done: true,
    description: "Poster kegiatan program studi.",
  },
];

// Kategori "mobile" sengaja tidak punya proyek, untuk menguji keadaan kosong.

// ---------- Fungsi murni ----------
export function buildIntroduction({ name, role }) {
  return `${name} · ${role}`;
}

export function formatSkills(list) {
  return list.join(" · ");
}

export function filterProjects(list, category) {
  return list.filter(
    (project) => category === "all" || project.category === category
  );
}

// Mengembalikan pesan error, atau "" bila isian sudah benar.
export function validateField(fieldName, value) {
  const text = value.trim();

  if (fieldName === "name") {
    if (text === "") return "Nama wajib diisi. Tuliskan nama Anda.";
    if (text.length < 3) return "Nama terlalu pendek. Tulis minimal 3 huruf.";
  }

  if (fieldName === "email") {
    if (text === "") return "Email wajib diisi. Contoh: nama@email.com";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      return "Format email belum benar. Contoh: nama@email.com";
    }
  }

  if (fieldName === "message") {
    if (text === "") return "Pesan wajib diisi. Tuliskan keperluan Anda.";
    if (text.length < 10) return "Pesan terlalu singkat. Tulis minimal 10 karakter.";
  }

  return "";
}

// ---------- Pemeriksaan di Console (Pertemuan 8) ----------
console.table(projects);
console.log(buildIntroduction(profile), "|", formatSkills(profile.skills));
