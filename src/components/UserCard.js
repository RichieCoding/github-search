import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchUser } from '../lib/fetchGithub';

import githubIcon from '../assets/github-mark.png';
import twitterIcon from '../assets/twitter-logo.png';
import locationIcon from '../assets/icons8-location-24.png';
import mailIcon from '../assets/icons8-mail-48.png';
import linkIcon from '../assets/icons8-link-24.png';

const UserCard = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['user', id],
    queryFn: (id) => fetchUser(id),
  });

  if (!data) {
    return <div>Loading....</div>;
  }
  console.log(data)
  return (
    <div className='w-11/12 md:w-11/12 lg:w-8/12 my-10 mx-auto'>
      <div className='border rounded-lg border-gray-400 p-10 flex'>
        <div className='mr-6'>
          <img
            className='rounded-full w-24 mr-3'
            src={data.avatar_url}
            alt='avatar'
          />
        </div>
        <div className='pt-6'>
          <div className='flex'>
            <div className='bio w-1/3 mr-20'>
              <h2 className='font-medium text-2xl mb-2'>
                {data.name || 'N/A'}
              </h2>
              <p className='mb-2'>{data.login}</p>
              <p>{data.bio}</p>
            </div>

            <div>
              <div className='flex mb-4 flex items-center'>
                <img
                  className='w-5 h-5 mr-3'
                  src={githubIcon}
                  alt='github-logo'
                />
                <a
                  href={data.html_url}
                  target='_blank'
                  rel='noreferrer'
                  className='font-medium'
                >
                  {data.name
                    ? `${data.name.split(' ')[0].toLowerCase()}sgithub`
                    : 'github'}
                </a>
              </div>
              <div className='flex rounded-2xl bg-gray-300 bg-opacity-25 py-5 px-8'>
                <div className='mr-12 text-center'>
                  <p>Repos</p>
                  <p className='text-2xl'>{data.public_repos}</p>
                </div>
                <div className='mr-12 text-center'>
                  <p>Followers</p>
                  <p className='text-2xl'>{data.followers}</p>
                </div>
                <div className='text-center'>
                  <p>Following</p>
                  <p className='text-2xl'>{data.following}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex mt-10'>
            <div className='w-1/3 mr-20'>
              <div className='flex mb-5'>
                <img
                  className='w-6 h-6 mr-2'
                  src={locationIcon}
                  alt='location'
                />
                <p>{data.location || 'N/A'}</p>
              </div>
              <div className='flex'>
                <img className='w-5 h-5 mr-2' src={mailIcon} alt='mail' />
                <p>{data.email || 'N/A'}</p>
              </div>
            </div>

            <div>
              <div className='flex mb-5'>
                <img className='w-5 h-5 mr-2' src={twitterIcon} alt='twitter' />
                <p>{data.twitter_username || 'N/A'}</p>
              </div>
              <div className='flex'>
                <img className='w-7 h-7 mr-2' src={linkIcon} alt='link' />
                {data.blog ? (
                  <a target='_blank' rel='noreferrer' href={data.blog}>
                    {data.blog}
                  </a>
                ) : (
                  <p>N/A</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
