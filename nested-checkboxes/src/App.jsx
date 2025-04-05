
import { useState } from 'react';
import './App.css'
import CheckBoxes from './components/nested-checkboxes'
import commentsData from './data/data.js'
function App() {
 
  const addParentId = (data , parentId = null) => {
    return data.map((node) => {
      const newNode = {...node , parentId}
      if(node.children && Array.isArray(node.children) && node.children.length > 0){
        newNode.children = addParentId(node.children , node.id);
      }
      return newNode;
    })
  }

  const [data , setData] = useState(addParentId(commentsData));


  const findNodeById = (id, tree=data) => {
    return tree.flatMap((item) => {
      if(item.id === id){
       return [item];
      }
      if(item.children && Array.isArray(item.children) && item.children.length > 0){
        return findNodeById(id, item.children);
      }
      return []; 
    })
  }
  const handleChange = (id) => {
    console.log(id);
    const node = findNodeById(id, data)[0];
    if(node){
      const newCheckedState = !node.isChecked;
      updatedNodeCheckedState(node , newCheckedState);
      setData([...data]);   
      updateParentStates(node);
    }
  }

  const updateParentStates = (node) => {
    const parentNode = findNodeById(node.parentId)
    if(parentNode && parentNode.length > 0){
      const parent = parentNode[0];
      const allChildrenChecked = parent.children.every((child) => child.isChecked);
      const anyChecked= parent.children.some((child) => child.isChecked);
      parent.isChecked = allChildrenChecked;
      parent.indeterminate = !allChildrenChecked && anyChecked;
      updateParentStates(parent);
    }
  }

  const updatedNodeCheckedState = (node , isChecked) => {
    node.isChecked = isChecked;
    if(node.children){
      node.children.forEach((child) => updatedNodeCheckedState(child, isChecked));
    }
  }
  return (
    <>
      <h1>Nested Checkboxes</h1>
      {
        data.map((item) => <CheckBoxes item={item} key={item.id} onChange={handleChange}/>)
      }
    </>
  )
}

export default App
