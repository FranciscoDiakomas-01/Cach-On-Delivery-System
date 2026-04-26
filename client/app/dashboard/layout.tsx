import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import UserRole from "@/types/UserRole";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-100 dark:bg-zinc-950 ">
      <Sidebar entity={UserRole.CUSTOMER} />
      <Header />
      <section className=" flex w-[85.7%]  mb-10 place-self-end pt-15  min-h-screen">
        {children}
      </section>
    </main>
  );
}
