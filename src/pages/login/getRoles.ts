import { useEffect } from 'react';  // Import the useEffect hook
import { api } from "~/utils/api";

export default function useUserRoles(email: string) {
    // Define a function component to use the hook
    function UserRolesComponent() {
        const user = api.user.getRole.useQuery({ email: email });

        useEffect(() => {
            // Any additional logic you want to run when the component mounts or updates
        }, [user]);  // Add dependencies if needed

        return user;
    }

    return UserRolesComponent();  // Call the component to use the hook
}
