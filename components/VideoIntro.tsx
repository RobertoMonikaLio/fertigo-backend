import React, { useRef, useEffect } from 'react';
import { XMarkIcon } from './icons';

// Base64 encoded intro video
const videoSrc = "data:video/mp4;base64,AAAAGGZ0eXBNU05WAAACAE1TTlYAAAOUbW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAAB4AAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAArZ0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAeAAAAAABAAAAQAAAAAAdWd0YQAAAFB1c2VyRGF0YV9UcmFrAAAAFG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXIAAAAAAAAAAAAAAAAAAAAAG2lsb2MAAAAEAAAABwAAAOgAAAABAAAABwAAAIQAAACCAAAABwAAAFQAAAEAAAAAUAAAAAEAAAAsAAAAAQAAAFQAAAEAAAAAUAAAAAEAAAAsAAAAVm1kYXQAAAHkBA//f/3f/3v/1v/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1f/V/9X/1dhdGE=";

interface VideoIntroProps {
  onFinished: () => void;
}

const VideoIntro: React.FC<VideoIntroProps> = ({ onFinished }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Attempt to play the video.
      videoElement.play().catch(error => {
        // Autoplay was prevented.
        console.warn("Autoplay was prevented:", error);
        // We can either show a play button or just finish the intro.
        // For simplicity, we'll just finish it.
        onFinished();
      });
    }
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center animate-fade-in">
      <video
        ref={videoRef}
        src={videoSrc}
        onEnded={onFinished}
        playsInline
        muted
        autoPlay
        className="w-auto h-auto max-w-full max-h-full"
      />
      <button
        onClick={onFinished}
        aria-label="Intro überspringen"
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default VideoIntro;
