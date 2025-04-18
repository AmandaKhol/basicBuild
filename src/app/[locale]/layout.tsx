import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import ModalProvider from "./components/modals/Provider";
import NavBar from "./components/NavBar";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amanda Khôl",
  description: "NextJS App",
};

export function generateStaticParams() {
  const categories = ["vegan", "vegetarian"];
  return routing.locales.flatMap((locale) =>
    categories.map((category) => ({ locale, category }))
  );
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col ${roboto.className}`}>
        <NextIntlClientProvider>
          <ModalProvider>
            <NavBar />
            <main className="flex-1 w-fullflex">{children}</main>
            <Footer />
          </ModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
