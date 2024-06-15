export default function enableFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
    document.documentElement.msRequestFullscreen();
  }
}

export function exitFullscreen() {
  if (document.exitFullscreen) {
    document?.exitFullscreen();
  } else if (document.mozExitFullscreen) { /* Firefox */
    document?.mozExitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document?.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document?.msExitFullscreen();
  }
}