"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const FRAME_COUNT = 240; // Based on available files

export default function SequenceScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Scroll progress 0 -> 1 based on container height
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll (0-1) to frame index (0-199)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Smooth out the index to prevent jumping
    const smoothFrameIndex = useSpring(frameIndex, { damping: 20, stiffness: 100 });

    useEffect(() => {
        // Preload images
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    // Pad index with zeros (001, 002, etc.)
                    const strIndex = i.toString().padStart(3, "0");
                    img.src = `/sequence/frame-${strIndex}.webp`;
                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const renderFrame = (index: number) => {
            if (images.length === 0) return;

            const frame = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(index)));
            const img = images[frame];
            if (!img) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const canvasWidth = window.innerWidth;
            const canvasHeight = window.innerHeight;

            const imgRatio = img.width / img.height;
            const canvasRatio = canvasWidth / canvasHeight;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgRatio > canvasRatio) {
                drawHeight = canvasHeight;
                drawWidth = canvasHeight * imgRatio;
                offsetX = (canvasWidth - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvasWidth;
                drawHeight = canvasWidth / imgRatio;
                offsetX = 0;
                offsetY = (canvasHeight - drawHeight) / 2;
            }

            const scale = 1.05;
            ctx.drawImage(
                img,
                offsetX - (drawWidth * (scale - 1)) / 2,
                offsetY - (drawHeight * (scale - 1)) / 2,
                drawWidth * scale,
                drawHeight * scale
            );
        };

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);

            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            renderFrame(smoothFrameIndex.get());
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        const unsubscribe = smoothFrameIndex.on("change", renderFrame);

        return () => {
            unsubscribe();
            window.removeEventListener("resize", handleResize);
        };
    }, [images, smoothFrameIndex]);

    // Text Animations
    const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

    const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.15, 0.25], [-50, 0]);

    const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.45, 0.55], [50, 0]);

    const opacity4 = useTransform(scrollYProgress, [0.75, 0.9, 1], [0, 1, 1]);
    const scale4 = useTransform(scrollYProgress, [0.75, 0.9], [0.9, 1]);

    return (
        <div ref={containerRef} className="h-[400vh] relative z-0">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className={clsx(
                        "w-full h-full object-cover transition-opacity duration-1000 ease-out",
                        isLoading ? "opacity-0" : "opacity-100"
                    )}
                />

                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-matcha-50 text-matcha-900">
                        <span className="font-sans tracking-widest uppercase text-sm animate-pulse">Brewing...</span>
                    </div>
                )}

                {/* Text Overlays - Absolute positioned over canvas */}
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">

                    {/* Slide 1: Intro */}
                    <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-matcha-900 mb-6">MATCHA</h1>
                        <p className="text-xl md:text-2xl font-light text-matcha-600 tracking-wide max-w-lg">
                            The ritual of focus.
                        </p>
                        <div className="mt-12 opacity-50 text-sm uppercase tracking-widest animate-bounce">Scroll to Explore</div>
                    </motion.div>

                    {/* Slide 2: Left aligned */}
                    <motion.div style={{ opacity: opacity2, x: x2 }} className="absolute inset-0 flex items-center justify-start p-12 md:p-24">
                        <div className="max-w-xl text-left">
                            <h2 className="text-4xl md:text-6xl font-light text-matcha-900 leading-tight mb-4">
                                Calm energy,<br />Pure clarity.
                            </h2>
                            <p className="text-lg md:text-xl text-matcha-600 font-light">
                                Sourced from the misty hills of Uji, hand-picked for the perfect ceremonial grade.
                            </p>
                        </div>
                    </motion.div>

                    {/* Slide 3: Right aligned */}
                    <motion.div style={{ opacity: opacity3, x: x3 }} className="absolute inset-0 flex items-center justify-end p-12 md:p-24">
                        <div className="max-w-xl text-right">
                            <h2 className="text-4xl md:text-6xl font-light text-matcha-900 leading-tight mb-4">
                                Ancient ritual,<br />Modern mind.
                            </h2>
                            <p className="text-lg md:text-xl text-matcha-600 font-light">
                                A daily practice to center your thoughts and awaken your senses.
                            </p>
                        </div>
                    </motion.div>

                    {/* Slide 4: CTA */}
                    <motion.div style={{ opacity: opacity4, scale: scale4 }} className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <h2 className="text-5xl md:text-8xl font-bold text-matcha-900 mb-8 tracking-tighter">
                            Elevate your day.
                        </h2>
                        <a href="#shop" className="pointer-events-auto px-8 py-4 bg-matcha-900 text-matcha-50 rounded-full text-lg tracking-wide hover:bg-matcha-600 transition-colors duration-300">
                            Shop Ceremony
                        </a>
                    </motion.div>

                </div>

            </div>
        </div>
    );
}
