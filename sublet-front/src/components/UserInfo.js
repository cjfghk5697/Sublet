export default function UserInfo(user_id) {
  const getUserInfo = async () => {
    const json = await (
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${user_id}`
      )
    ).json();

    setLoading(false)
    setUserInfo(json)
  };

  useEffect(() => {
    getUserInfo();
  }, []);
}