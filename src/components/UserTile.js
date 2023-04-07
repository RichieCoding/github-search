import { Link } from 'react-router-dom';
import githubLogo from '../assets/github-mark.png';

const UserTile = ({ avatar, userId, githubUrl }) => {
  return (
    <div className='border rounded-xl border-gray-400  p-4 flex flex-col justify-between'>
      <div className='flex mb-4 flex items-center'>
        <img className='rounded-full w-14 mr-3' src={avatar} alt='user-icon' />
        <p className='font-medium'>{userId}</p>
      </div>
      <div className='flex justify-between'>
        <a href={githubUrl} target='_blank' rel='noreferrer'>
          <img className='w-5 h-5' src={githubLogo} alt='github-logo' />
        </a>
        <Link to={`/users/${userId}`} className='text-green-300'>
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default UserTile;
