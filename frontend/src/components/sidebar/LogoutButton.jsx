import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout.js";

/**
 * LogoutButton component for displaying a logout button.
 * @returns {JSX.Element} - Returns the JSX for rendering the logout button.
 */
const LogoutButton = () => {
  // Accessing loading state and logout function from custom hook
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {/* Render logout button or loading spinner based on loading state */}
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};
export default LogoutButton;
