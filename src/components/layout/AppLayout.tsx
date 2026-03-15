import Header from './Header'
import Footer from './Footer'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FEFCF8]">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  )
}
