(function () {
  var audioSrc = "./@purrp_files/purpl-music.mp3";
  var buttonSelector = ".GUNS__90-2f1123ac-d6ec9f60-17266127";
  var playerId = "purpl-music-player";
  var styleId = "purpl-music-style";

  function injectStyle() {
    if (document.getElementById(styleId)) {
      return;
    }

    var style = document.createElement("style");
    style.id = styleId;
    style.textContent = [
      ".GUNS__90-2f1123ac-d6ec9f60-17266127{cursor:pointer;user-select:none;transition:transform 180ms ease,box-shadow 180ms ease,background 180ms ease;}",
      ".GUNS__90-2f1123ac-d6ec9f60-17266127:hover,.GUNS__90-2f1123ac-d6ec9f60-17266127:focus-visible{transform:translateY(-1px);outline:none;}",
      ".GUNS__90-2f1123ac-d6ec9f60-17266127.purpl-music-playing{box-shadow:0 0 24px rgba(255,197,211,.42)!important;}",
      ".GUNS__90-2f1123ac-d6ec9f60-17266127.purpl-music-playing>span{color:#ffc5d3!important;filter:drop-shadow(0 0 10px rgba(255,197,211,.8));}",
      ".GUNS__90-2f1123ac-d6ec9f60-17266127.purpl-music-error{box-shadow:0 0 24px rgba(255,100,140,.45)!important;}"
    ].join("");
    document.head.appendChild(style);
  }

  function getPlayer() {
    var player = document.getElementById(playerId);

    if (!player) {
      player = document.createElement("audio");
      player.id = playerId;
      player.src = audioSrc;
      player.preload = "auto";
      player.loop = true;
      player.volume = 0.55;
      player.style.display = "none";
      document.body.appendChild(player);
    }

    return player;
  }

  function updateButton(button, player) {
    var isPlaying = !player.paused;
    button.classList.toggle("purpl-music-playing", isPlaying);
    button.setAttribute("aria-label", isPlaying ? "Pause music" : "Play music");
    button.setAttribute("title", isPlaying ? "Pause music" : "Play music");
  }

  function bindMusicButton() {
    injectStyle();

    var button = document.querySelector(buttonSelector);

    if (!button || button.dataset.purplMusicReady === "true") {
      return;
    }

    var player = getPlayer();
    button.dataset.purplMusicReady = "true";
    button.setAttribute("role", "button");
    button.setAttribute("tabindex", "0");

    function toggleMusic(event) {
      if (event.target && event.target.matches("input[type='range']")) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (player.paused) {
        player.play().then(function () {
          updateButton(button, player);
        }).catch(function () {
          button.classList.add("purpl-music-error");
        });
      } else {
        player.pause();
        updateButton(button, player);
      }
    }

    button.addEventListener("click", toggleMusic);
    button.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        toggleMusic(event);
      }
    });
    player.addEventListener("play", function () {
      updateButton(button, player);
    });
    player.addEventListener("pause", function () {
      updateButton(button, player);
    });

    updateButton(button, player);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindMusicButton);
  } else {
    bindMusicButton();
  }

  setTimeout(bindMusicButton, 500);
  setTimeout(bindMusicButton, 1500);
})();
