import React, { lazy, Suspense } from 'react';

const ComponentLoop = ({ componentName, handleCancel, isLast, ...props }) => {
  const DynamicComponent = lazy(() => import(`./sections/selectableComponents/${componentName}.jsx`));
    
  return (
    <Suspense fallback={<div className='min-h-[400px] bg-grey'></div>}>
      <DynamicComponent {...props} handleCancel={handleCancel} className={!isLast ? 'mb-16 lg:mb-32' : ''} id={componentName} />
    </Suspense>
  );
};

export default ComponentLoop;