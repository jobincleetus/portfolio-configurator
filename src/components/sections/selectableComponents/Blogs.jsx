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

const Blogs = ({handleCancel, handleDelete, ...props}) => {
  
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
    if(currentCard.title && currentCard.link) {
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
    const existingData = content.find((r) => r.name === 'Blogs')
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
      <ToolBar setIsEditing={setIsEditing} contentName={'Blogs'} handleDelete={handleDelete} />
    }
    {
    isEditing && 
        <EditOptions isDisabled={isDisabled} contentName={'Blogs'} fieldData={data} setIsEditing={setIsEditing} handleCancel={handleCancel} />
    }
    <div className={isEditing ? 'border rounded-2xl px-8 py-6 my-8' : 'my-8'}>
        <div className="relative w-full">
            <div className='mb-8'>
                <h2 className='text-2xl lg:text-4xl font-bold mb-4'>
                    Blogs & resources
                </h2>
                {isEditing ? 
                    <input type="text" placeholder='Add subtext here...' className='w-full text-sm' value={data.description} onChange={(text) => setData((prevState) => ({
                        ...prevState,
                        description: text.target.value
                    }))} /> :
                    <p className='w-full text-sm'>{data.description}</p>
                }
            </div>
            <div className='grid lg:grid-cols-2 gap-8'>
                {
                    data.list && data.list.length > 0 && data.list.map((card, i) => (
                        <div key={`card_${i}`} className='relative rounded-2xl px-8 py-6 flex flex-col justify-between bg-white border'>
                            {isEditing &&
                                <button className='absolute top-4 right-4' onClick={(() => handleRemove(card.title))}>
                                    <AiOutlineCloseCircle size={20} />
                                </button>
                            }
                            <div>
                                <img src={card.image ? card.image : imgPlaceHolder} className={'w-10 h-10 mb-3 rounded-lg object-cover overflow-hidden'} />
                                <p className='w-full mb-2 text-black'>{card.title}</p>
                                <div className='flex gap-2 items-center mb-3'>
                                    <p className='w-full text-sm placeholder-grey-400'>{card.link}</p>
                                </div>
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
                            <ImageUploader
                                handleFile={(file) => {
                                    handleCurrentCardChange('image', file);
                                }}
                                classNames="w-10 h-10 mb-3 rounded-lg"
                            />
                            <input type="text" placeholder='Enter title here...' className='w-full mb-3 placeholder-grey-400' onChange={(text) => handleCurrentCardChange('title', text.target.value)} />
                            <div className='flex gap-2 items-center'>
                                <FaLink className='text-secondary' />
                                <input type="text" placeholder='Add link' className='w-full text-sm placeholder-secondary' onChange={(text) => handleCurrentCardChange('link', text.target.value)} />
                            </div>
                        </div>
                        <div className='text-right mt-5'>
                            <Button
                                isDisabled={isAddDisabled}
                                data={{
                                    title: "Add",
                                    type: "button",
                                    handleClick: !isAddDisabled ? handleSave : null,
                                }}
                            />
                        </div>
                    </div>
                    :
                    <>
                    {
                        isEditing && 
                        <div onClick={() => (setIsDisabled(true), setAddCardOpen((prevState) => !prevState))} className='cursor-pointer addCard min-h-[200px] rounded-2xl px-8 py-6 bg-[#EEEEEE] border flex flex-col justify-center items-center'>
                            <MdAdd />
                            <p className='text-sm mt-2'>Add new card</p>
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

export default Blogs;
