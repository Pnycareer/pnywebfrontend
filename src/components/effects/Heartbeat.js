"use client";
import { useEffect, useRef } from "react";

export default function WavesBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = 300;

    let waveOffset = 0;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x < canvas.width; x++) {
        const y =
          50 * Math.sin((x + waveOffset) * 0.02) +
          40 * Math.cos((x + waveOffset) * 0.01) +
          canvas.height / 2;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      waveOffset += 1;

      requestAnimationFrame(drawWave);
    };

    drawWave();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
