
import { ReactNode } from "react";
import { ThemeRegistry } from "@/components/ThemeRegistry";

export const metadata = {
  title: "Pokemon App",
  description: "Busca Pokemons con Next.js y MUI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
