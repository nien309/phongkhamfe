import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BackToTop from "@/components/ui/backtotop";
import CozeChat from "@/components/ui/cozechat";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     <>
      <Header />
        <main className="text-black">
            {children}
        </main>
        <BackToTop />
        <CozeChat />
        <Footer />
        
    </>
    );
  }

