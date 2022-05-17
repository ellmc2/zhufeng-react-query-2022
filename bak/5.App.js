
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import request from './request';
function Users({ setUserId }) {
  const usersQuery = useQuery('users', () => request.get('/users'));
  return (
    <ul>
      {usersQuery.data?.map(user => <li onClick={() => setUserId(user.id)} key={user.id}>{user.name}</li>)}
    </ul>
  )
}
function User({ userId, setUserId }) {
  const queryClient = useQueryClient();
  const userQuery = useQuery(['user', userId],
    () => request.get('/user', { params: { userId } }), {
    initialData: () => queryClient.getQueryData('users').find(user => user.id === userId),
    initialStable: false
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