"use client"

import YouTube from "react-youtube";
import { useWindowDimensions } from "react-native-web";

const VideoPlayer = ({ youtubeId }) => { 
  const { width, height } = useWindowDimensions();
  const aspectRatio = 16 / 9;
  const videoWidth = Math.min(width, height * aspectRatio);
  const videoHeight = videoWidth / aspectRatio;
  const option = {
    width: "100%",
    height: videoHeight
  };

  return (
    <div className="lg:w-2/3 w-full"> 
      <YouTube videoId={youtubeId} onReady={(event) => event.target.pauseVideo()} opts={option}/>
    </div>
  );
};

export default VideoPlayer
