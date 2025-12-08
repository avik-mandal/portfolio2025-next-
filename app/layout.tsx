import './globals.css'
import type { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/footer'

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio',
  description: 'A frontend-only portfolio built with Next, TypeScript, Tailwind and lucide-react'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-sky-50 text-slate-800 min-h-screen">
        <Header />
        <main className="max-w-[1100px] mx-auto p-6">{children}</main>
         <Footer />
      </body>
    </html>
  )
}
