"use client";
import React, { useEffect, useRef } from "react";

const DrizzleEffect = ({ height = 400 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = height;
    };

    resizeCanvas(); // Set initial size
    window.addEventListener("resize", resizeCanvas);

    const particles = [];

    class Drizzle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedY = Math.random() * 3 + 1; // Speed of rain
        this.opacity = Math.random() * 0.5 + 0.2; // Transparency of drizzle
      }

      update() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // Light white drizzle
        ctx.fillRect(this.x, this.y, 2, 6); // Thin rain-like effect
      }
    }

    function init() {
      for (let i = 100; i > 0; i--) {
        particles.push(new Drizzle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default DrizzleEffect;
