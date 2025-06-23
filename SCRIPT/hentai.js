    async function searchAndDownload() {
      const query = document.getElementById("searchQuery").value.trim();
      const resultContainer = document.getElementById("resultContainer");
      const errorMsg = document.getElementById("errorMsg");
      resultContainer.innerHTML = '';
      errorMsg.textContent = '';

      if (!query) {
        errorMsg.textContent = "❌ Please enter a search keyword.";
        return;
      }

      try {
        // Step 1: Search
        const searchUrl = `https://apis.davidcyriltech.my.id/search/xnxx?query=${encodeURIComponent(query)}`;
        const searchRes = await fetch(searchUrl);
        const searchJson = await searchRes.json();

        if (!searchJson.status || !searchJson.results.length) {
          throw new Error("No results found for your query.");
        }

        const firstResult = searchJson.results[0];
        const videoUrl = firstResult.link;

        // Step 2: Fetch Download Info
        const api = `https://apis.davidcyriltech.my.id/download/xnxx?url=${encodeURIComponent(videoUrl)}`;
        const res = await fetch(api);
        const data = await res.json();

        if (!data.status || !data.result) {
          throw new Error("Invalid or unavailable video.");
        }

        const video = data.result;

        resultContainer.innerHTML = `
          <div class="result">
            <img class="thumbnail" src="${video.thumbnail}" alt="Thumbnail">
            <div class="info">
              <h2>${video.title}</h2>
              <p>${video.info}</p>
              <p><strong>Duration:</strong> ${video.duration} sec</p>
              <div class="downloads">
                <a href="${video.download.high_quality}" target="_blank" download>⬇ High Quality</a>
                <a href="${video.download.low_quality}" target="_blank" download>⬇ Low Quality</a>
              </div>
            </div>
          </div>
        `;
      } catch (err) {
        console.error(err);
        errorMsg.textContent = "❌ " + err.message;
      }
    }
