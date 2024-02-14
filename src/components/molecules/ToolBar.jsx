import React from 'react'
import { RiMenuFill, RiDeleteBin7Line, RiEditBoxLine } from "react-icons/ri";

const ToolBar = ({setIsEditing, contentName, handleDelete}) => {
  return (
    <div className='flex justify-between items-center'>
        <button className='drag-icon flex items-center justify-center w-8 h-8 rounded-md bg-[#E4E4E4]'>
            <RiMenuFill />
        </button>
        <div className='flex gap-2 items-center'>
            <button className='flex items-center justify-center w-8 h-8 rounded-md bg-[#E4E4E4]' onClick={() => handleDelete(contentName)}>
                <RiDeleteBin7Line />
            </button>
            <button className='flex items-center justify-center w-8 h-8 rounded-md bg-[#E4E4E4]' onClick={() => setIsEditing(true)}>
                <RiEditBoxLine />
            </button>
        </div>
    </div>
  )
}

export default ToolBar