import Link from "next/link";
import Image from "next/image";

const EXTRA_LINKS = [
  { label: "¿Quieres ser distribuidor?", href: "/distribuidores" },
  { label: "Solicitud de patrocinio", href: "/solicitud-de-patrocinio" },
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
  { label: "Libro de reclamaciones", href: "/libro-reclamaciones" },
];

export default function Footer() {
  return (
    <footer className="noise-bg relative bg-primary text-white">
      <div className="absolute inset-0 tiger-stripe pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-site px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-10">
          <div>
            <h3 className="mb-6 font-playfair text-lg font-semibold">
              <span className="text-gradient-peach">Contacto</span>
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z" />
                  </svg>
                </span>
                Lima, Perú
              </li>
              <li>
                <a href="tel:+51972185187" className="flex items-center gap-3 transition-colors hover:text-peach">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
                    </svg>
                  </span>
                  +51 972 185 187
                </a>
              </li>
              <li>
                <a href="mailto:info@blacktiger.pe" className="flex items-center gap-3 transition-colors hover:text-peach">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
                    </svg>
                  </span>
                  info@blacktiger.pe
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <a
                href="https://www.instagram.com/blacktiger.tattoocare/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-peach"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-peach hover:text-primary">
                  <svg className="h-4 w-4" viewBox="0 0 448 512" fill="currentColor">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </span>
                <span className="text-sm text-white/80">@blacktiger.tattoocare</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-playfair text-lg font-semibold">
              <span className="text-gradient-peach">Extras</span>
            </h3>
            <ul className="space-y-4 text-sm">
              {EXTRA_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-draw inline-block text-white/80 transition-colors hover:text-peach"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 flex flex-col items-center justify-center gap-4 md:col-span-1">
            <Link href="/" className="group">
              <Image
                src="/images/tiger-icon.webp"
                alt="BlackTiger"
                width={160}
                height={151}
                className="transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,188,125,0.3)]"
              />
            </Link>
            <p className="font-raleway text-[10px] uppercase tracking-[0.3em] text-white/40">
              Tattoo Care Products
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-secondary py-4 text-center text-xs text-white/50">
        Todos los derechos reservados, BlackTiger {new Date().getFullYear()} | Desarrollado por{" "}
        <a
          href="https://enigmasac.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-white/70 transition-colors hover:text-peach"
        >
          Enigma Developers S.A.C
        </a>
      </div>
    </footer>
  );
}
