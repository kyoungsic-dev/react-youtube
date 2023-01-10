import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useParams } from 'react-router-dom';
import React from 'react';
import VideoCard from '../components/VideoCard';

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['videos', keyword], () => youtube.search(keyword), {
    staleTime: 1000 * 60,
  });

  return (
    <div className='p-4'>
      <div className='mb-4'>{keyword ? `${keyword} 🔍` : '핫 트렌드 목록 🔥'}</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 😥...</p>}
      {videos && (
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:gird-cols-3 xl:grid-cols-4 gap-2 gap-y-4'>
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </div>
  );
}
