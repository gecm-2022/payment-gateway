import React from 'react';

const Intro = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <video 
        src="/video.mp4" 
        controls 
        className="w-full max-w-lg rounded-md" 
        alt="Video"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Intro;
