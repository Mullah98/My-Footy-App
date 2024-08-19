import { Inter } from 'next/font/google';
import ClientProvider from './ClientProvider';
import Navbar from './navbar/component';

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
      <Navbar />
          {children}
      </ClientProvider>
     </body>
    </html>
  );
}
