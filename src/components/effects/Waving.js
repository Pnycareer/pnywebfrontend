"use client";
import React, { useEffect, useRef } from "react";

const WaveEffect = ({ height = 160 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = height;
    };

    resizeCanvas();

    let waveOffset = 0;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const waveConfigs = [
        { amplitude: 16, wavelength: 500, speed: 0.3, color: "rgba(255,255,255,0.07)", offset: 0 },
        { amplitude: 12, wavelength: 300, speed: 0.2, color: "rgba(255,255,255,0.05)", offset: 100 },
        { amplitude: 20, wavelength: 700, speed: 0.4, color: "rgba(255,255,255,0.04)", offset: 200 },
      ];

      waveConfigs.forEach(({ amplitude, wavelength, speed, color, offset }) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= canvas.width; x++) {
          const y =
            Math.sin((x + waveOffset * speed + offset) * (Math.PI / wavelength)) *
              amplitude +
            height / 2;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        ctx.fillStyle = color;
        ctx.fill();
      });

      waveOffset += 1;
      requestAnimationFrame(drawWave);
    };

    drawWave();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default WaveEffect;
