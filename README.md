张老师，axios 取消请求那块可以再说一下吗
那大型项目缓存太多，会不会导致内存爆的情况
因为即使针对SPA应用，同一个时间也只是显示一个页面。不显示或者说显示过的页面里面的数据会被垃圾回收
为什么可以取消。
isFetching 和 isLoading 有什么区别
isLoading指的是首次加载  didmount
isFetching指的更新  didupdate
reactQuery和umi-request有点像，有啥区别吗



浏览器一个tab页的内存 是有上限的吧？
           Userid 为什么为空
QueryClient、QueryClientProvider、useQueryClient 
这个应该是为全局管理数据的 useQuery  查到 通过 useQueryClient 在其他地方进行操作
ajax 里面好像就可以去吓跑
useQuery回调中用到的变量都要写在第一个参数数组中吗？
react-query实际应用有哪些？
那我能用这个来管理全局状态吗 可 以 的
reactQuery使用场景是什么
感觉和useSWR很像
这个内存监听可以代替redux吗
TARO 可以用吗？
页面跳转的时候数据保留 不进行二次刷新这个可以做到吗


staleTime： 5  是5秒都会重新刷新数据   和 cacheTime refetchInterval 有一点分不太清楚


stateTime保质期的


cacheTime 当数据对应的组件被 卸载了，数据进入了垃圾桶里了，在垃圾桶里保留 的时间。5000





useQuery中的pageNumber为啥解构
都有啊
真香
跳转到第几页
滚动列表
真香啊
无限分页可以预加载吗？
跳转到第N页呢
不可以吧
课件代码可以发吗？
重复配置同一个key的配置项，比如缓存时间，哪个会生效呢



getNextPageParam 这个参数一定要传，这个库自己应该能算处理把