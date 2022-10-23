import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const getListsOfItems = ()=>{
    const list = localStorage.getItem('ListsOfItems');
    if(list){
        return JSON.parse(list)
    }else{
        return [];
    }
}
export const TodoList = () => {
    const [item,setItem] = useState("");
    const [addItems,setAddItems] = useState(getListsOfItems);
    const [togglebtn,setToggleBtn] = useState(true);
    const [itIsId,setItisId] = useState(null);
    const EnterItem = (e)=>{
        setItem(e.target.value);
    }
    const AddItems = ()=>{
        const obj = {id:new Date().getTime().toString(), name:item}
        if(obj.name === ""){
            alert("Add Something");
        }else if(!togglebtn){
            setAddItems((oldItems)=>{
                return oldItems.map((elem)=>{
                    if(elem.id === itIsId){
                        return {...elem,name:item}
                    }
                    return elem;
                })
            })
            setToggleBtn(true)
        }else{
            setAddItems((oldItems)=>{
                return [...oldItems,obj];
            })
        }
        setItem(" ");
        
    }
    const DeleteItem = (id)=>{
        setAddItems((oldItems)=>{
            return oldItems.filter((elem)=>{
                return elem.id !== id;
            })
        })
    }
    useEffect(()=>{
        localStorage.setItem('ListsOfItems',JSON.stringify(addItems))
    },[addItems])
    const EditItem = (id)=>{
        const elemEdit = addItems.find((elem)=>{
            return elem.id === id;
        })
        setToggleBtn(false);
        setItisId(elemEdit.id);
        setItem(elemEdit.name);
        
    }
  return (
    <>
    <div>
        <h1>TODO LIST</h1>
        <div>
            <input type="text" value={item} onChange={EnterItem} />
            {togglebtn?<button onClick={AddItems}>+</button>:<button onClick={AddItems}>edit</button>}
            
        </div>
        <ol>
            {addItems.map((elem)=>{
                return <li key={elem.id}>{elem.name} <button onClick={()=>EditItem(elem.id)}>edit</button><button onClick={()=>DeleteItem(elem.id)}>-</button></li>
            })}
        </ol>
    </div>
    </>
  )
}
