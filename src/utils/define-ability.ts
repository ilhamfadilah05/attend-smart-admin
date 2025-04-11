import { defineAbility } from "@casl/ability";

export default function defineAbilityFor(data: any[]) {
  return defineAbility((can) => {
    if (data && Array.isArray(data)) {
      data.forEach((access: any) => {
        can(access.action, access.subject);
      });
    }
  });
}
