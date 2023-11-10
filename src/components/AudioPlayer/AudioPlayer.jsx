import { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import { PlayerButton, PlayerWrapper } from "./AudioPlayer.styled";

const formWaveSurferOptions = (ref, height, width, waveColor) => ({
  container: ref,
  waveColor: waveColor,
  progressColor: "#262626",
  cursorColor: "none",
  barWidth: width,
  barRadius: 10,
  responsive: true,
  height: height,
  normalize: true,
  partialRender: true
});
// eslint-disable-next-line react/prop-types
export default function Waveform({url, svgSize, trackSize, barWidth}) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);

  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(
      waveformRef.current,
      trackSize,
      barWidth,
      "#262626"
    );

    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("play", function () {
      wavesurfer.current?.setOptions({ waveColor: "rgba(202, 93, 151, 1)" });
    });

    wavesurfer.current.on("finish", function () {
      if (wavesurfer.current) {
        setPlay(false);
      }
    });

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [barWidth, trackSize, url]);

  const handlePlayPause = () => {
    setPlay(!playing);
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  };

  return (
    <PlayerWrapper>
      <div id="waveform" style={{ width: "100%" }} ref={waveformRef} />
      <PlayerButton onClick={handlePlayPause}>
        {!playing ? (
          <svg
            width={svgSize}
            height={svgSize}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
              fill="#1C274C"
            />
          </svg>
        ) : (
          <svg
            fill="#000000"
            width={svgSize}
            height={svgSize}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 47.607 47.607"
          >
            <g>
              <path
                d="M17.991,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C4.729,2.969,7.698,0,11.36,0
		l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"
              />
              <path
                d="M42.877,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631
		C29.616,2.969,32.585,0,36.246,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"
              />
            </g>
          </svg>
        )}
      </PlayerButton>
    </PlayerWrapper>
  );
}
