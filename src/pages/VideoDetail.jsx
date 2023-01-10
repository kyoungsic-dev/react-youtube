import React from 'react';
import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import VideoCard from '../components/VideoCard';

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();
  const { title, channelId, channelTitle, description } = video.snippet;
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: related,
  } = useQuery(['related', video.id], () => youtube.related(video.id), {
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className='grid grid-cols-1 lg:grid-cols-8 mt-4 gap-2 p-4'>
      <div className='col-span-1 lg:col-span-5'>
        <div>
          <iframe
            id='player'
            type='text/html'
            width='100%'
            height={640}
            src={`https://www.youtube.com/embed/${video.id}`}
            allowFullScreen
            frameBorder='0'
            title={title}
            className='w-full'></iframe>
        </div>
        <h2 className='mt-4 text-xl font-bold'>{title}</h2>
        <ChannelInfo id={channelId} title={channelTitle} />
        <pre className='mt-4 whitespace-pre-wrap'>{description}</pre>
      </div>

      <aside className='col-span-3'>
        {isLoading && <p>Loading...</p>}
        {error && <p>Something is wrong 😥...</p>}
        {related && (
          <ul>
            {related.map(video => {
              return <VideoCard key={video.id} video={video} type='list' />;
            })}
          </ul>
        )}
      </aside>
    </section>
  );
}
