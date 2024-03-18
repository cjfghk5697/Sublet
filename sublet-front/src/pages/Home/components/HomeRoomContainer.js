import styled from 'styled-components';
import { RoomProfile } from './RoomProfile';

const Layout = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 1em;
`;

export const HomeRoomContainer = ({ roomsData, likes, setLikes }) => {
  if (!roomsData) return <Layout></Layout>;

  return (
    <Layout>
      {roomsData.map((room, index) => (
        <RoomProfile
          key={index}
          room={room}
          likes={likes}
          setLikes={setLikes}
        />
      ))}
    </Layout>
  );
};
