import Header from "../components/Header";
import UserDashboard from "../components/UserDashboard";
export default function Home() {
  return (
    <div className="flex flex-col h-screen relative overflow-hidden bg-[#F5F5F5]">
      <div className="bg-[#0BAACA] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200%] lg:w-[1000px] lg:h-[400%] transform rotate-[-60deg] z-0" />
      <div className="relative z-10">
        <Header />
        <UserDashboard />
      </div>
    </div>
  );
}
