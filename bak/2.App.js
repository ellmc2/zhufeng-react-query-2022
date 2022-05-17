
import React, { useEffect, useState } from 'react'
import { useQuery, QueryObserver, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import request from './request';

function Users() {
  const { data, isLoading, isError } = useQuery('users', () => request.get('/users'));
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
function Status() {
  const [data, setData] = useState();
  const queryClient = useQueryClient();
  useEffect(() => {
    const observer = new QueryObserver(queryClient, { queryKey: 'users' });
    return observer.subscribe(result => setData(result.data));
  }, []);
  return (
    <div>
      共计{data?.length}个用户
    </div>
  )
}
function App() {
  return (
    <>
      <Users />
      <Status />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  )
}
//Cannot read properties of undefined (reading 'map')
export default App;