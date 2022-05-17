
import React from 'react'
import { useQuery, useQueryClient, useInfiniteQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import request from './request';
function fetchUsers({ pageParam = 1 }) {
  return request.get('/users', {
    params: {
      pageNumber: pageParam
    }
  });
}
function Users() {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery('users', fetchUsers, {
    getNextPageParam: ({ pageNumber, hasMore }) => {
      //无限加载的时候 并没有总页数
      return hasMore && pageNumber + 1;
      //return pageNumber < totalNumber ? pageNumber + 1 : false;
    }
  });
  return (
    <>
      <ul>
        {
          data?.pages?.map((page, index) => {
            return (
              <React.Fragment key={index}>
                {page?.data?.map(user => <li key={user.id}>{user.name}</li>)}
              </React.Fragment>
            )
          })
        }

      </ul>
      <button disabled={!hasNextPage} onClick={fetchNextPage}>加载更多</button>
    </>
  )
}

function App() {
  return (
    <>
      <Users />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  )
}
//Cannot read properties of undefined (reading 'map')
export default App;