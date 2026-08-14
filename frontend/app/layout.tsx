import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./components/AuthContext";
import { Header } from "./components/Header";

export const metadata: Metadata = {
  title: {
    default: "Meetup Link",
    template: "%s | Meetup Link",
  },
  description: "イベントを作成し、参加予定を管理するための個人開発Webアプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-100 text-gray-900 antialiased">
        <AuthProvider>
          <Header />
          <main className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
