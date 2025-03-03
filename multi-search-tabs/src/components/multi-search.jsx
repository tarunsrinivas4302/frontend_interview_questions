import { useState, useRef, useEffect } from "react";
import Pills from "./pill.jsx";

export default function MultiSearch() {
  const [searchTxt, setSearchTxt] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUsersSet] = useState(new Set());
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  useEffect(() => {
    setActiveSuggestion(0);
    const fetchUser = () => {
      if (searchTxt.trim() === "") {
        setSuggestions([]);
        setSearchTxt("");
        return;
      }

      fetch(`https://dummyjson.com/users/search?q=${searchTxt}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => console.error(err));
    };
    fetchUser();
  }, [searchTxt]);

  const handleSelectUser = (user) => {
    if (user) {
      setSelectedUsers([...selectedUsers, user]);
      setSelectedUsersSet(new Set([...selectedUserSet, user.email]));
      setSuggestions([]);
      setSearchTxt("");
      setActiveIndex(-1);
      inputRef.current.focus();
    }
  };

  const handleRemoveUser = (user) => {
    const updatedusers = selectedUsers.filter(
      (selecteduser) => selecteduser.email !== user.email
    );
    setSelectedUsers([...updatedusers]);
    selectedUserSet.delete(user.email);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestions([]);
    } else if (e.key === "ArrowDown" && suggestions?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestions.users.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp" && suggestions?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === "Enter" && suggestions?.users?.length > 0) {
      const user = suggestions.users[activeSuggestion];
      setSelectedUsers((prev) => [...prev, user]);
    }
  };

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {selectedUsers &&
          selectedUsers.map((user) => {
            return (
              <Pills
                key={user.email}
                image={user.image}
                text={`${user.firstName} ${user.lastName}`}
                onClick={() => handleRemoveUser(user)}
              />
            );
          })}
        <div>
          <input
            ref={inputRef}
            type="text"
            autoFocus
            value={searchTxt}
            placeholder="Search for Users..."
            onChange={(e) => setSearchTxt(e.target.value)}
            onKeyDown={handleKeyDown}
          />

        
        </div>
      </div>
        {/* dropdown as suggestion  */}
        {suggestions?.users?.length > 0 && (
            <ul className="user-search-suggestions-list">
              {suggestions?.users?.map((user, index) => {
                if (!selectedUserSet.has(user.email)) {
                  return (
                    <li
                      key={user.email}
                      onClick={() => handleSelectUser(user)}
                      className={index === activeSuggestion ? "active" : ""}
                    >
                      <img
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                      />
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                    </li>
                  );
                } else {
                  return <></>;
                }
              })}
            </ul>
          )}
    </div>
  );
}
