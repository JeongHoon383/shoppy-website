
const useCustomHook = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
    // 다른 리액트 훅 사용 가능
    const value = useSomeOtherHook();
    // ...
    }, [/* 의존성 배열 */]);

    return(
      <>
        <button onclick={}>클릭</button>
      </>
    )
};