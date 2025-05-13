import { metaObject } from "@/config/site.config";
import AppointmentDashboard from "@/app/shared/appointment/dashboard";
import { Title } from "rizzui";
import Dashboard from "../shared/dashboard";

export const metadata = {
  ...metaObject("Dashboard"),
};

export default function Home() {
  return (
    <div>
      <Dashboard />
    </div>
  );
  // return <AppointmentDashboard />;
}
