import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function ChannelInfo({ id, title }) {
  const { youtube } = useYoutubeApi();
  const { data: url } = useQuery(['channel', id], () => youtube.channelImageURL(id), {
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className='flex items-center mt-4'>
      <span className='blocks w-10 mr-2 rounded-full overflow-hidden'>{url && <img src={url} alt={title} />}</span>
      <h5 className='text-lg font-medium'>{title}</h5>
    </div>
  );
}
