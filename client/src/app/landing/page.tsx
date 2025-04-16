import Link from "next/link";

import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Descubre los mejores lugares para comer y beber
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mb-8">
            Encuentra bares, restaurantes y cafeterías cerca de ti. Reserva
            mesas, lee opiniones y disfruta de ofertas exclusivas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="w-full sm:w-auto">
              <button className="w-full h-12 flex items-center justify-center px-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-[12px] transition-colors duration-300">
                Iniciar sesión <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <Link href="/register" className="w-full sm:w-auto">
              <button className="w-full h-12 flex items-center justify-center px-6 border border-purple-500 text-white hover:bg-purple-900/20 rounded-[12px] transition-colors duration-300">
                Registrarse
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white/5 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Características principales
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                iconColor: "text-purple-400",
                bgColor: "bg-purple-500/20",
                title: "Encuentra lugares cercanos",
                desc: "Descubre los mejores bares y restaurantes cerca de tu ubicación actual.",
              },
              {
                iconColor: "text-pink-400",
                bgColor: "bg-pink-500/20",
                title: "Happy Hours",
                desc: "No te pierdas las mejores ofertas y happy hours en tu zona.",
              },
              {
                iconColor: "text-purple-400",
                bgColor: "bg-purple-500/20",
                title: "Reservas fáciles",
                desc: "Reserva mesas en tus lugares favoritos con solo unos clics.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-lg">
                <div
                  className={`${item.bgColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${item.iconColor}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {/* Te dejo los paths según el índice para variar íconos */}
                    {i === 0 && (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </>
                    )}
                    {i === 1 && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    )}
                    {i === 2 && (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </>
                    )}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-black py-8 px-4 text-center text-white/60">
        <p>© 2025 Food & Drink. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
