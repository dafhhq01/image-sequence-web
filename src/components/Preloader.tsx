"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Simulasi loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Beri jeda sebentar setelah 100% sebelum loader naik
                    setTimeout(() => setIsVisible(false), 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 30); // Kecepatan loading bisa diatur di sini

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="preloader"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-matcha-50 pointer-events-none"
                >
                    <div className="flex flex-col items-center gap-2">
                        {/* Teks Matcha */}
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold tracking-tighter text-matcha-900"
                        >
                            MATCHA
                        </motion.h1>

                        {/* Angka Persentase */}
                        <motion.span
                            className="text-xl md:text-2xl font-medium text-matcha-900/70 font-mono"
                        >
                            {progress}%
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}