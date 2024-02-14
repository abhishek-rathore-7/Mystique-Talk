import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

/**
 * Sidebar component containing search input, conversation list, and logout button.
 * @returns {JSX.Element} - Returns the JSX for rendering the sidebar.
 */
const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      {/* Search input */}
      <SearchInput />
      {/* Divider */}
      <div className="divider px-3"></div>
      {/* Conversations list */}
      <Conversations />
      {/* Logout button */}
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
