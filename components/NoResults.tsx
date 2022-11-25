import { MdOutlineVideocamOff, MdNoAccounts } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';
import React from 'react';
import { IoHeartDislikeOutline } from 'react-icons/io5';

interface IProps {
  text: string;
  camera: boolean;
  account: boolean;
  comment: boolean;
  like: boolean
}

const NoResults = ({ text, camera, account, comment, like }: IProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl'>
        {camera && <MdOutlineVideocamOff /> }
        {account && <MdNoAccounts />}
        {comment && <BiCommentX /> }
        {like && <IoHeartDislikeOutline /> }
      </p>
      <p className='text-2xl text-center'>{text}</p>
    </div>
  );
};

export default NoResults;