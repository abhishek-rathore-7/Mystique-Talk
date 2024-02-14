import { useState } from "react";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import { useConversationContext } from "../../context/ConversationContext";
import useGetConversations from "../../hooks/useGetConversations";

/**
 * SearchInput component for searching conversations.
 * @returns {JSX.Element} - Returns the JSX for rendering the search input.
 */
const SearchInput = () => {
  // State for search input value
  const [search, setSearch] = useState("");
  // Accessing setSelectedConversation function from conversation context
  const { setSelectedConversation } = useConversationContext();
  // Fetching conversations from API
  const { conversations } = useGetConversations();

  /**
   * Handles form submission to search for a conversation.
   * @param {Event} e - The form submission event.
   */
  function handleSubmit(e) {
    e.preventDefault();
    // Trim search text and check if it's empty
    if (!search.trim()) return;

    // Validation: search text must be at least 3 characters
    if (search.length < 3) {
      toast.error("Search text must be at least 3 characters");
      return;
    }

    // Find conversation matching search criteria
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    // If conversation found, set it as selected conversation and clear search input
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      // If no matching conversation found, display error toast
      toast.error("No such user found!");
    }
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      {/* Search input field */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search…"
        className="input input-bordered rounded-full"
      />
      {/* Search button */}
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
