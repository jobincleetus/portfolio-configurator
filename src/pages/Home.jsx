import React, { useRef } from "react";
import { useSelector } from "react-redux";
import ComponentLoop from "../components/ComponentLoop";
import Button from "../components/molecules/Button";
import imgPlaceHolder from '../assets/imgs/placeholder.png'
import PreviewNavigator from "../components/PreviewNavigator";
import { useEffect } from "react";
import { useState } from "react";

function Home() {
  const primaryData = useSelector((state) => state.library.primaryContent);
  const components = useSelector((state) => state.library.componentOrder);
  const content = useSelector((state) => state.library.content);

  const stickyBar = useRef();

  const [hasPrimaryData, setHasPrimaryData] = useState(0)

  const [hasExperience, setHasExperience] = useState(false)
  const [experienceData, setExperienceData] = useState({})

  useEffect(() => {
    if(primaryData.title && primaryData.description) {
        setHasPrimaryData(true)
    }
    setHasExperience(components.some(str => str.includes('Experience')))
    setTimeout(() => {
        window.scrollTo({
            behavior: "smooth",
            top: 0
        });
    }, 50)
  }, [])

  useEffect(() => {
    if(hasExperience) {
        const existingData = content.find((r) => r.name === 'Experience')
        if(existingData.value) {
            setExperienceData(existingData.value)
        }
    }
  }, [hasExperience])

  return (
    <div className="container mx-auto">
        <div className={`flex flex-col gap-10 h-full py-10 fullScreen ${hasPrimaryData ? 'justify-between ' : 'justify-center'}`}>
        {
            primaryData && hasPrimaryData ?
            <>
                <PreviewNavigator />
                <div className="grid grid-cols-12 gap-0 gap-y-10 lg:gap-20">
                    {
                        primaryData && 
                        <>
                            <div ref={stickyBar} className={`col-span-12 lg:col-span-4 lg:sticky lg:top-[100px] flex flex-col gap-8`}>
                                <img src={primaryData?.image ? primaryData.image : imgPlaceHolder} className={'w-full min-h-72 rounded-2xl object-cover overflow-hidden'} />
                                <div className="flex flex-col gap-3">
                                    <p className="font-bold capitalize">
                                        {primaryData.name}
                                    </p>
                                    <p className="text-sm">
                                        {primaryData.email}
                                    </p>
                                </div>
                                {
                                    hasExperience && experienceData && experienceData.list && experienceData.list.length > 0 &&
                                    <div>
                                    <p className="mb-2 text-sm text-gray-400">Currently</p>
                                    <div className="flex gap-5 items-center">
                                        <img src={experienceData.list[0].image ? experienceData.list[0].image : imgPlaceHolder} className={'w-10 h-10 rounded-lg object-cover overflow-hidden'} />
                                        <p>
                                            {experienceData.list[0].title}
                                        </p>
                                    </div>
                                    </div>
                                }
                            </div>
                            <div className="col-span-12 lg:col-span-8 col-start-1 lg:col-start-5 flex flex-col justify-center">
                                <div className="editor-inputHead text-3xl lg:text-7xl" dangerouslySetInnerHTML={{ __html: primaryData.title }}>
                                </div>
                                <div className="editor-inputHead" dangerouslySetInnerHTML={{ __html: primaryData.description }}>
                                </div>
                            </div>
                        </>
                    }
                    <div className="col-span-8 col-start-5">
                        {components &&
                        components.length > 0 &&
                        components.map((component, i) => (
                            <ComponentLoop
                            componentName={component}
                            key={`component_${i}`}
                            />
                        ))}
                    </div> 
                </div>
            </> :
            <div className='flex flex-col justify-center items-center h-full'>
                <Button data={{
                    title: 'Create a portfolio',
                    url: '/edit',
                    type: 'button'
                }} />
                <p className='mt-4'>Your first step at your awesome website</p>
            </div>
        }
        </div>
    </div>
  );
}

export default Home;
