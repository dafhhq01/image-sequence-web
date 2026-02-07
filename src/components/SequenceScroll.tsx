"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const FRAME_COUNT = 240;
const SMOOTHING = 0.12; // semakin kecil = semakin halus

export default function SequenceScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // scroll progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // raw target frame (boleh maju & mundur)
    const targetFrame = useTransform(
        scrollYProgress,
        [0, 1],
        [0, FRAME_COUNT - 1]
    );

    // ----------------------------
    // PRELOAD IMAGES
    // ----------------------------
    const preloadImage = (src: string): Promise<HTMLImageElement | null> =>
        new Promise((resolve) => {
            const img = new Image();
            img.src = src;

            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
        });

    useEffect(() => {
        const loadImages = async () => {
            const results = await Promise.all(
                Array.from({ length: FRAME_COUNT }, (_, i) =>
                    preloadImage(
                        `/sequence/frame-${String(i + 1).padStart(3, "0")}.webp`
                    )
                )
            );

            setImages(results.filter(Boolean) as HTMLImageElement[]);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    // ----------------------------
    // CANVAS RENDER (SMOOTH + REVERSIBLE)
    // ----------------------------
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let currentFrame = 0;
        let rafId = 0;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        window.addEventListener("resize", resize);

        const render = () => {
            const target = targetFrame.get();

            // 🔥 LERP SMOOTHING (ANTI BOUNCE)
            currentFrame += (target - currentFrame) * SMOOTHING;

            const frame = Math.min(
                FRAME_COUNT - 1,
                Math.max(0, Math.floor(currentFrame))
            );

            const img = images[frame];
            if (img) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const cw = window.innerWidth;
                const ch = window.innerHeight;

                const ir = img.width / img.height;
                const cr = cw / ch;

                let dw, dh, ox, oy;

                if (ir > cr) {
                    dh = ch;
                    dw = ch * ir;
                    ox = (cw - dw) / 2;
                    oy = 0;
                } else {
                    dw = cw;
                    dh = cw / ir;
                    ox = 0;
                    oy = (ch - dh) / 2;
                }

                const scale = 1.05;
                ctx.drawImage(
                    img,
                    ox - (dw * (scale - 1)) / 2,
                    oy - (dh * (scale - 1)) / 2,
                    dw * scale,
                    dh * scale
                );
            }

            rafId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", resize);
        };
    }, [images, targetFrame]);

    // ----------------------------
    // TEXT ANIMATIONS (UNCHANGED)
    // ----------------------------
    const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

    const opacity2 = useTransform(
        scrollYProgress,
        [0.15, 0.25, 0.35, 0.45],
        [0, 1, 1, 0]
    );
    const x2 = useTransform(scrollYProgress, [0.15, 0.25], [-50, 0]);

    const opacity3 = useTransform(
        scrollYProgress,
        [0.45, 0.55, 0.65, 0.75],
        [0, 1, 1, 0]
    );
    const x3 = useTransform(scrollYProgress, [0.45, 0.55], [50, 0]);

    const opacity4 = useTransform(scrollYProgress, [0.75, 0.9, 1], [0, 1, 1]);
    const scale4 = useTransform(scrollYProgress, [0.75, 0.9], [0.9, 1]);

    return (
        <div ref={containerRef} className="h-[400vh] relative z-0">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className={clsx(
                        "w-full h-full transition-opacity duration-700",
                        isLoading ? "opacity-0" : "opacity-100"
                    )}
                />

                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-matcha-50 text-matcha-900">
                        <span className="tracking-widest uppercase text-sm animate-pulse">
                            Brewing…
                        </span>
                    </div>
                )}

                {/* TEXT OVERLAYS (FULL) */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-matcha-900 mb-6">MATCHA</h1>
                        <p className="text-xl md:text-2xl font-light text-matcha-600 tracking-wide max-w-lg">
                            The ritual of focus.
                        </p>
                        <div className="mt-12 opacity-50 text-sm uppercase tracking-widest animate-bounce">
                            Scroll to Explore
                        </div>
                    </motion.div>

                    <motion.div style={{ opacity: opacity2, x: x2 }} className="absolute inset-0 flex items-center justify-start p-12 md:p-24">
                        <div className="max-w-xl text-left">
                            <h2 className="text-4xl md:text-6xl font-light text-matcha-900 mb-4">
                                Calm energy,<br />Pure clarity.
                            </h2>
                            <p className="text-lg md:text-xl text-matcha-600">
                                Sourced from the misty hills of Uji, hand-picked for ceremonial grade.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div style={{ opacity: opacity3, x: x3 }} className="absolute inset-0 flex items-center justify-end p-12 md:p-24">
                        <div className="max-w-xl text-right">
                            <h2 className="text-4xl md:text-6xl font-light text-matcha-900 mb-4">
                                Ancient ritual,<br />Modern mind.
                            </h2>
                            <p className="text-lg md:text-xl text-matcha-600">
                                A daily practice to center your thoughts and awaken your senses.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div style={{ opacity: opacity4, scale: scale4 }} className="absolute inset-0 flex flex-col items-center justify-center">
                        <h2 className="text-5xl md:text-8xl font-bold text-matcha-900 mb-8">
                            Elevate your day.
                        </h2>
                        <a href="#shop" className="pointer-events-auto px-8 py-4 bg-matcha-900 text-matcha-50 rounded-full">
                            Shop Ceremony
                        </a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}