import React, { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { Video } from "./interfaces/Video.interface";
import * as VideoService from "./services/videos.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const VideoForm = () => {
  const initialState = {
    title: "",
    description: "",
    url: "",
  };

  const [video, setVideo] = useState<Video>(initialState);

  const navigate = useNavigate();
  const params = useParams();

  const getVideo = async (id: string) => {
    const res = await VideoService.getVideo(id);
    const { title, description, url } = res.data;
    initialState.title = title;
    initialState.description = description;
    initialState.url = url;
    setVideo({title, description, url});
  };

  useEffect(() => {
    params.id && getVideo(params.id);
  });

  const handleInputChange = (e: InputChange) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!params.id) {
      await VideoService.createVideo(video);
      toast.success("New video added!");
      setVideo(initialState);
    } else {
      await VideoService.updateVideo(params.id, video);
      toast.success("Video Updated!");
    }

    navigate("/");
  };

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            {params.id ? <h3>Update a Video</h3> : <h3>New Video</h3>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  placeholder="Write a title for this video"
                  onChange={handleInputChange}
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="url"
                  name="url"
                  placeholder="https://example.com"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  name="description"
                  rows={3}
                  placeholder="Write a description"
                  onChange={handleInputChange}
                ></textarea>
              </div>
              {params.id ? (
                <button className="btn btn-info">Update Video</button>
              ) : (
                <button className="btn btn-primary">Create</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
