import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--vm-font-sans-loaded"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--vm-font-mono-loaded"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--vm-font-serif-loaded"
});

export const metadata: Metadata = {
  title: "Variantmidia | Gestor de jornada de compra",
  description:
    "A Variantmidia ajuda escritórios de advocacia a diagnosticar gargalos de oferta, demanda e conversão para atrair, qualificar e converter melhores oportunidades.",
  openGraph: {
    title: "Variantmidia | Gestor de jornada de compra",
    description:
      "Diagnóstico de gargalos de oferta, demanda e conversão para escritórios de advocacia.",
    siteName: "Variantmidia",
    locale: "pt_BR",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${jetBrainsMono.variable} ${fraunces.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
