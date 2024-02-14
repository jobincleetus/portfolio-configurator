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

  const stickyBar = useRef();

  const [hasPrimaryData, setHasPrimaryData] = useState(0)

  useEffect(() => {
    if(primaryData.title && primaryData.description) {
        setHasPrimaryData(true)
    }
    setTimeout(() => {
        window.scrollTo({
            behavior: "smooth",
            top: 0
        });
    }, 50)
  }, [])

  return (
    <div className="container mx-auto">
        <div className={`flex flex-col gap-10 h-full py-10 fullScreen ${hasPrimaryData || (components && components.length > 0) ? 'justify-between ' : 'justify-center'}`}>
        {
            primaryData && hasPrimaryData || (components && components.length > 0) ?
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
