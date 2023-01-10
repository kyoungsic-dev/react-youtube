import React, { useEffect, useState } from 'react';
import { BsYoutube, BsSearch } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function SearchHeader() {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [text, setText] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/videos/${text.trim()}`);
  };

  useEffect(() => {
    keyword ? setText(keyword) : setText('');
  }, [keyword]);

  return (
    <header className='flex p-4 text-2xl border-b border-zinc-600'>
      <Link to='/' className='flex items-center'>
        <BsYoutube className='text-4xl text-brand' />
        <h1 className='font-bold ml-2 text-3xl'>Youtube</h1>
      </Link>

      <form onSubmit={handleSubmit} className='flex items-center w-full justify-end ml-auto'>
        <input
          type='text'
          placeholder='검색어를 입력해 주세요.'
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
          className='h-10 bg-black pl-2 text-sm w-7/12'
        />
        <button type='button' className='bg-zinc-600 h-10 w-10 flex items-center justify-center px-2.5'>
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
