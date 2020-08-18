const searchSong = (keyWord) => {
  results.innerHTML = "";
  fetch(`https://api.lyrics.ovh/suggest/${keyWord}`)
    .then((res) => res.json())
    .then((data) => {
      const songs = data.data;

      songs.slice(0, 10).map((song) => {
        let songLyrics = "";
        const resultItem = document.createElement("div");
        const showLyrics = document.createElement("div");

        fetch(`https://api.lyrics.ovh/v1/${song.artist.name}/${song.title}`)
          .then((res) => res.json())
          .then((data) => {
            songLyrics = data.lyrics;
          })
          .then(() => {
            resultItem.setAttribute(
              "class",
              "single-result row align-items-center my-3 p-3"
            );

            showLyrics.setAttribute("class", "d-none text-center");
            showLyrics.setAttribute("id", song.id);

            resultItem.innerHTML = `
                  <div class="col-md-9 d-flex align-items-center">
                    <img class="mr-3" src="${song.album.cover}" />
                    <div class="ml-2">
                       <h4 class="lyrics-name">${song.title}</h4>
                       <p class="author lead">by <span class="font-weight-bold">${song.artist.name}</span></p>
                    </div>
                  </div>
                  <div class="col-md-3 text-md-right text-center lyrics-btn">
                    <button class="btn btn-success" song-id=${song.id}>Get Lyrics</button>
                  </div>
                  `;

            showLyrics.innerHTML = `
                <h2 class="text-success mb-4">${song.title}</h2>
                <pre class='text-white'>${
                  songLyrics ? songLyrics : "No Lyrics Found"
                }
                </pre>`;

            results.appendChild(resultItem);
            results.appendChild(showLyrics);
          });
      });
    });
};
