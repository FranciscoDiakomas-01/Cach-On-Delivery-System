import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import UserRole from "@/types/UserRole";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-100 ">
      <Sidebar entity={UserRole.ADMIN} />
      <Header />
      <section className=" flex w-[85.7%] place-self-end pt-15  min-h-screen">
        {children}
      </section>
    </main>
  );
}
