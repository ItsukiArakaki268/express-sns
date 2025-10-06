document.addEventListener("DOMContentLoaded", () => {
  console.log("ページが読み込まれました。");
  fetchPosts();
});

const fetchPosts = async () => {
  try {
    const res = await fetch("/posts_db");

    if (!res.ok) {
      throw new Error(`HTTPエラー: ${res.status}`);
    }

    const posts = await res.json();
    console.log("サーバーから取得したデータ:", posts);

    viewPosts(posts);
  } catch (error) {
    console.error(error);
  }
};

const viewPosts = (posts) => {
  const postList = document.getElementById("post-list");
  posts.forEach((post) => {
    const postItem = document.createElement("li");
    postItem.textContent = `user_id: ${post.user_id} content: ${post.content} created_at: ${post.created_at}`;
    postList.appendChild(postItem);
  });
};
