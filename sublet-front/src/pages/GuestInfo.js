import { useEffect, useState } from "react";
import User from "../components/GuestInfo";
//import { useParams } from "react-router-dom";
function GuestInfo() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  //const { userId } = useParams();

  const getUserInfo = async () => {
    const json = await (
      await fetch(
        `http://localhost:4000/user/evan1`
      )
    ).json();

    setLoading(false)
    setUserInfo(json)
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  console.log(userInfo)
  return (
    <div>
      {loading ? (<div>' '</div>) :
        (
          <div>
            <User user={userInfo} />
          </div>)
      };
    </div>
  );
}

export default GuestInfo;