import { metaObject } from "@/config/site.config";
import AppointmentDashboard from "@/app/shared/appointment/dashboard";
import { Title } from "rizzui";

export const metadata = {
  ...metaObject("Dashboard"),
};

export default function Home() {
  return (
    <div>
      <Title>Dashboard</Title>
    </div>
  );
  // return <AppointmentDashboard />;
}
