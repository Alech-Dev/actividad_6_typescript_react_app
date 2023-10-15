import React, { useEffect, useState } from "react";
import { Video } from "./interfaces/Video.interface";
import * as videoService from "./services/videos.service";
import VideoItem from "./VideoItem";

const VideoList = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const loadVideos = async () => {
    const res = await videoService.getVideos();
    const organizedVideos = res.data
      .map((video) => {
        return {
          ...video,
          createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
          updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date(),
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    setVideos(organizedVideos);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="row">
      {videos.map((video) => {
        return <VideoItem video={video} key={video.id} loadVideos={loadVideos}/>;
      })}
    </div>
  );
};

export default VideoList;
