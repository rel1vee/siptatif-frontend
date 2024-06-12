import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      <Sidebar />
      <aside className="w-full px-4 pt-10 sm:px-6 md:px-8 lg:ps-72">
        <aside className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-2 mx-auto">
          {children}
        </aside>
      </aside>
    </main>
  );
}
