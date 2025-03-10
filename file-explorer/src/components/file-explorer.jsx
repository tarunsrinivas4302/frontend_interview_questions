import React, { useState } from "react";

const FileExplorer = ({ data, addFolder, removeFolder, renameFolder }) => {
    const [isOpen, setIsOpen] = useState({});
    const [name, setName] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [isFolder, setIsFolder] = useState(false);
    const [isRename, setIsRename] = useState(false)

    const handleClick = (id) => {
        setIsOpen((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleAddFolder = (e, id, isFolder) => {
        e.stopPropagation();
        setShowInput(true);
        setIsFolder(isFolder);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && name.trim() !== "") {
            if (isRename) {
                renameFolder(data.id, name)
            } else {
                addFolder(data.id, isFolder, name);
            }
            setName("");
            setShowInput(false);
        }
    };

    const handleRemove = () => {
        removeFolder(data.id);
    };
    const handleBlur = () => {
        setShowInput(false);
        setIsRename(false);
    }
    const handleRename = () => {
        setShowInput(true);
        setIsRename(true);
    };

    return (
        <div style={{ marginLeft: "10px" }}>
            <div style={{ marginTop: "10px" }} className="folder" onClick={() => handleClick(data.id)} onDoubleClick={handleRename} >
                {data.isFolder ? (isOpen[data.id] ? "📂" : "📁") : "📃"}
                {data.name}

                {data.isFolder && (
                    <>
                        <button onClick={(e) => handleAddFolder(e, data.id, true)}>+ 📁</button>
                        <button onClick={(e) => handleAddFolder(e, data.id, false)}>+ 📃</button>

                    </>
                )}
                <button onClick={handleRename}>✏️</button>
                <button onClick={handleRemove}>🗑️</button>
            </div>

            {showInput && (
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    style={{ marginLeft: "20px" }}
                />
            )}

            {isOpen[data.id] && data.children && (
                <div style={{ marginLeft: "10px" }}>
                    {data.children.map((child) => (
                        <FileExplorer key={child.id} data={child} addFolder={addFolder} removeFolder={removeFolder} renameFolder={renameFolder}/>
                    ))}
                </div>
            )}

        </div>
    );
};

export default FileExplorer;
