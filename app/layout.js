import { Inter } from 'next/font/google';
import ClientProvider from './ClientProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Footy app",
  description: "Football app bringing you real-time data from all leagues",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ClientProvider>
          {children}
      </ClientProvider>
     </body>
    </html>
  );
}
