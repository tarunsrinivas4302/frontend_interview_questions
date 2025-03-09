

import React, { useState } from "react";
import FileExplorer from "./components/file-explorer";
import explorerData from "./data/data.json";
import "./App.css";

function App() {


    const [data, setData] = useState(sortTree(explorerData));
    function sortTree(data) {
        return data
            .map(node => ({
                ...node,
                children: node.children ? sortTree(node.children) : node.children
            }))
            .sort((a, b) => {
                if (a.isFolder && !b.isFolder) return -1;  // Folders first
                if (!a.isFolder && b.isFolder) return 1;   // Files last
                return a.name.localeCompare(b.name);       // Sort alphabetically
            });
    };




    // Function to add a folder or file inside a specific folder
    const addFolder = (folderID, isFolder, itemName, tree) => {
        return tree.map((node) => {
            if (node.id === folderID && node.isFolder) {
                const newItem = {
                    id: crypto.randomUUID(),
                    isFolder,
                    name: itemName,
                    children: isFolder ? [] : null
                };

                return {
                    ...node,
                    children: node.children ? [...node.children, newItem] : [newItem]
                };
            }

            // Recursively update children if the node has any
            if (node.children) {
                return { ...node, children: addFolder(folderID, isFolder, itemName, node.children) };
            }

            return node;
        });
    };

    const removeFolder = (id, tree) => {
        return tree
            .map((node) => {
                if (node.id === id) return null;
                if (node.children) {
                    const updatedChildren = removeFolder(id, node.children).filter(Boolean);
                    return { ...node, children: updatedChildren };
                }
                return node;
            })
            .filter(Boolean);
    };

    const renameNode = (id, itemName, tree) => {
        return tree.map((node) => {
            if (node.id === id) return {...node, name: itemName };

            if (node.children) {
                return {
                   ...node,
                    children: renameNode(id, itemName, node.children)
                };
            }

            return node;
        });
    }

    const renameFolder = (folderID, itemName) => {
        setData((prevData) => sortTree(renameNode(folderID, itemName, prevData)));
    }

    const handleAddFolder = (folderID, isFolder, itemName) => {
        setData((prevData) => sortTree(addFolder(folderID, isFolder, itemName, prevData)));
    };

    const handleRemoveFolder = (id) => {
        setData((prevData) => sortTree(removeFolder(id, prevData)));
    };

    return (
        <>
            {data.map((item) => (
                <FileExplorer
                    key={item.id}
                    data={item}
                    addFolder={handleAddFolder}
                    removeFolder={handleRemoveFolder}
                    renameFolder={renameFolder}
                />
            ))}
        </>
    );
}

export default App;
