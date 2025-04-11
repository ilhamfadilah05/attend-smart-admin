export function isAuthorized(access: any, subject: string, action: string) {
  if (access) {
    for (let i = 0; i < access.length; i++) {
      if (access[i].subject === subject && access[i].action === action) {
        return true;
      }
    }
    return false;
  }
}
