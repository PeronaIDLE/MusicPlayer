const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = [
    {
        title: 'Happy Birthday',
        url: 'ChucMungSinhNhat-PhanDinhTung.mp3',
        image: 'tld.jpg',
        imageBg: 'birthday.jpg'
    },
    {
        title: 'Who You?',
        url: 'WHO YOU - G Dragon.mp3',
        image: 'mingo.jpg',
        imageBg: 'gdragon.jpg'
    },
    {
        title: 'Fxxk IT',
        url: 'FXXK IT - BIGBANG.mp3',
        image: 'vip.jpg',
        imageBg: 'fxxk-it.jpg'
    },
    {
        title: 'Umbrella',
        url: 'Umbrella Matte Remix- Ember Island.mp3',
        image: 'nami.jpg',
        imageBg: 'girl.jpg'
    },
    {
        title: 'Em Có Biết',
        url: 'Em Có Biết.mp3',
        image: 'emcobiet.jpg',
        imageBg: 'yourname.jpg'
    },
    {
        title: 'Blue',
        url: 'Blue - Big Bang.mp3',
        image: 'blue.jpg',
        imageBg: 'blueBg.jpg'
    },
];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);
console.log(songs[0]);

// Update song details
function loadSong(song) {
    console.log(song)
    title.innerText = song.title;
    audio.src = `music/${song.url}`;
    cover.src = `images/${song.image}`;
    document.body.style.backgroundImage = `url('images/${song.imageBg}')`;
}

// Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
