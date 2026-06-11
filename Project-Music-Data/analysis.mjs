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

export function getMostListenedArtistByTime(events) {
  const times = {};

  for (const event of events) {
    const song = getSong(event.song_id);

    times[song.artist] = (times[song.artist] || 0) + song.duration_seconds;
  }

  let winner = null;
  let max = 0;

  for (const [artist, totalTime] of Object.entries(times)) {
    if (totalTime > max) {
      max = totalTime;
      winner = artist;
    }
  }

  return winner;
}

export function getMostListenedSongByTime(events) {
  const times = {};

  for (const event of events) {
    const song = getSong(event.song_id);

    times[event.song_id] = (times[event.song_id] || 0) + song.duration_seconds;
  }

  let winner = null;
  let max = 0;

  for (const [songId, totalTime] of Object.entries(times)) {
    if (totalTime > max) {
      max = totalTime;
      winner = songId;
    }
  }

  return getSong(winner);
}

export function getFridayNightSong(events) {
  const counts = {};

  for (const event of events) {
    const date = new Date(event.timestamp);
    const day = date.getUTCDay();
    const hour = date.getUTCHours();

    if (day === 5 && hour >= 18 && hour < 22) {
      counts[event.song_id] = (counts[event.song_id] || 0) + 1;
    }
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

export function getFridayNightSongByTime(events) {
  const times = {};

  for (const event of events) {
    const date = new Date(event.timestamp);
    const day = date.getDay();
    const hour = date.getHours();

    const isFridayNight = (day === 5 && hour >= 17) || (day === 6 && hour < 4);

    if (isFridayNight) {
      const song = getSong(event.song_id);

      times[event.song_id] =
        (times[event.song_id] || 0) + song.duration_seconds;
    }
  }

  let winner = null;
  let max = 0;

  for (const [songId, totalTime] of Object.entries(times)) {
    if (totalTime > max) {
      max = totalTime;
      winner = songId;
    }
  }

  return winner ? getSong(winner) : null;
}

export function getLongestStreak(events) {
  let currentSong = null;
  let currentStreak = 0;
  let bestSong = null;
  let bestStreak = 0;

  for (const event of events) {
    if (event.song_id === currentSong) {
      currentStreak++;
    } else {
      currentSong = event.song_id;
      currentStreak = 1;
    }

    if (currentStreak > bestStreak) {
      bestStreak = currentStreak;
      bestSong = currentSong;
    }
  }

  // Simplified logic for demonstration purposes
  return {
    song: getSong(bestSong),
    streak: bestStreak,
  };
}

export function getEveryDaySongs(events) {
  const allDays = new Set();
  const songDays = {};

  for (const event of events) {
    const day = event.timestamp.split("T")[0]; // Get date part only
    allDays.add(day);

    if (!songDays[event.song_id]) {
      songDays[event.song_id] = new Set();
    }
    songDays[event.song_id].add(day);
  }

  // Return an array of all unique songs listened to every day
  return Object.entries(songDays)
    .filter(([, days]) => days.size === allDays.size)
    .map(([songId]) => {
      const song = getSong(songId);
      return `${song.artist} - ${song.title}`;
    });
}

export function getTopGenres(events) {
  const genreCounts = {};

  for (const event of events) {
    const song = getSong(event.song_id);
    genreCounts[song.genre] = (genreCounts[song.genre] || 0) + 1;
  }

  // Return an array of the top genres
  return Object.entries(genreCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([genre]) => genre);
}
