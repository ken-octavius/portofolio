/**
 * =====================================================================
 * PUSAT KONTEN WEBSITE (SINGLE SOURCE OF TRUTH)
 * =====================================================================
 * Semua teks dan tulisan yang tampil di website dapat diedit langsung
 * di file ini tanpa perlu membongkar komponen JSX/desain.
 *
 * DAFTAR BAGIAN:
 * 1. profile         -> Nama, sekolah, kontak, dan link sosial
 * 2. navbar          -> Menu navigasi dan tombol kontak atas
 * 3. hero            -> Teks utama banner beranda (headline & tombol)
 * 4. about           -> Bagian "About", Whoami, checklist, & learning pillars
 * 5. techStack       -> Bagian "Tech Stack" / keahlian
 * 6. education       -> Bagian "Pendidikan" (sekolah & riwayat belajar)
 * 7. projects        -> Bagian "Project" (daftar project)
 * 8. certifications  -> Bagian "Sertifikat" (daftar sertifikat)
 * 9. contact         -> Bagian "Kontak" (info langsung & formulir pesan)
 * 10. footer         -> Bagian "Footer" bawah website
 * =====================================================================
 */

export const content = {
  // ==========================================
  // 1. PROFIL & IDENTITAS UTAMA
  // ==========================================
  profile: {
    name: "Muhammad Kenzie Oktavian",
    shortName: "Ken",
    initials: "MKO",
    school: "SMK Negeri 1 Sragi",
    major: "Teknik Komputer dan Jaringan",
    headerSubtitle: "",
    role: "Network & Cybersecurity Learner",
    email: "m.kenzie.oktavian@gmail.com",
    location: "Pekalongan, Jawa Tengah, Indonesia",
    githubUrl: "https://github.com/ken-octavius",
    youtubeUrl: "https://youtube.com/@ken4k7?si=CoIeY9MU3fQk7TYb",
    logoImage: "/logo-01.png",
    avatarImage: "/avatar.jpg",
  },

  // ==========================================
  // 2. NAVBAR / HEADER
  // ==========================================
  navbar: {
    links: [
      { name: "Tentang", href: "#about" },
      { name: "Keahlian", href: "#skills" },
      { name: "Riwayat", href: "#timeline" },
        { name: "Project", href: "#projects" },
        { name: "Sertifikasi", href: "#certifications" },
        { name: "Kontak", href: "#contact" },
    ],
    contactButton: "Kontak",
  },

  // ==========================================
  // 3. HERO (BAGIAN UTAMA ATAS)
  // ==========================================
  hero: {
    statusBadge: "Portofolio",

    headline:
      "Pelajar TKJ yang belajar jaringan komputer, Linux, dan dasar keamanan siber melalui praktik dan lab mandiri.",

    primaryButton: "Keahlian",
    secondaryButton: "Kontak",

    bottomTagline: "Learning...",
  },

  // ==========================================
  // 4. ABOUT (TENTANG)
  // ==========================================
  about: {
    badge: "01. About",
    title: "Tentang",
    subtitle: "",

    whoamiBadge: "Whoami",

    whoamiText:
      "Pelajar Teknik Komputer dan Jaringan yang mempelajari jaringan, Linux, perangkat jaringan, dan dasar keamanan siber melalui sekolah serta lab mandiri.",

    checklist: ["Network", "Linux", "MikroTik", "Cisco", "Cybersecurity"],

    learningPillars: [
      {
        title: "Network",
        desc: "IPv4, Subnetting, Routing, ARP, DNS, DHCP, TCP/UDP.",
      },
      {
        title: "Linux",
        desc: "CLI, Filesystem, User & Group, Permissions, Processes, Logs.",
      },
      {
        title: "MikroTik",
        desc: "RouterOS, IP Address, DHCP, NAT, Firewall, Wireless, Routing.",
      },
      {
        title: "Cisco",
        desc: "Packet Tracer, Addressing, Switching, Routing, Topology.",
      },
      {
        title: "Cybersecurity",
        desc: "CIA Triad, Threat actors, Threat intelligence, Cyber Kill Chain, MITRE ATT&CK.",
      },
    ],
  },
  // TECH //Linux CLI", "Kali Linux", "Ubuntu", "Permissions", "Processes", "Logs"
  techStack: {
    badge: "02. Tech Stack",
    title: "Keahlian",
    subtitle: "",

    items: [
      {
        name: "Network",
        description:
          "Memahami dasar komunikasi dan konfigurasi jaringan komputer.",
        tags: [
          "IPv4",
          "Subnetting",
          "Routing",
          "ARP",
          "DNS",
          "DHCP",
          "TCP/UDP",
        ],
      },
      {
        name: "Linux",
        description:
          "Menggunakan Linux CLI untuk pengelolaan sistem dan troubleshooting dasar.",
        tags: [
          "Linux CLI",
          "Kali Linux",
          "Ubuntu",
          "Permissions",
          "Processes",
          "Logs",
        ],
      },
      {
        name: "MikroTik",
        description:
          "Konfigurasi dasar RouterOS dan layanan jaringan melalui Winbox.",
        tags: [
          "RouterOS",
          "Winbox",
          "IP Address",
          "DHCP",
          "NAT",
          "Firewall",
          "Wireless",
        ],
      },
      {
        name: "Cisco",
        description: "Simulasi jaringan menggunakan Cisco Packet Tracer.",
        tags: [
          "Packet Tracer",
          "Addressing",
          "Switching",
          "Routing",
          "Topology",
        ],
      },
      {
        name: "Security",
        description:
          "Mempelajari dasar keamanan siber dan analisis log sistem.",
        tags: [
          "Cybersecurity",
          "Threat Intelligence",
          "System Logs",
          "Monitoring",
          "Blue Team",
        ],
      },
    ],
  },

  // ==========================================
  // 6. EDUCATION (RIWAYAT PENDIDIKAN)
  // ==========================================
  education: {
    badge: "03. Journey",
    title: "Perjalanan",
    subtitle: "",

    items: [
      {
        organization: "SMK Negeri 1 Sragi",
        period: "2025 — Sekarang",
        role: "Teknik Komputer dan Jaringan",
        description:
          "Mempelajari jaringan komputer, sistem operasi, perangkat jaringan, dan praktikum konfigurasi jaringan.",
      },
    ],
  },

  // ==========================================
  // 7. PROJECTS (PROJECT)
  // ==========================================
  projects: {
    badge: "04. Project",
    title: "Proyek",
    subtitle: "",
    items: [],
  },

  // ==========================================
  // 8. CERTIFICATIONS (SERTIFIKAT)
  // ==========================================
  certifications: {
    badge: "05. Certificate",
    title: "Sertifikat",
    subtitle: "",
    items: [],
  },

  // ==========================================
  // 9. CONTACT (HUBUNGI SAYA)
  // ==========================================
  contact: {
    badge: "06. Contact",
    title: "Kontak",
    subtitle: "",

    directCard: {
      badge: "Kontak",
      title: "Hubungi Ken",
      description: "Email atau kunjungi profil saya.",
      socialHeading: "Link",
    },

    form: {
      cardHeader: "Kirim pesan",
      nameLabel: "NAMA",
      namePlaceholder: "Nama",
      emailLabel: "EMAIL",
      emailPlaceholder: "nama@email.com",
      messageLabel: "PESAN",
      messagePlaceholder: "Tulis pesan...",
      submitButton: "Kirim",
      successTitle: "Pesan terkirim.",
      successMessage: "Terima kasih.",
    },
  },

  // ==========================================
  // 10. FOOTER (BAGIAN BAWAH)
  // ==========================================
  footer: {
    description:
      "Pelajar Teknik Komputer dan Jaringan · SMK Negeri 1 Sragi. Belajar jaringan, Linux, dan dasar keamanan siber melalui praktik dan lab mandiri.",
    navigationHeading: "// Menu",
    socialHeading: "// Link",
    backToTopButton: "Ke Atas",
    copyrightSuffix: "All rights reserved.",
    bottomTagline: "2025 — Sekarang",
  },
};
