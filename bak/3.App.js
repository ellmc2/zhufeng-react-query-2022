
import React, { useEffect, useState } from 'react'
import { useQuery, QueryObserver, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import request, { CancelToken } from './request';
function User({ userId }) {
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
    retryDelay: (attemptIndex) => Math.min(30000, 1000 * 2 ** attemptIndex)
  });
  if (isIdle) return null;
  if (isError) return <div>{error.message}</div>
  return (
    <div>{data?.id ? <p>{data?.id}:{data?.name}</p> : <p>用户不存在</p>}</div>
  )
}
function App() {
  const [userId, setUserId] = React.useState('');
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