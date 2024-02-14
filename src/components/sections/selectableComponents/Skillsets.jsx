import { useState } from 'react'
import EditOptions from '../../molecules/EditOptions'
import { MdAdd, MdAddCircleOutline, MdOutlineRemoveCircleOutline } from "react-icons/md";
import Button from '../../molecules/Button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsContentBeingEdited } from '../../../store/library';
import ToolBar from '../../molecules/ToolBar';
import { useLocation } from 'react-router-dom';
import { AiOutlineCloseCircle } from "react-icons/ai";

const Skillsets = ({handleCancel, handleDelete, ...props}) => {
  
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(true)

  const [isDisabled, setIsDisabled] = useState(true)

  const [data, setData] = useState([])

  const [currentCard, setCurrentCard] = useState({})

  const handleCurrentCardChange = (id, value) => {
    setCurrentCard(prevState => ({
        ...prevState,
        [id]: value
    }));
  }

  const [currentPoint, setCurrentPoint] = useState('')

  const handleCurrentSubmit = (event) => {
    event.preventDefault();
    setCurrentCard(prevState => ({
        ...prevState,
        points: (prevState.points || []).concat(currentPoint)
    }));
    setCurrentPoint('')
    return;
  }

  const handleCurrentRemove = (id) => {
    const filteredData = currentCard.points.filter((point, i) => i !== id);
    setCurrentCard(prevState => ({
        ...prevState,
        points: filteredData
    }));
  }

  const [addCardOpen, setAddCardOpen] = useState(false);
  const [isAddDisabled, setIsAddDisabled] = useState(true)

  useEffect(() => {
    if(currentCard.title && currentCard.description &&  currentCard.points && currentCard.points.length > 0) {
        setIsAddDisabled(false)
    } else {
        setIsAddDisabled(true)
    }
  }, [currentCard])

  useEffect(() => {
    if(data && data.length > 0) {
        setIsDisabled(false)
    } else {
        setIsDisabled(true)
    }
  }, [data])

  const handleSave = () => {
    setData([
        ...data, 
        currentCard
    ]);
    setIsAddDisabled(true)
    setCurrentCard({})
    setAddCardOpen(false)
    setCurrentPoint('')
  }

  const content = useSelector((state) => state.library.content)
  useEffect(() => {
    const existingData = content.find((r) => r.name === 'Skillsets')
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
    const newData = data.filter((item) => item.title !== title)
    setData(newData)
  }

  return (
    <div  {...props}>
    {
      showTools &&
      <ToolBar setIsEditing={setIsEditing} contentName={'Skillsets'} handleDelete={handleDelete} />
    }
    {
    isEditing && 
        <EditOptions isDisabled={isDisabled} contentName={'Skillsets'} fieldData={data} setIsEditing={setIsEditing} handleCancel={handleCancel} />
    }
    <div className={isEditing ? 'border rounded-2xl px-8 py-6 my-8' : 'my-8'}>
        <div className="relative w-full grid lg:grid-cols-2 gap-8">
            {
                data && data.length > 0 && data.map((card, i) => (
                    <div key={`card_${i}`} className='relative rounded-2xl min-h-[250px] px-8 py-6 flex flex-col justify-between bg-white border'>
                        <div>
                            {isEditing &&
                                <button className='absolute top-4 right-4' onClick={(() => handleRemove(card.title))}>
                                    <AiOutlineCloseCircle size={20} />
                                </button>
                            }
                            <p className='w-full text-xl font-bold mb-2'>{card.title}</p>
                            <p className='w-full mb-7 text-sm'>{card.description}</p>
                            {
                                card?.points && card.points.length > 0 && card.points.map((point, i) => (
                                    <div key={`point_${i}`} className='flex justify-between gap-2'>
                                        <p className='mb-4' >
                                            {point}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
            {
                addCardOpen ? 
                <div className='rounded-2xl relative min-h-[250px] px-8 py-6 flex flex-col justify-between bg-white border'>
                    <div>
                        <button className='absolute top-4 right-4' onClick={() => (setAddCardOpen(false), setCurrentCard({}), setCurrentPoint(''))}>
                            <AiOutlineCloseCircle size={20} />
                        </button>
                        <input type="text" placeholder='Untitled' className='w-full text-xl font-bold mb-2' onChange={(text) => handleCurrentCardChange('title', text.target.value)} />
                        <input type="text" placeholder='Write description here...' className='w-full mb-7 text-sm' onChange={(text) => handleCurrentCardChange('description', text.target.value)} />
                        {
                            currentCard?.points && currentCard.points.length > 0 && currentCard.points.map((point, i) => (
                                <div key={`point_${i}`} className='flex justify-between gap-2 mb-4'>
                                <p>
                                    {point}
                                </p>
                                <button type='button' onClick={() => handleCurrentRemove(i)}>
                                    <MdOutlineRemoveCircleOutline />
                                </button>
                                </div>
                            ))
                        }
                        <div>
                            <form className='flex items-center' onSubmit={handleCurrentSubmit}>
                                <input required type="text" placeholder='Start writing...' className='w-full mb-0' value={currentPoint} onChange={(text) => setCurrentPoint(text.target.value)} />
                                <button>
                                    <MdAddCircleOutline />
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className='text-right mt-10'>
                        <Button
                            isDisabled={isAddDisabled}
                            data={{
                                title: "Add",
                                type: "button",
                                handleClick: !isAddDisabled && handleSave,
                            }}
                        />
                    </div>
                </div>
                :
                <>
                {
                    isEditing && 
                    <div onClick={() => (setIsDisabled(true), setAddCardOpen((prevState) => !prevState))} className='cursor-pointer addCard min-h-[250px] rounded-2xl px-8 py-6 bg-[#EEEEEE] border flex flex-col justify-center items-center'>
                        <MdAdd />
                        <p className='text-sm mt-2'>Add new card</p>
                    </div>
                }
                </>
            }
        </div>
    </div>
    </div>
  )
}

export default Skillsets;
