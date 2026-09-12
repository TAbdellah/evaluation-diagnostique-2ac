import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diagnostic numérique 2AC",
  description: "Questionnaire et évaluation diagnostique bilingue en informatique pour la deuxième année collégiale.",
  icons: { icon: "./favicon.svg", shortcut: "./favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
