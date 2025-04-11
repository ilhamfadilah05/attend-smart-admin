"use client";

import { SessionProvider } from "next-auth/react";
import { useLocalStorage } from "react-use";

export default function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}): React.ReactNode {
  const [accessToken, setaccessToken] = useLocalStorage("accessToken", "");

  if (!accessToken) {
    setaccessToken(session?.user?.accessToken);
    // localStorage.setItem('user', session.user); // ! Kalo di pake
    // localStorage.setItem('accessToken', session?.user?.accessToken);
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
