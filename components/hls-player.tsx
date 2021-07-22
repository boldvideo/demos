import * as React from "react";
import Hls from "hls.js";

export function HlsPlayer() {
  const videoEl = React.useRef(null);

  React.useEffect(() => {
    // var video = document.getElementById('video');
    const video = videoEl.current;
    if (Hls.isSupported()) {
      var hls = new Hls({
        debug: true
      });
      hls.loadSource(
        "https://stream.mux.com/k02s1qHF0102S6vHADc00z1wCoICAsSbUOm9.m3u8"
      );
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, function() {
        video.muted = true;
        video.play();
      });
    }
    // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
    // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
    // This is using the built-in support of the plain video element, without using hls.js.
    else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src =
        "https://stream.mux.com/k02s1qHF0102S6vHADc00z1wCoICAsSbUOm9.m3u8";
      video.addEventListener("canplay", function() {
        video.play();
      });
    }
  }, []);

  return (
    <video
      className="w-full"
      id="video"
      ref={videoEl}
      controls={false}
      autoPlay
    ></video>
  );
}
