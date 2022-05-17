
import React, { useEffect, useState } from 'react'
import { useQuery, QueryObserver, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import request, { CancelToken } from './request';
const initialUser = { id: '1', name: 'name1' }
function User({ userId = initialUser.id }) {
  const { data, isIdle, isError, error } = useQuery(['user', userId], () => {
    const source = CancelToken.source();
    const promise = request.get('/user', { params: { userId }, cancelToken: source.token }).catch(error => {
      if (request.isCancel(error)) {
        console.log(error.message);
      }
    })
    promise.cancel = () => source.cancel('请求被React Query取消了!')
    return promise;
  }, {
    enabled: !!userId,
    retry: 3,
    ///retryDelay: 1000,//重试的间隔时间
    retryDelay: (attemptIndex) => Math.min(30000, 1000 * 2 ** attemptIndex),
    initialData: initialUser,
    staleTime: 5000,
    initialStale: false//初始化数据标记为不过期
  });
  const postsQuery = useQuery(['posts', data?.id],
    () => request.get('/posts', { params: { userId: data?.id } }), {
    enabled: !!(data?.id)
  });
  if (isIdle) return null;
  if (isError) return <div>{error.message}</div>
  return (
    <>
      <div>{data?.id ? <p>{data?.id}:{data?.name}</p> : <p>用户不存在</p>}</div>
      <div>贴子数量:{postsQuery.data?.length}</div>
    </>

  )
}
function App() {
  const [userId, setUserId] = React.useState(initialUser.id);
  return (
    <>
      <input value={userId} onChange={(event) => setUserId(event.target.value)}></input>
      <User userId={userId} />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  )
}
//Cannot read properties of undefined (reading 'map')
export default App;