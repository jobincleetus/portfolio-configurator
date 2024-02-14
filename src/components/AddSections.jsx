import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import plusIcon from '../assets/imgs/plus.svg'
import { setComponentOrder, setContent, toggleIsContentBeingEdited } from "../store/library";
import ComponentLoop from "./ComponentLoop";

const AddSections = () => {

  const dispatch = useDispatch();
  const isGloballyEditing = useSelector((state) => state.library.isContentBeingEdited)

  const [isTop, setIsTop] = useState(true);
  const contentData = useSelector(
    (state) => state.library.content
  );

  const [isOpen, setIsOpen] = useState(false);
  const dropDownHolder = useRef();

  const handleDropDown = () => {
      if(isGloballyEditing) return;
      setIsOpen(!isOpen);
      window.innerHeight/2 > dropDownHolder.current.getBoundingClientRect().top ? setIsTop(false) : setIsTop(true)
  }

  const [componentList, setComponentList] = useState([])

  const handleComponents = (componentName) => {
    setComponentList([
        ...componentList,
        componentName
    ])
    setIsOpen(false)
  }

  const handleCancel = (canceledItem) => {
    const updatedList = componentList.filter(item => item !== canceledItem);
    setComponentList(updatedList);
    dispatch(toggleIsContentBeingEdited(false))
  }

  const handleDelete = (deletedItem) => {
    const updatedList = componentList.filter(item => item !== deletedItem);
    setComponentList(updatedList);
    dispatch(setContent({
      contentName: deletedItem,
      fieldData: null
    }));
  }

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    //duplicate items
    let _componentList = [...componentList];

    //remove and save the dragged item content
    const draggedItemContent = _componentList.splice(dragItem.current, 1)[0];

    //switch the position
    _componentList.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setComponentList(_componentList);
  };

  useEffect(() => {
    dispatch(setComponentOrder(componentList));
  }, [componentList])

  const components = useSelector((state) => state.library.componentOrder);
  useEffect(() => {
    setComponentList(components);
  }, [])

  return (
    <div className="grid grid-cols-12 gap-0 gap-y-10 lg:gap-20">
      <div className={componentList.length > 0 ? 'col-span-12 lg:col-span-8 lg:col-start-5' : 'col-span-12'}>
          {
              componentList && componentList.length > 0 && componentList.map((componentName, i) => (
                  <ComponentLoop 
                    componentName={componentName} 
                    key={`component_${i}`} 
                    handleCancel={(canceledItem) => handleCancel(canceledItem)} 
                    handleDelete={(deletedItem) => handleDelete(deletedItem)} 
                    draggable
                    onDragStart={(e) => (dragItem.current = i)}
                    onDragEnter={(e) => (dragOverItem.current = i)}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}

                    isLast={componentList.length === i + 1}
                  />
              ))
          }
          <div className="relative py-4" ref={dropDownHolder}>
              <button className="w-full py-4 px-6 bg-darkerGrey border-black rounded-xl border border-dashed" onClick={handleDropDown}>Click to add sections</button>
              {isOpen && componentList.length !== contentData.length &&
                <div className={`absolute ${isTop ? 'bottom-full' : 'top-full'} left-2/4 -translate-x-2/4 bg-white flex flex-col px-4 py-6 rounded-2xl`}>
                    {
                        contentData && contentData.length > 0 && contentData.map((data, i) => (
                                data.value === null && componentList.indexOf(data.name) ?
                                <button onClick={() => handleComponents(data.name)} key={data.name} className='group min-w-80 flex items-center gap-4 px-3 py-3 text-left hover:bg-darkerGrey rounded-xl transition-colors duration-350'>
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-grey group-hover:bg-white transition-colors duration-35">
                                        <img src={plusIcon} className='w-2' />
                                    </div>
                                    {data.title}
                                </button>
                                : <React.Fragment key={i}></React.Fragment>
                        ))
                    }
                </div>
              }
          </div>
          {
            componentList.length === contentData.length &&
            <p className="text-center mt-8">
              All sections added! Looks good.
            </p>
          }
      </div>
    </div>
  );
};

export default AddSections;
