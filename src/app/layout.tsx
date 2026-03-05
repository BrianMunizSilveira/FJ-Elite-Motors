import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FJ Elite Motors | Veículos Premium e Seminovos",
  description: "A FJ Elite Motors oferece os melhores veículos premium e seminovos de São Paulo. Qualidade, confiança e transparência na compra do seu carro novo.",
  keywords: ["carros", "seminovos", "veículos premium", "compra e venda", "FJ Elite Motors"],
  openGraph: {
    title: "FJ Elite Motors | Veículos Premium e Seminovos",
    description: "A FJ Elite Motors oferece os melhores veículos premium e seminovos de São Paulo. Qualidade, confiança e transparência na compra do seu carro novo.",
    url: 'https://fj-motors.vercel.app',
    siteName: 'FJ Elite Motors',
    images: [
      {
        url: 'https://fj-motors.vercel.app/opengraph-image',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "FJ Elite Motors | Veículos Premium e Seminovos",
    description: "A FJ Elite Motors oferece os melhores veículos premium e seminovos de São Paulo.",
    images: ['https://fj-motors.vercel.app/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-black min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
