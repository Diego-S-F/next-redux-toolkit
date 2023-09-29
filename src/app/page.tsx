"use client"
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { increment, decrement } from '@/redux/features/counterSlice'
import { useGetUsersQuery } from '@/redux/services/userApi';

export function HomePage() {

  const count = useAppSelector(state => state.counterReducer.counter)

  const { data, error, isLoading, isFetching } = useGetUsersQuery(null)
  
  const dispatch = useAppDispatch()
  const router = useRouter()

  return (
    <div>
      {isLoading || isFetching ? (
        <p>Loading</p>
      ) : (
        <>
          <h1 className='text-center text-2x1'>total: {count}</h1>
          <div className='flex justify-center w-full gap-x-3'>
            <button
              className='bg-green-500 px-3 py-2 rounded-md'
              onClick={() => {
                dispatch(increment());
              }}
            >
              Increment
            </button>
            <br />
            <button
              className='bg-blue-500 px-3 py-2 rounded-md'
              onClick={() => {
                dispatch(decrement());
              }}
            >
              Decrement
            </button>
          </div>
          <div className='grid grid-cols-3 gap-3'>
            {data?.map((user) => (
              <div
                key={user.id}
                className='bg-zinc-800 p-4'
                onClick={() => {
                  router.push(`/user/${user.id}`);
                }}
              >
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.username}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {error && <p>Some error</p>}
    </div>
  );
}
export default HomePage