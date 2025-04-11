"use client";

import AppointmentStats from "@/app/shared/appointment/dashboard/appointment-stats";
import UpcomingAppointmentTable from "@/app/shared/appointment/dashboard/upcoming-appointment-table";
import AppointmentDiseases from "@/app/shared/appointment/dashboard/appointment-diseases";
import Department from "@/app/shared/appointment/dashboard/department";
import TotalAppointment from "@/app/shared/appointment/dashboard/total-appointment";
import Patients from "@/app/shared/appointment/dashboard/patients";
import PatientAppointment from "@/app/shared/appointment/dashboard/patient-appointment";
import ScheduleList from "@/app/shared/appointment/dashboard/schedule-list";
import AppointmentTodo from "@/app/shared/appointment/dashboard/appointment-todo";
import { useRoleChecker } from "@/utils/role-checker";
import { useEffect } from "react";
import { UserApi } from "@/app/(hydrogen)/user/user.api";
import { MapProvider } from "../../maps/provider";
import { MapComponent } from "../../maps/component";

export default function AppointmentDashboard() {
  const { ability } = useRoleChecker();

  useEffect(() => {
    UserApi.me();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6 @container @[59rem]:gap-7">
      <AppointmentStats className="col-span-full" />
      <TotalAppointment className="col-span-full @[90rem]:col-span-7" />
      {/* <AppointmentTodo className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-4" />
      <Patients className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-4" />
      <Department className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-4" />
      <AppointmentDiseases className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-5" /> */}
      <UpcomingAppointmentTable className="col-span-full" />
      <MapProvider>
        <MapComponent />
      </MapProvider>
    </div>
  );
}
