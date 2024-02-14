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
import ToolBar from '../../molecules/ToolBar';
import { useLocation } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Experience = ({handleCancel, handleDelete, ...props}) => {
  
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(true)

  const [isDisabled, setIsDisabled] = useState(true)

  const [data, setData] = useState({
      description: '',
      list: []
  })

  const [currentCard, setCurrentCard] = useState({})

  const handleCurrentCardChange = (id, value) => {
    setCurrentCard(prevState => ({
        ...prevState,
        [id]: value
    }));
  }

  const [addCardOpen, setAddCardOpen] = useState(false);
  const [isAddDisabled, setIsAddDisabled] = useState(true)

  useEffect(() => {
    if(currentCard.title && currentCard.location && currentCard.timeline && currentCard.designation) {
        setIsAddDisabled(false)
    } else {
        setIsAddDisabled(true)
    }
  }, [currentCard])

  useEffect(() => {
    if(data && data.description && data.list && data.list.length > 0) {
        setIsDisabled(false)
    } else {
        setIsDisabled(true)
    }
  }, [data])

  const handleSave = () => {
    setData(prevState => ({
        ...prevState,
        list: (prevState.list || []).concat(currentCard)
    }));
    setIsAddDisabled(true)
    setCurrentCard({})
    setAddCardOpen(false)
  }

  const content = useSelector((state) => state.library.content)
  useEffect(() => {
    const existingData = content.find((r) => r.name === 'Experience')
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

  const handleRemove = (title) => {
    console.log(title)
    const newData = data.list.filter((item) => item.title !== title)
    setData(prevState => ({
        ...prevState,
        list: newData
    }));
  }

  return (
    <div {...props}>
    {
      showTools &&
      <ToolBar setIsEditing={setIsEditing} contentName={'Experience'} handleDelete={handleDelete} />
    }
    {
    isEditing && 
        <EditOptions isDisabled={isDisabled} contentName={'Experience'} fieldData={data} setIsEditing={setIsEditing} handleCancel={handleCancel} />
    }
    <div className={isEditing ? 'border rounded-2xl px-8 py-6 my-8' : 'my-8'}>
        <div className="relative w-full">
            <div className='mb-8'>
                <h2 className='text-2xl lg:text-4xl font-bold mb-4'>
                    Experience
                </h2>
                {isEditing ? 
                    <input type="text" placeholder='Add subtext here...' className='w-full text-sm' value={data.description} onChange={(text) => setData((prevState) => ({
                        ...prevState,
                        description: text.target.value
                    }))} /> :
                    <p className='w-full text-sm'>{data.description}</p>
                }
            </div>
            <div className='grid gap-8'>
                {
                    data.list && data.list.length > 0 && data.list.map((card, i) => (
                        <div key={`card_${i}`} className='relative rounded-2xl px-8 py-6 flex flex-col justify-between bg-white border'>
                            {isEditing &&
                                <button className='absolute top-4 right-4' onClick={(() => handleRemove(card.title))}>
                                    <AiOutlineCloseCircle size={20} />
                                </button>
                            }
                            <div>
                                <div className='flex flex-col lg:flex-row gap-3 lg:gap-7 items-start lg:items-center'>
                                    <img src={card.image ? card.image : imgPlaceHolder} className={'w-14 h-14 rounded-lg object-cover overflow-hidden'} />
                                    <div className='flex gap-2 items-center'>
                                        <p className='font-semibold'>{card.title}</p>
                                        <p className='text-xs'>{card.designation}</p>
                                    </div>
                                    <div className='flex lg:ml-2 gap-2 items-center'>
                                        <p className='text-xs text-gray-400'>{card.location}</p>
                                        <p className='text-xs text-gray-400'>●</p>
                                        <p className='text-xs text-gray-400'>{card.timeline}</p>
                                    </div>
                                </div>
                                {
                                    card.description
                                    &&
                                    <p className='w-full text-sm mt-6'>{card.description}</p>
                                }
                            </div>
                        </div>
                    ))
                }
                {
                    addCardOpen ? 
                    <div className='relative rounded-2xl px-8 py-6 flex flex-col justify-between bg-white border'>
                        <div>
                            <button className='absolute top-4 right-4' onClick={() => (setAddCardOpen(false), setCurrentCard({}))}>
                                <AiOutlineCloseCircle size={20} />
                            </button>
                            <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center mb-6'>
                                <ImageUploader
                                    handleFile={(file) => {
                                        handleCurrentCardChange('image', file);
                                    }}
                                    classNames="w-14 h-14 rounded-lg"
                                />
                                <div>
                                    <input type="text" placeholder='Enter company title' className='w-full font-semibold mb-1' onChange={(text) => handleCurrentCardChange('title', text.target.value)} />
                                    <input type="text" placeholder='Enter designation' className='w-full mb-1' onChange={(text) => handleCurrentCardChange('designation', text.target.value)} />
                                </div>
                            </div>
                            <div className='flex gap-2 flex-col lg:flex-row items-start lg:items-center mb-5'>
                                <input type="text" placeholder='+ Add location' className='text-sm placeholder-gray-400' onChange={(text) => handleCurrentCardChange('location', text.target.value)} />
                                <input type="text" placeholder='+ Add timeline' className='text-sm placeholder-gray-400' onChange={(text) => handleCurrentCardChange('timeline', text.target.value)} />
                            </div>
                            <input type="text" placeholder='Add description...' className='w-full text-sm placeholder-black' onChange={(text) => handleCurrentCardChange('description', text.target.value)} />
                        </div>
                        <div className='text-right mt-5'>
                            <Button
                                isDisabled={isAddDisabled}
                                data={{
                                    title: "Add",
                                    type: "button",
                                    handleClick: handleSave,
                                }}
                            />
                        </div>
                    </div>
                    :
                    <>
                    {
                        isEditing && 
                        <div onClick={() => (setIsDisabled(true), setAddCardOpen((prevState) => !prevState))} className='cursor-pointer addCard rounded-2xl px-8 py-6 bg-[#EEEEEE] border flex gap-2 justify-center items-center'>
                            <MdAdd />
                            <p className='text-sm'>Add new card</p>
                        </div>
                    }
                    </>
                }
            </div>
        </div>
    </div>
    </div>
  )
}

export default Experience;
