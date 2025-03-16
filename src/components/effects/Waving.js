"use client";
import React, { useEffect, useRef } from "react";

const WaveEffect = ({ height = 150 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = height;

    let waveOffset = 0;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(255, 255, 255, 0.2)"; // White light wave color
      ctx.beginPath();

      const amplitude = 20; // Height of wave peaks
      const wavelength = 400; // Distance between peaks
      const speed = 0.5; // Wave movement speed

      for (let x = 0; x < canvas.width; x++) {
        const y =
          Math.sin((x + waveOffset) * (Math.PI / wavelength)) * amplitude +
          height / 2;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();

      waveOffset += speed;
      requestAnimationFrame(drawWave);
    };

    drawWave();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = height;
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default WaveEffect;
