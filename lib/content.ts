export type Unit = {
  name: string;
  level: string;
  description: string;
  accreditation?: string;
};

export type Program = {
  title: string;
  description: string;
  icon: string;
};

export type NewsItem = {
  title: string;
  date: string;
  category: string;
  excerpt: string;
};

export type SiteContent = {
  brand: { name: string; shortName: string; tagline: string };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  stats: { value: string; label: string }[];
  about: { title: string; body: string; values: string[] };
  units: Unit[];
  programs: Program[];
  news: NewsItem[];
  contact: {
    address: string;
    phone: string;
    email: string;
    mapUrl: string;
    whatsappUrl: string;
  };
  social: { instagram: string; facebook: string };
  donation: { title: string; description: string; url: string };
  ppdbUrl: string;
};

export const defaultContent: SiteContent = {
  brand: {
    name: "Yayasan Pondok Pesantren Al Huda",
    shortName: "Al Huda",
    tagline: "Membentuk generasi berilmu, berakhlak, dan berdaya guna.",
  },
  hero: {
    eyebrow: "Yayasan Pondok Pesantren Al Huda Plumbon",
    title: "Tumbuh dalam ilmu, kokoh dalam akhlak.",
    description:
      "Lembaga pendidikan Islam di Desa Pamijahan, Kecamatan Plumbon, Kabupaten Cirebon, Jawa Barat yang menghadirkan pendidikan terpadu berbasis pesantren.",
    primaryCtaLabel: "Kenal lebih dekat",
    primaryCtaHref: "/profil",
    secondaryCtaLabel: "Hubungi kami",
    secondaryCtaHref: "/kontak",
  },
  stats: [
    { value: "1998", label: "Berdiri dan mengabdi" },
    { value: "2+", label: "Unit pendidikan" },
    { value: "B", label: "Akreditasi SMP" },
    { value: "AX2573", label: "NPYP" },
  ],
  about: {
    title: "Pendidikan yang menyatukan ilmu dan keteladanan",
    body:
      "Yayasan Pondok Pesantren Al Huda Plumbon hadir untuk mendampingi generasi melalui pendidikan Islam yang tertib, hangat, dan relevan. Kami mengembangkan lingkungan belajar yang memadukan pembinaan keagamaan, akademik, kemandirian, dan kepedulian sosial.",
    values: ["Keislaman", "Keilmuan", "Kemandirian", "Akhlakul karimah"],
  },
  units: [
    {
      name: "SMP Boarding School Al Huda",
      level: "Pendidikan menengah pertama",
      description:
        "Pendidikan tingkat SMP berbasis pesantren dengan pembinaan akademik, ibadah, dan karakter dalam lingkungan asrama.",
      accreditation: "Akreditasi B",
    },
    {
      name: "MI Al Huda Pamijahan",
      level: "Pendidikan dasar",
      description:
        "Pendidikan dasar yang menanamkan kecintaan kepada ilmu, Al-Qur’an, adab, dan lingkungan sejak dini.",
      accreditation: "Unit pendidikan yayasan",
    },
  ],
  programs: [
    { title: "Pembinaan Keagamaan", description: "Membiasakan ibadah, kajian, tahfiz, dan adab dalam keseharian santri.", icon: "01" },
    { title: "Pendidikan Terpadu", description: "Menguatkan kompetensi akademik sekaligus kecakapan hidup dan kepemimpinan.", icon: "02" },
    { title: "Kegiatan Santri", description: "Mendorong kreativitas, kebersamaan, olahraga, seni, dan kontribusi sosial.", icon: "03" },
  ],
  news: [
    { title: "Menyambut generasi pembelajar di lingkungan Al Huda", date: "Informasi yayasan", category: "Yayasan", excerpt: "Ruang belajar yang tertib dan lingkungan yang mendukung menjadi bagian dari ikhtiar kami." },
    { title: "Kegiatan santri dan program harian", date: "Kegiatan", category: "Santri", excerpt: "Ikuti informasi kegiatan dan program harian melalui kanal resmi Pondok Pesantren Al-Huda Pamijahan." },
    { title: "Informasi penerimaan peserta didik baru", date: "Pendaftaran", category: "PPDB", excerpt: "Informasi pendaftaran dapat diperoleh melalui kontak resmi atau formulir yang disediakan." },
  ],
  contact: {
    address: "Jl. Surya Negara Blok Kijad RT.09 RW.02, Desa Pamijahan, Kecamatan Plumbon, Kabupaten Cirebon, Jawa Barat",
    phone: "Hubungi pengelola yayasan",
    email: "",
    mapUrl: "https://maps.google.com/?q=Pamijahan%20Plumbon%20Cirebon",
    whatsappUrl: "https://wa.me/62",
  },
  social: {
    instagram: "https://www.instagram.com/ponpes_alhudapamijahan/",
    facebook: "",
  },
  donation: {
    title: "Dukung ikhtiar pendidikan Al Huda",
    description: "Partisipasi Anda membantu menghadirkan pendidikan, pembinaan, dan lingkungan belajar yang lebih baik bagi santri.",
    url: "",
  },
  ppdbUrl: "",
};
