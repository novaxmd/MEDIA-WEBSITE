async function searchVideos() {
      const query = document.getElementById('searchInput').value.trim();
      const resultsDiv = document.getElementById('results');
      const errorMsg = document.getElementById('errorMsg');
      const videoPlayer = document.getElementById('videoPlayer');

      resultsDiv.innerHTML = '';
      errorMsg.textContent = '';
      videoPlayer.innerHTML = '';

      if (!query) {
        errorMsg.textContent = '❌ Please enter a search keyword.';
        return;
      }

      try {
        const response = await fetch(`https://apis.davidcyriltech.my.id/search/xvideo?text=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (!data.success || !data.result || data.result.length === 0) {
          throw new Error('No videos found for your query.');
        }

        data.result.forEach(video => {
          const card = document.createElement('div');
          card.className = 'video-card';
          card.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail" />
            <div class="video-info">
              <div class="title" title="${video.title}">${video.title}</div>
              <div class="details">Duration: ${video.duration} | Quality: ${video.quality}</div>
            </div>
          `;
          card.onclick = () => fetchAndPlayVideo(video.url);
          resultsDiv.appendChild(card);
        });
      } catch (error) {
        errorMsg.textContent = '❌ ' + error.message;
        console.error(error);
      }
    }

    async function fetchAndPlayVideo(videoUrl) {
      const videoPlayer = document.getElementById('videoPlayer');
      const errorMsg = document.getElementById('errorMsg');
      errorMsg.textContent = '';
      videoPlayer.innerHTML = '';

      try {
        const response = await fetch(`https://apis.davidcyriltech.my.id/xvideo?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        if (!data.success || !data.download_url) {
          throw new Error('Failed to get download link.');
        }

        videoPlayer.innerHTML = `
          <video controls autoplay>
            <source src="${data.download_url}" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p style="color: var(--highlight); margin-top: 0.5rem;">${data.title}</p>
        `;

        window.scrollTo({ top: videoPlayer.offsetTop, behavior: 'smooth' });
      } catch (error) {
        errorMsg.textContent = '❌ ' + error.message;
        console.error(error);
      }
    }
