// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.
import { getUserIDs, getListenEvents } from "./data.mjs";

import {
  getMostListenedSong,
  getMostListenedArtist,
  getMostListenedSongByTime,
  getMostListenedArtistByTime,
  getFridayNightSong,
  getFridayNightSongByTime,
  getLongestStreak,
  getEveryDaySongs,
  getTopGenres,
} from "./analysis.mjs";

window.onload = () => {
  const select = document.getElementById("user-select");

  const results = document.getElementById("results");

  getUserIDs().forEach((userID) => {
    const option = document.createElement("option");

    option.value = userID;
    option.textContent = `User ${userID}`;

    select.appendChild(option);
  });

  select.addEventListener("change", (event) => {
    const userID = event.target.value;

    const events = getListenEvents(userID) || [];

    if (events.length === 0) {
      results.innerHTML = "<p>This user didn't listen to any songs.</p>";
      return;
    }

    const song = getMostListenedSong(events);
    const artist = getMostListenedArtist(events);
    const songByTime = getMostListenedSongByTime(events);
    const artistByTime = getMostListenedArtistByTime(events);
    const fridaySong = getFridayNightSong(events);
    const fridaySongByTime = getFridayNightSongByTime(events);
    const streak = getLongestStreak(events);
    const everyDaySongs = getEveryDaySongs(events);
    const genres = getTopGenres(events);

    console.log("song", song);
    console.log("artist", artist);
    console.log("songByTime", songByTime);
    console.log("artistByTime", artistByTime);

    console.log("fridaySong", fridaySong);
    console.log("fridaySongByTime", fridaySongByTime);

    results.innerHTML = `
  <p><strong>Most listened song:</strong>
  ${song.artist} - ${song.title}</p>

  <p><strong>Most listened artist:</strong>
  ${artist}</p>

  <p><strong>Most listened song by time:</strong>
  ${songByTime.artist} - ${songByTime.title}</p>

  <p><strong>Most listened artist by time:</strong>
  ${artistByTime}</p>

  ${
    fridaySong
      ? `<p><strong>Friday night favourite:</strong>
         ${fridaySong.artist} - ${fridaySong.title}</p>`
      : ""
  }

  ${
    fridaySongByTime
      ? `<p><strong>Friday night favourite by time:</strong>
         ${fridaySongByTime.artist} - ${fridaySongByTime.title}</p>`
      : ""
  }

  ${
    streak
      ? `<p><strong>Longest streak:</strong>
         ${streak.song.artist} - ${streak.song.title} (length: ${streak.streak})</p>`
      : ""
  }

  ${
    everyDaySongs && everyDaySongs.length > 0
      ? `<p><strong>Every day songs:</strong>
         ${everyDaySongs.join(", ")}</p>`
      : ""
  }

  ${
    genres && genres.length > 0
      ? `<p><strong>Top genres:</strong>
         ${genres.join(", ")}</p>`
      : ""
  }
  `;
  });
};
