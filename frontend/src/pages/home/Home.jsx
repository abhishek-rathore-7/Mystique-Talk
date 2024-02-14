import MessageContainer from "../../components/messages/MessageContainer.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";

/**
 * Home page component displaying sidebar and message container.
 * @returns {JSX.Element} - Returns the JSX for rendering the home page.
 */
const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {/* Sidebar component */}
      <Sidebar />
      {/* Message container component */}
      <MessageContainer />
    </div>
  );
};

export default Home;
