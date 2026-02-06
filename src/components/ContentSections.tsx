"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <section className={clsx("min-h-screen flex items-center justify-center py-24 px-6 relative", className)}>
            {children}
        </section>
    );
};

// Text Reveal Component
const TextReveal = ({ text }: { text: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <p ref={ref} className="text-4xl md:text-6xl font-light text-matcha-900 leading-tight">
            {text.split(" ").map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                    className="inline-block mr-3"
                >
                    {word}
                </motion.span>
            ))}
        </p>
    );
};

export default function ContentSections() {
    return (
        <div className="-mt-[100vh] relative z-10 bg-matcha-50 rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.05)] overflow-hidden">

            {/* About Section */}
            <Section className="bg-matcha-50">
                <div className="max-w-4xl mx-auto text-center">
                    <TextReveal text="Matcha is not just tea. It is a moment of pause in a chaotic world. Grown in shade, ground by stone, consumed with intention." />
                </div>
            </Section>

            {/* Bento Grid */}
            <Section className="bg-matcha-100">
                <div className="max-w-6xl w-full mx-auto">
                    <h3 className="text-3xl font-light text-matcha-900 mb-12">
                        Our Collection
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

                        {/* Large item — Ceremonial */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="md:col-span-2 row-span-2 rounded-3xl relative overflow-hidden group"
                        >
                            {/* Image */}
                            <img
                                src="/images/image-4.jpg"
                                alt="Ceremonial Matcha"
                                className="absolute inset-0 w-full h-full object-cover z-0"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500 z-0" />

                            {/* Content */}
                            <div className="relative z-10 h-full p-10 flex flex-col justify-between">
                                <h4 className="text-4xl font-light text-white">
                                    Ceremonial Grade
                                </h4>

                                <div className="self-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="bg-matcha-50 text-matcha-900 px-6 py-2 rounded-full text-sm">
                                        Explore
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Small item — Whisk Set */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl overflow-hidden flex flex-col"
                        >
                            {/* Image */}
                            <img
                                src="/images/image-2.jpg"
                                alt="Matcha Whisk Set"
                                className="h-40 w-full object-cover"
                            />

                            {/* Content */}
                            <div className="p-6 flex flex-col justify-between flex-1">
                                <h4 className="text-2xl text-matcha-900">
                                    Whisk Set
                                </h4>
                                <p className="text-sm opacity-70">
                                    Traditional bamboo tools for perfect foam.
                                </p>
                            </div>
                        </motion.div>

                        {/* Small item — Daily Grade */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="rounded-3xl overflow-hidden bg-matcha-300 flex flex-col"
                        >
                            {/* Image */}
                            <img
                                src="/images/image-3.jpg"
                                alt="Daily Matcha"
                                className="h-40 w-full object-cover"
                            />

                            {/* Content */}
                            <div className="p-6 text-matcha-900">
                                <h4 className="text-2xl">
                                    Daily Grade
                                </h4>
                                <p className="mt-2 text-sm opacity-80">
                                    Perfect for lattes and smoothies.
                                </p>
                            </div>
                        </motion.div>

                        {/* Wide item — Subscription */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="md:col-span-3 rounded-3xl overflow-hidden relative"
                        >
                            {/* Background Image */}
                            <img
                                src="/images/image-3.jpg"
                                alt="Matcha Ritual"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-matcha-900/80" />

                            {/* Content */}
                            <div className="relative z-10 p-12 flex flex-col md:flex-row items-center justify-between text-matcha-50">
                                <div className="mb-6 md:mb-0">
                                    <h4 className="text-3xl font-light mb-2">
                                        Subscribe & Save
                                    </h4>
                                    <p className="opacity-70">
                                        Never run out of your daily ritual.
                                    </p>
                                </div>

                                <button className="bg-matcha-50 text-matcha-900 px-8 py-3 rounded-full hover:bg-matcha-200 transition-colors">
                                    Start Subscription
                                </button>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </Section>

            {/* Stats Section */}
            <Section className="bg-matcha-50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl w-full mx-auto text-center">
                    {[
                        { label: "Antioxidants", value: "137×" },
                        { label: "Origin", value: "Uji" },
                        { label: "Milled", value: "Stone" },
                        { label: "Harvest", value: "Spring" }
                    ].map((stat, i) => (
                        <div key={i}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="text-5xl md:text-7xl font-bold text-matcha-400 mb-2"
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-sm uppercase tracking-widest text-matcha-900">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Testimonial */}
            <Section className="bg-matcha-100">
                <div className="max-w-3xl mx-auto text-center">
                    <h3 className="text-sm uppercase tracking-widest mb-12 opacity-50">Community</h3>
                    <p className="text-2xl md:text-4xl font-light italic leading-relaxed text-matcha-900">
                        &quot;The quality of this matcha is unmatched. The color is a vibrant jade green, and the taste is smooth, creamy, and devoid of bitterness. It has transformed my mornings.&quot;
                    </p>
                    <div className="mt-8 font-bold text-matcha-600">— Sarah J., New York</div>
                </div>
            </Section>

            {/* Footer */}
            <footer className="bg-matcha-900 text-matcha-100 py-24 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tighter mb-6">MATCHA</h2>
                        <div className="flex gap-4 text-sm opacity-60">
                            <a href="#" className="hover:opacity-100">Instagram</a>
                            <a href="#" className="hover:opacity-100">Twitter</a>
                            <a href="#" className="hover:opacity-100">Email</a>
                        </div>
                    </div>
                    <div className="flex gap-12 text-sm">
                        <div className="flex flex-col gap-4">
                            <span className="uppercase opacity-50 tracking-widest">Shop</span>
                            <a href="#" className="hover:underline">Ceremonial</a>
                            <a href="#" className="hover:underline">Daily</a>
                            <a href="#" className="hover:underline">Sets</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="uppercase opacity-50 tracking-widest">Company</span>
                            <a href="#" className="hover:underline">About</a>
                            <a href="#" className="hover:underline">Contact</a>
                            <a href="#" className="hover:underline">Terms</a>
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto mt-24 pt-8 border-t border-matcha-800 text-xs opacity-40 flex justify-between">
                    <span>© 2026 Matcha Inc.</span>
                    <span>Designed by Daffa</span>
                </div>
            </footer>

        </div>
    );
}
