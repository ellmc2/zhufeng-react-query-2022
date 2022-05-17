
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import request from './request';
function Users({ setUserId }) {
  const { data, isLoading, isFetching } = useQuery('users', () => request.get('/users'));
  if (isLoading) return "加载中...."
  return (
    <>
      <ul>
        {data?.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
      {isFetching && "更新中..."}
    </>
  )
}

function App() {
  const queryClient = useQueryClient();
  const nameRef = React.useRef();
  const { mutate: saveUser, isLoading, isError, isSuccess, error, reset } = useMutation(
    (values) => request.post('/users', values), {
    onMutate(values) {
      const oldUsers = queryClient.getQueryData('users');
      queryClient.setQueryData('users', oldUsers => [...oldUsers, { ...values, id: Date.now() + "" }]);
      return () => queryClient.setQueryData('users', oldUsers);;
    },
    onSuccess() {
      //在更新成功后让客户端用户列表的缓存失效，会立刻重新发起请求
      queryClient.invalidateQueries('users');
    },
    onError(error, values, rollback) {
      rollback();
    },
    onSettled() {
      setTimeout(() => {
        reset();
        nameRef.current.value = '';
      }, 3000);
    }
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const user = { name };
    saveUser(user);
  }
  return (
    <>
      <Users />
      <form onSubmit={handleSubmit}>
        <input ref={nameRef} />
        <input type="submit"
          value={isLoading ? '保存中' : isError ? '保存失败' : isSuccess ? '保存成功' : '保存'} />
      </form>
      {
        isError && <pre style={{ color: 'red' }}>{error.response.data.message}</pre>
      }
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  )
}
//Cannot read properties of undefined (reading 'map')
export default App;