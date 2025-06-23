async function handleDownload(type) {
      const query = document.getElementById("ytQuery").value.trim();
      const resultContainer = document.getElementById("resultContainer");
      const errorMsg = document.getElementById("errorMsg");
      resultContainer.innerHTML = '';
      errorMsg.textContent = '';

      if (!query) {
        errorMsg.textContent = "❌ Please enter a YouTube video name.";
        return;
      }

      try {
        // Step 1: Search video
        const searchRes = await fetch(`https://my-rest-apis-six.vercel.app/yts?query=${encodeURIComponent(query)}`);
        const searchJson = await searchRes.json();

        if (!searchJson.results || searchJson.results.length === 0) {
          throw new Error("No results found.");
        }

        const video = searchJson.results[0];
        const videoUrl = video.url;

        // Step 2: Get download link
        const endpoint = type === 'audio' 
          ? `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`
          : `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;

        const downloadRes = await fetch(endpoint);
        const downloadJson = await downloadRes.json();

        if (!downloadJson.success || !downloadJson.result?.download_url) {
          throw new Error("Download not available. Try another video.");
        }

        const d = downloadJson.result;

        resultContainer.innerHTML = `
          <div class="result">
            <img class="thumbnail" src="${d.thumbnail}" alt="Thumbnail">
            <div class="info">
              <h2>${d.title}</h2>
              <p><strong>Type:</strong> ${d.type}</p>
              <p><strong>Quality:</strong> ${d.quality}</p>
              <a class="download-link" href="${d.download_url}" target="_blank" download>
                ⬇ Download ${type === 'audio' ? 'MP3' : 'MP4'}
              </a>
            </div>
          </div>
        `;
      } catch (err) {
        console.error(err);
        errorMsg.textContent = "❌ " + err.message;
      }
    }
