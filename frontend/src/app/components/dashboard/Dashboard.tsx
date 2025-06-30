import Header from "../Header";
import ProfileForm from "./ProfileForm";
import UserDashboard from "./UserDashboard";

export default function Dashboard() {
  return (
    <div>
      <div className="relative z-10">
        <Header />
        <UserDashboard />
        <ProfileForm />
      </div>
    </div>
  );
}
