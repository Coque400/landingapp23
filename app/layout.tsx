import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aventuria App | Planea, ahorra y viaja",
  description: "Conoce la próxima app de Aventuria: un agente de viajes iA, metas de ahorro y opciones para acercarte a tu próximo destino.",
  icons: { icon: "/assets/isotipo-aventuria.png", shortcut: "/assets/isotipo-aventuria.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-MX"><body>{children}</body></html>;
}
