import { useState } from 'react'
import EditOptions from '../../molecules/EditOptions'
import { MdAdd } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import Button from '../../molecules/Button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsContentBeingEdited } from '../../../store/library';
import ImageUploader from '../../molecules/ImageUploader';
import imgPlaceHolder from '../../../assets/imgs/placeholder.png'
import { LuExternalLink } from "react-icons/lu";
import ToolBar from '../../molecules/ToolBar';
import { useLocation } from 'react-router-dom';

const Connect = ({handleCancel, handleDelete, ...props}) => {
  
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(true)

  const [isDisabled, setIsDisabled] = useState(true)

  const [data, setData] = useState({
      title: '',
      description: '',
      image: '',
      link: ''
  })

  useEffect(() => {
    if(data && data.description && data.link) {
        setIsDisabled(false)
    } else {
        setIsDisabled(true)
    }
  }, [data])

  const content = useSelector((state) => state.library.content)
  useEffect(() => {
    const existingData = content.find((r) => r.name === 'Connect')
    if(existingData.value) {
        setData(existingData.value)
        setIsEditing(false)
    }
  }, [])

  useEffect(() => {
    dispatch(toggleIsContentBeingEdited(isEditing))
  }, [isEditing])

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
      <ToolBar setIsEditing={setIsEditing} contentName={'Connect'} handleDelete={handleDelete} />
    }
    {
    isEditing && 
        <EditOptions isDisabled={isDisabled} contentName={'Connect'} fieldData={data} setIsEditing={setIsEditing} handleCancel={handleCancel} />
    }
    <div className={isEditing ? 'border rounded-2xl px-8 py-6 my-8' : 'my-8'}>
    <div className="relative w-full">
        <div className='mb-8'>
            {isEditing ? 
                <>
                    <input type="text" placeholder='Enter title here' className='w-full text-2xl lg:text-4xl font-bold mb-6' value={data.title} onChange={(text) => setData((prevState) => ({
                        ...prevState,
                        title: text.target.value
                    }))} />
                    <input type="text" placeholder='Add subtext here...' className='w-full text-sm mb-7' value={data.description} onChange={(text) => setData((prevState) => ({
                        ...prevState,
                        description: text.target.value
                    }))} />
                    <div className='flex gap-4 items-center'>
                        <ImageUploader
                            handleFile={(file) => setData((prevState) => ({
                                ...prevState,
                                image: file
                            }))}
                            classNames="w-10 h-10 rounded-lg"
                        />
                        <input type="text" placeholder='Lets connect' className='w-full text-sm placeholder-black' value={data.link} onChange={(text) => setData((prevState) => ({
                            ...prevState,
                            link: text.target.value
                        }))} />
                    </div>
                </> :
                <>
                    <h2 className='text-2xl lg:text-4xl font-bold mb-6'>
                        {data.title}
                    </h2>
                    <p className='w-full text-sm mb-7'>{data.description}</p>
                    <div className='flex gap-4 items-center'>
                        <img src={data.image ? data.image : imgPlaceHolder} className={'w-10 h-10 rounded-lg object-cover overflow-hidden'} />
                        <p className='text-sm'>{data.description}</p>
                        <LuExternalLink className='text-secondary' />
                    </div>
                </>
            }
        </div>
    </div>
    </div>
    </div>
  )
}

export default Connect;
