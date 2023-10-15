import React from "react";
import { Video } from "./interfaces/Video.interface";
import ReactPlayer from "react-player";
import "./VideoItem.css";
import { useNavigate } from "react-router-dom";
import * as videoService from "./services/videos.service";
import { toast } from "react-toastify";

interface Props {
  video: Video;
  loadVideos: () => void;
}

const VideoItem = ({ video, loadVideos }: Props) => {
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    await videoService.deleteVideo(id);
    toast.success("Video deleted!");
    loadVideos();
  };

  return (
    <div className="col-md-4 p-2">
      <div className="card card-body video-card">
        <div className="d-flex justify-content-between">
          <h1
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/update/${video.id}`)}
          >
            {video.title}
          </h1>
          <span
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => video.id && handleDelete(video.id)}
          >
            X
          </span>
        </div>
        <p>{video.description}</p>
        <div className="embed-responsive embed-responsive-16by9">
          <ReactPlayer
            className="embed-responsive-item"
            url={video.url}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
