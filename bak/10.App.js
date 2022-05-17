
import React from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import request from './request';
function fetchUsers({ queryKey: [_, { pageNumber }] }) {
  return request.get('/users', {
    params: {
      pageNumber
    }
  });
}
function Users() {
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = React.useState(1);
  const { data, isLoading, isFetching } = useQuery(['users', { pageNumber }], fetchUsers, {
    onSuccess() {
      queryClient.prefetchQuery(['users', { pageNumber: pageNumber + 1 }], fetchUsers);
    }
  });
  return (
    <>
      <ul>
        {data?.data?.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
      <button disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber => pageNumber - 1)}>上页</button>
      <span>{pageNumber}</span>
      <button disabled={pageNumber >= data?.totalNumber} onClick={() => setPageNumber(pageNumber => pageNumber + 1)}>下页</button>
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