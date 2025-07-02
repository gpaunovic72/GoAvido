import UserDashboard from "../components/dashboard/UserDashboard";
import TakeOfPictures from "../components/galleryPage/TakeOfPictures";
import Header from "../components/Header";

export default function Gallery() {
  return (
    <div className="flex flex-col relative overflow-hidden min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0BAACA] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200%] lg:w-[1000px] lg:h-[400%] transform rotate-[-60deg] z-0" />
      <div className="relative z-10">
        <Header />
        <UserDashboard />
        <TakeOfPictures />
      </div>
    </div>
  );
}
