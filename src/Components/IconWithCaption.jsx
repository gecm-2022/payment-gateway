import React from 'react';

const IconWithCaption = () => {
  return (
    <div className="flex flex-row justify-between gap-4 p-4">
      <div className="flex flex-col items-center">
        <img src='/i1.png' alt='Help icon' height={40} width={40} className="object-contain" />
        <p className="mt-2">Help</p>
      </div>
      <div className="flex flex-col items-center">
        <img src='/i2.png' alt='App icon' height={40} width={40} className="object-contain" />
        <p className="mt-2">App</p>
      </div>
      <div className="flex flex-col items-center">
        <img src='/i3.png' alt='Services icon' height={40} width={40} className="object-contain" />
        <p className="mt-2">Services</p>
      </div>
      <div className="flex flex-col items-center">
        <img src='/i4.png' alt='Invite icon' height={40} width={40} className="object-contain" />
        <p className="mt-2">Invite</p>
      </div>
    </div>
  );
};

export default IconWithCaption;
