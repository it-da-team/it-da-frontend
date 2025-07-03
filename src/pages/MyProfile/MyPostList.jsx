const MyPostList = ({ posts }) => (
  <div>
    <h3>내가 쓴 글</h3>
    {posts.length === 0 ? (
      <p>작성한 글이 없습니다.</p>
    ) : (
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong> ({post.category})<br />
            {post.content}
          </li>
        ))}
      </ul>
    )}
  </div>
);
export default MyPostList; 