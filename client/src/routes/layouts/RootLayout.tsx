import { Toaster } from "@/components/ui/toaster";
import { Outlet, Link } from "react-router-dom";
import Footer from "@/components/Footer";

export default function RootLayout() {
  return (
    <main className="w-full min-h-screen relative z-0 font-poppins antialiased">
      <div className="w-full h-20 sticky top-0 left-0 z-50 grid place-items-center border-b bg-background">
        <Link to="/">
          <span className="text-lg uppercase">
            <span className="text-foreground font-normal">Weather</span>
            &nbsp;
            <span className="text-primary font-medium">Bot</span>
          </span>
        </Link>
      </div>
      <Outlet />
      <Footer />
      <Toaster />
    </main>
  );
};
