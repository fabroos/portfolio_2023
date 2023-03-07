import Layout from '@/components/DefaultLayout'
import ThemeButton from '@/components/theme'
import Link from 'next/link'
import './globals.css'
import '@/font/font-loader.css'

export const metadata = {
  title: 'FABROOS',
  description: 'Fabrizio Signoretta\'s personal website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className='bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 w-full font-extralight flex flex-col min-h-screen'>
        <header className='h-16 flex justify-between container mx-auto items-center px-4'>
          <h1>FABROOS</h1>
          <nav className='gap-6 hidden sm:flex'>
            <Link href="/">HOME</Link>
            <Link href="/#Projects">PROJECTS</Link>
            <Link href="/#Contact">CONTACT ME</Link>
            <ThemeButton/>
          </nav>
        </header>
        <Layout>
          <main className='flex-1'>
            {children}
          </main>
        </Layout>
      </body>
    </html>
  )
}
