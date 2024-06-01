import { useEffect } from "react";
import { api } from "~/utils/api";

export default function useUserRoles(email: string) {
  function UserRolesComponent() {
    const user = api.user.getRole.useQuery({ email: email });

    useEffect(() => {}, [user]);

    return user;
  }

  return UserRolesComponent();
}
