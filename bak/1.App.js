
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import request from './request';
function Users() {
  const { data, isLoading, isError } = useQuery('users', () => {
    return request.get('/users');
  }, {
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
    cacheTime: 5000,
    refetchInterval: 1000
  });
  if (isLoading) {
    return <div>数据加载中...</div>
  }
  if (isError) {
    return <div>数据加载出错</div>
  }
  return (
    <>
      <ul>
        {
          data?.map(user => <li key={user.id}>{user.name}</li>)
        }
      </ul>
    </>
  )
}
function App() {
  const [show, setShow] = useState(true);
  return (
    <>
      <button onClick={() => setShow(!show)}>{show ? '隐藏' : '显示'}</button>
      {show && <Users />}
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  )
}
//Cannot read properties of undefined (reading 'map')
export default App;