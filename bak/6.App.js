
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import request from './request';
function Users({ setUserId }) {
  const queryClient = useQueryClient();
  const usersQuery = useQuery('users', () => request.get('/users'), {
    onSuccess(data) {
      const users = queryClient.getQueryData('users');
      users.forEach(user => {
        queryClient.setQueryData(['user', user.id], user);
      });
      console.log('查询成功', data);
    },
    onError(error) {
      console.log('查询失败', error);
    },
    onSettled(data, error) {
      console.log('查询结束 ', data, error);
    }
  });
  /* const usersQuery = useQuery('users', async () => {
    let users = await request.get('/users');
    //可以在列表加载回来了把单 个用户的缓存提前 写进去
    users.forEach(user => {
      queryClient.setQueryData(['user', user.id], user);
    });
    return users;
  }); */
  return (
    <ul>
      {usersQuery.data?.map(user => <li onClick={() => setUserId(user.id)} key={user.id}>{user.name}</li>)}
    </ul>
  )
}
function User({ userId, setUserId }) {

  const userQuery = useQuery(['user', userId],
    () => request.get('/user', { params: { userId } }), {
    //initialData: () => queryClient.getQueryData('users').find(user => user.id === userId),
    //initialStable: false
  });
  return (
    <div>
      <button onClick={() => setUserId(-1)}>返回</button>
      <p>{userQuery.data?.id}:{userQuery.data?.name}</p>
    </div>
  )
}

function App() {
  const [userId, setUserId] = React.useState(-1);
  return (
    <>
      {
        userId > -1 ? (
          <User userId={userId} setUserId={setUserId} />
        ) : <Users setUserId={setUserId} />
      }
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  )
}
//Cannot read properties of undefined (reading 'map')
export default App;