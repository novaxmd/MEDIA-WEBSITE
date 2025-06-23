const videoElement = document.getElementById('hentaiVideo');
const videoInfo = document.getElementById('videoInfo');
const errorMsg = document.getElementById('errorMsg');
const reloadBtn = document.getElementById('reloadBtn');

async function loadVideo() {
  errorMsg.textContent = '';
  videoElement.hidden = true;
  videoInfo.innerHTML = '<h2>Loading...</h2><p>Fetching hentai video...</p>';

  try {
    const res = await fetch('https://apis.davidcyriltech.my.id/hentai');
    const json = await res.json();
    const v = json.video;

    videoElement.src = v.video_1 || v.video_2;
    videoElement.hidden = false;

    videoInfo.innerHTML = `
      <h2>${v.title}</h2>
      <p><strong>Category:</strong> ${v.category}</p>
      <p><strong>Views:</strong> ${v.views_count} &nbsp; | &nbsp; ${v.share_count}</p>
    `;
  } catch (err) {
    errorMsg.textContent = "Failed to load video. Please try again later.";
    videoInfo.innerHTML = '<h2>Error</h2>';
  }
}

reloadBtn.addEventListener("click", loadVideo);

// Load on page start
loadVideo();
