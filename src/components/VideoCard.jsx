import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatAgo } from '../util/date';

export default function VideoCard({ video, type }) {
  const navigate = useNavigate();
  const { thumbnails, title, channelTitle, publishedAt } = video.snippet;
  const isList = type === 'list';
  return (
    <li
      onClick={() => {
        navigate(`/videos/watch/${video.id}`, {
          state: { video },
        });
      }}
      className={isList ? 'flex items-center gap-1 my-2 cursor-pointer' : 'cursor-pointer'}>
      <div className={isList ? 'w-60' : 'w-full'}>
        <img src={thumbnails.medium.url} alt={title} className='w-full' />
      </div>
      <div className={isList ? 'flex-1 ml-2' : ''}>
        <p className='font-semibold my-2 line-clamp-2'>{title}</p>
        <p className='text-sm opacity-80'>{channelTitle}</p>
        <p className='text-sm opacity-80'>{formatAgo(publishedAt, 'ko')}</p>
      </div>
    </li>
  );
}
