import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pomogato - Pomodoro Timer for ADHD",
  description:
    "A cat-themed Pomodoro timer with ADHD-friendly study techniques. Stay focused with your feline study buddy!",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐱</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-cream text-charcoal antialiased">{children}</body>
    </html>
  );
}
