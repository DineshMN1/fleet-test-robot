
import { Header } from "@/app/components/sections/Header";
import { Sidebar } from "@/app/components/sections/Sidebar";
import { Footer } from "@/app/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Content here */}
          <h1 className="text-black">Welcome to the Dashboard</h1>
        </main>
        <Footer />
      </div>
    </div>
  );
}


