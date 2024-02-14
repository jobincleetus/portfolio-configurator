import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { toggleIsContentBeingEdited } from '../../../store/library'
import Editor from '../../../utils/CustomEditor'
import EditOptions from '../../molecules/EditOptions'
import ToolBar from '../../molecules/ToolBar'

const AboutYou = ({handleCancel, handleDelete, ...props}) => {

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(true)

  const [isDisabled, setIsDisabled] = useState(true)

  const [data, setData] = useState(null)

  const handleContent = (content) => {
    setData(content)

    if(content) {
      setIsDisabled(false)
      return
    }
    setIsDisabled(true)
  }

  const content = useSelector((state) => state.library.content)
  useEffect(() => {
    const existingData = content.find((r) => r.name === 'About')
    if(existingData.value) {
        setData(existingData.value)
        setIsEditing(false)
    }
  }, [])

  const location = useLocation();

  const [showTools, setShowTools] = useState(false)

  useEffect(() => {
    dispatch(toggleIsContentBeingEdited(isEditing))
    if(!isEditing && location.pathname === '/edit') {
      setShowTools(true);
    } else {
      setShowTools(false);
    }
  }, [isEditing])

  return (
    <div {...props}>
      {
        showTools &&
        <ToolBar setIsEditing={setIsEditing} contentName={'About'} handleDelete={handleDelete} />
      }
      {
        isEditing && 
        <EditOptions isDisabled={isDisabled} contentName={'About'} fieldData={data} setIsEditing={setIsEditing} handleCancel={handleCancel} />
      }
      <div className={isEditing ? 'border rounded-2xl px-8 py-6 my-8' : 'my-8'}>
        <h2 className='text-2xl lg:text-4xl font-bold'>
          About Me
        </h2>
        {
          isEditing ?
          <div className="relative w-full">
            <Editor getContent={(content) => handleContent(content)} />
          </div> :
          <div className="relative w-full my-5" dangerouslySetInnerHTML={{ __html: data }}></div>
        }
      </div>
    </div>
  )
}

export default AboutYou
