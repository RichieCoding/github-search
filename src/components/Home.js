import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUsers } from '../lib/fetchGithub';

import UserTile from './UserTile';

import searchIcon from '../assets/icons8-search-30.png';

const Home = () => {
  const [requestParams, setRequestParams] = useState({ user: '' });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['users', requestParams],
    queryFn: ({ pageParam = 1, queryKey }) => fetchUsers(pageParam, queryKey),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const obj = {
      user: formData.get('user') || '',
    };
    setRequestParams(obj);
  };

  return (
    <div className='w-11/12 md:w-10/12 lg:w-8/12 my-10 mx-auto'>
      <div className='flex justify-between mb-8'>
        <h1 className='text-lg md:text-xl lg:text-2xl'>Github Users</h1>
        <form onSubmit={handleSubmit} className='w-[31%]'>
          <i className='absolute transform -translate-y-[-10px] -translate-x-[-10px]'>
            <img className='w-4 h-4' src={searchIcon} alt='search-icon' />
          </i>
          <input
            className='text-sm p-2 pl-7 box-border rounded border border-gray-400 w-full'
            name='user'
            type='text'
            placeholder='Enter username or email'
          />
        </form>
      </div>
      <div className='grid grid-cols-3 gap-8 mb-8'>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : status === 'error' ? (
          <p>Error {error.message}</p>
        ) : (
          <>
            {data?.pages
              ? data.pages.map((group, i) => {
                  console.log('hi', group);
                  if (group.items) {
                    return group.items.map((project) => (
                      <UserTile
                        key={project.id}
                        avatar={project.avatar_url}
                        userId={project.login}
                        githubUrl={project.html_url}
                      />
                    ));
                  }
                })
              : null}
          </>
        )}
        <div>{isFetching ? 'Fetching...' : null}</div>
      </div>
      <div className='flex justify-end'>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage || !requestParams.user}
          className='rounded border border-gray-400 px-3 py-1 text-sm'
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default Home;
