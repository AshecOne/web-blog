"use client";
import * as React from 'react';
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';

interface IAuthorTemplateProps {
  children: React.ReactNode;
}

const AuthorTemplate: React.FunctionComponent<IAuthorTemplateProps> = (props) => {
  const username = useAppSelector((state) => state.userReducer.username);

  const getInitials = (name: string) => {
    const initials = name.slice(0, 2).toUpperCase();
    return initials;
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-[300px] border-b-4 md:border-b-0 md:border-r-4 border-black mt-[100px] md:ml-[130px] mb-[50px] md:mb-[100px] p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-3xl font-bold text-black">{getInitials(username)}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Hi, {username}</h2>
          </div>
        </div>
        <ul className="flex flex-col md:flex-col items-center md:items-start mt-[30px] md:mt-[60px] space-y-4">
          <li>
            <Link href="/web-blog/profile" className="text-black hover:font-bold">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/web-blog/createArticle" className="text-black hover:font-bold">
              Create Article
            </Link>
          </li>
          <li>
            <Link href="/web-blog/manageArticle" className="text-black hover:font-bold">
              Manage Articles
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full md:w-[1200px] p-8">
        {props.children}
      </div>
    </div>
  );
};

export default AuthorTemplate;