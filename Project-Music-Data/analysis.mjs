import { getSong } from "./data.mjs";

export function getMostListenedSong(events) {
  const counts = {};

  for (const event of events) {
    counts[event.song_id] = (counts[event.song_id] || 0) + 1;
  }

  let winner = null;
  let max = 0;

  for (const [songId, count] of Object.entries(counts)) {
    if (count > max) {
      max = count;
      winner = songId;
    }
  }

  return getSong(winner);
}

export function getMostListenedArtist(events) {
  const counts = {};

    export function getMostListenedSongByTime(events)

   export function getFridayNightSong(events) {
}

export function getFridayNightSongByTime(events) {
}

export function getLongestStreak(events) {
}

export function getEveryDaySongs(events) {
}

export function getTopGenres(events) {
} 

  let winner = null;
  let max = 0;

  for (const [songId, count] of Object.entries(counts)) {
    if (count > max) {
      max = count;
      winner = songId;
    }
  }

  return getSong(winner);
}

export function getMostListenedArtist(events) {
  const counts = {};

  for (const event of events) {
    const song = getSong(event.song_id);

    counts[song.artist] = (counts[song.artist] || 0) + 1;
  }

  let winner = null;
  let max = 0;

  for (const [artist, count] of Object.entries(counts)) {
    if (count > max) {
      max = count;
      winner = artist;
    }
  }

  return winner;
}
