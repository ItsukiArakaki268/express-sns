const test = async () => {
  try {
    const res = await fetch("/posts_db");

    if (!res.ok) {
      throw new Error(`HTTPエラー: ${res.status}`);
    }

    const posts = await res.json();
    console.log("サーバーから取得したデータ:", posts);
  } catch (error) {
    console.error(error);
  }
};

const drawCanvas = () => {
  const canvas = document.getElementById("canvas");
  canvas.innerHTML = "Hello JavaScript!";
};
