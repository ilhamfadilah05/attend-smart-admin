/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { atom, useAtom } from "jotai";
import defineAbilityFor from "@/utils/define-ability";
import { routes } from "@/config/routes";
import { getLocalStorage, KACCESS_TOKEN, KROLES, KUSER, removeLocalStorage } from "./localstorage";

interface Role {
  action: string;
  subject: string;
}

const definedAbilityAtom = atom(null);

const roleCheckerWithPersistance = atom(
  (get) => get(definedAbilityAtom),
  (_, set, newStorage: any) => {
    set(definedAbilityAtom, newStorage);
  }
);

export const getRoles = () => {
  let roles: Role[] = [];
  const getter = getLocalStorage<Role[]>(KROLES);
  if (getter) roles = getter;

  return roles;
};

export function useRoleChecker() {
  const [ability, setAbility] = useAtom(roleCheckerWithPersistance);
  const roles = getRoles();

  const initialAbility = defineAbilityFor(roles.length ? roles : [{ action: "read", subject: "dashboard" }]) || [];

  return {
    ability: ability === null ? initialAbility : ability,
    setAbility,
  };
}

export const globalSignOutOnError = async () => {
  try {
    if (typeof window !== "undefined") {
      const lastPath = window.location.pathname + window.location.search;

      removeLocalStorage(KUSER);
      removeLocalStorage(KROLES);
      removeLocalStorage(KACCESS_TOKEN);
      window.location.replace(`${routes.signIn}?error=unauthorized&last-path=${lastPath}`);
    }
  } catch (error) {
    console.error(error);
  }
};
