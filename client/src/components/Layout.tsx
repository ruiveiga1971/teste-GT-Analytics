import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gt-bg-slate-50">
      <Navigation />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
