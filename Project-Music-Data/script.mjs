// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.
import { getUserIDs } from "./data.mjs";

import { getMostListenedSong, getMostListenedArtist } from "./analysis.js";

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

    const events = getListenEvents(userID);

    if (events.length === 0) {
      results.innerHTML = "<p>This user didn't listen to any songs.</p>";
      return;
    }

    const song = getMostListenedSong(events);
    const artist = getMostListenedArtist(events);

    results.innerHTML = `
      <h2>Results</h2>
      <p>Most listened song:
      ${song.artist} - ${song.title}
      </p>
      <p>Most listened artist: ${artist}</p>
    `;
  });
};
