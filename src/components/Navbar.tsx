"use client";

import { motion, AnimatePresence, Variants, cubicBezier } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

const easeSmooth = cubicBezier(0.76, 0, 0.24, 1);

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuVariants: Variants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                duration: 0.5,
                ease: easeSmooth,
            },
        },
        open: {
            opacity: 1,
            y: "0%",
            transition: {
                duration: 0.5,
                ease: easeSmooth,
            },
        },
    };

    const linkVariants: Variants = {
        closed: {
            y: 20,
            opacity: 0,
        },
        open: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.1 * i + 0.3,
                duration: 0.5,
                ease: "easeOut",
            },
        }),
    };

    return (
        <>
            <nav
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center transition-all duration-300",
                    isScrolled ? "bg-matcha-50/80 backdrop-blur-md" : ""
                )}
            >
                <div className="text-xl font-bold tracking-tighter z-50 mix-blend-difference text-white">
                    MATCHA
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="z-50 flex flex-col gap-1.5 p-2 group cursor-pointer"
                >
                    <span
                        className={clsx(
                            "w-8 h-0.5 bg-matcha-900 transition-transform duration-300 origin-center group-hover:scale-x-75",
                            isOpen && "rotate-45 translate-y-2 bg-white"
                        )}
                    />
                    <span
                        className={clsx(
                            "w-8 h-0.5 bg-matcha-900 transition-opacity duration-300",
                            isOpen && "opacity-0"
                        )}
                    />
                    <span
                        className={clsx(
                            "w-8 h-0.5 bg-matcha-900 transition-transform duration-300 origin-center group-hover:scale-x-75",
                            isOpen && "-rotate-45 -translate-y-2 bg-white"
                        )}
                    />
                </button>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed inset-0 bg-matcha-600 z-40 flex flex-col items-center justify-center text-white"
                    >
                        <div className="flex flex-col gap-8 text-center">
                            {["Ritual", "Source", "Shop", "Journal", "Contact"].map(
                                (item, i) => (
                                    <motion.div
                                        key={item}
                                        custom={i}
                                        variants={linkVariants}
                                    >
                                        <Link
                                            href="#"
                                            className="text-5xl md:text-7xl font-thin tracking-tight hover:italic transition-all cursor-pointer"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item}
                                        </Link>
                                    </motion.div>
                                )
                            )}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.8 } }}
                            className="absolute bottom-10 text-sm opacity-50 tracking-widest uppercase"
                        >
                            Pure Focus • Kyoto, Japan
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}