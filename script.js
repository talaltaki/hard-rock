const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const results = document.getElementById("results");
const lyrics = document.getElementsByClassName("lyrics-btn");

let lyricsShown = "";

searchBtn.addEventListener("click", (songList) => {
  songList.preventDefault();
  lyricsShown = "";
  if (searchInput.value) {
    searchSong(searchInput.value);
  }
});

results.addEventListener("click", async (lyrics) => {
  let songId = lyrics.target.getAttribute("song-id");
  if (lyricsShown) {
    document.getElementById(lyricsShown).classList.add("d-none");
  }
  document.getElementById(songId).classList.toggle("d-none");
  lyricsShown = songId;
});
