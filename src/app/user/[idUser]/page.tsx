'use client';
import { useRouter } from 'next/navigation';
import { useGetUserByIdQuery } from '@/redux/services/userApi';

export default function userDetail({ params }: { params: { idUser: string } }) {
  const router = useRouter();

  const id = params.idUser;

  const { data, error, isLoading, isFetching } = useGetUserByIdQuery({ id: id });

  return (
    <>
      {isLoading || isFetching ? (
        <p>loading ... </p>
      ) : (
        <div className='font-sans h-screen w-full flex flex-row justify-center items-center'>
          <div className='card w-96 mx-auto bg-zinc-800   shadow-xl hover:shadow'>
            <img
              className='w-32 mx-auto rounded-full -mt-20 border-8 border-white'
              src='https://avatars.githubusercontent.com/u/67946056?v=4'
              alt=''
            ></img>
            <div className='text-center mt-2 text-3xl font-medium'>
              {data?.name}
            </div>
            <div className='text-center mt-2 font-light text-sm'>
              {data?.email}
            </div>
            <div className='text-center font-normal text-lg'>Job</div>
            <div className='px-6 text-center mt-2 font-light text-sm'>
              <p>{data?.company?.catchPhrase}</p>
            </div>
            <hr className='mt-8' />
            <div className='flex p-4'>
              <div className='w-1/2 text-center'>
                  <span className='font-bold'>{data?.website}</span>
              </div>
              <div className='w-0 border border-gray-300'></div>
              <div className='w-1/2 text-center'>
                  <span className='font-bold'>{data?.phone}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <p>ocurrio un error</p>}
    </>
  );
}
