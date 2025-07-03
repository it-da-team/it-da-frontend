const MyChannelList = ({ channels }) => (
  <div>
    <h3>내 채널</h3>
    {channels.length === 0 ? (
      <p>채널이 없습니다.</p>
    ) : (
      <ul>
        {channels.map(ch => (
          <li key={ch.id}>{ch.name} ({ch.subUserCount}명 구독)</li>
        ))}
      </ul>
    )}
  </div>
);
export default MyChannelList; 