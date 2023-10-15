import axios from 'axios'
import { environment } from '../../../environments/environment'
import { Video } from '../interfaces/Video.interface';

export const getVideos = async () => {
  return await axios.get<Video[]>(`${environment.urlApi}/videos`);
}

export const getVideo = async (id: string) => {
  return await axios.get<Video>(`${environment.urlApi}/videos/${id}`);
}

export const createVideo = async (video: Video) => {
  return await axios.post(`${environment.urlApi}/videos`, video);
}

export const updateVideo = async (id: string, video: Video) => {
  return await axios.put<Video>(`${environment.urlApi}/videos/${id}`, video);
}

export const deleteVideo = async (id: string) => {
  return await axios.delete<Video>(`${environment.urlApi}/videos/${id}`);
}
