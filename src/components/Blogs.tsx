'use client';
import { SingleBlog } from './SingleBlog';
import Link from 'next/link';
import { usePublicationQuery } from '../../generated/graphq';
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST as string;

export const Blogs = () => {
  const { data } = usePublicationQuery({
    host,
  });

  if (!data || !data.publication) return null;
  const posts = data.publication.posts.edges;

  return (
    <div className='flex min-h-80 w-full flex-col items-start rounded-3xl bg-white p-6 text-slate-950 shadow-lg dark:border dark:border-slate-800 dark:bg-slate-900 dark:text-zinc-300'>
      <div className='mb-6 flex w-full flex-row items-center justify-between'>
        <h2 className='text-2xl font-semibold dark:text-zinc-100'>Blogs</h2>
        <Link
          href={'/blog'}
          className='hidden flex-row items-center gap-2 rounded-full px-3 py-1 text-sm hover:bg-slate-600 hover:text-white md:flex dark:hover:bg-slate-950 dark:hover:text-zinc-300'
        >
          All blogs <ArrowRightIcon className='h-4 w-4' />
        </Link>
      </div>
      {posts.length > 0 && (
        <div className='flex w-full flex-col gap-5 sm:flex-row sm:justify-center md:gap-8'>
          {posts.map((edge) => (
            <SingleBlog blogInfo={edge.node} key={edge.node.id} />
          ))}
        </div>
      )}
      {posts.length === 0 && (
        <p className='flex w-full flex-1 items-center justify-center gap-3 text-lg font-semibold'>
          <ExclamationTriangleIcon className='h-8 w-8' />
          No posts found
        </p>
      )}
      <Link
        href={'/blog'}
        className='mt-6 flex flex-row items-center gap-2 self-center rounded-full px-4 py-2 text-sm shadow-sm hover:bg-slate-600 hover:text-white sm:text-base md:hidden dark:hover:bg-slate-950 dark:hover:text-zinc-300'
      >
        All blogs <ArrowRightIcon className='h-4 w-4' />
      </Link>
    </div>
  );
};
