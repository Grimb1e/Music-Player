import axios from "axios";
import debounce from 'lodash/debounce';

const input = document.querySelector("input") as HTMLInputElement;
const MusicDetails = document.querySelector(".song-info") as HTMLDivElement;
const MusicImage = document.querySelector(".song-image") as HTMLImageElement;


const showLoadingState = () => {
  MusicImage.style.display = "none";
  MusicDetails.innerHTML = "<p>Loading...</p>";
};

const MusicPlayer = async () => {
  try {
    const search: string = input.value;

    const response = await axios.get(
      `https://deezer-cors-server-production.up.railway.app/api/${search}`
    );

    if (!response.data.data.length) {
      MusicDetails.innerHTML = "<p>Music not found. 😢</p>";
      MusicImage.style.display = "none";
      return;
    }

    const title: string = response.data.data[0].title;
    const image: string = response.data.data[0].album.cover;
    const previewMusic: string = response.data.data[0].preview;
    const musicArtist: string = response.data.data[0].artist.name;

    MusicDetails.innerHTML = `
      <p class="music-title">Music Name: <span>${title}</span></p>
      <p class="music-artist">Music Artist: <span>${musicArtist}</span></p>
      <audio controls>
        <source src="${previewMusic}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>`;

    MusicImage.style.display = "block";
    MusicImage.style.backgroundImage = `url(${image})`;
  } catch (err) {
    console.log(err);
  }
};

const handleInputChange = () => {
  if (input.value.trim().length < 4) {
    MusicDetails.innerHTML = "<p>dzma momindome</p>"
    MusicImage.style.display = "none";
  } else {
    showLoadingState();
    MusicPlayer();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  MusicDetails.innerHTML = "<p>Gamarjoba</p>";
  MusicImage.style.display = "none";
});

input.addEventListener("input", debounce(handleInputChange, 1000));
