"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { Settings, Wrench } from "lucide-react";
import { useGetSettingsQuery } from "../redux/apis/settings";

export const MaintenanceMode: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { data, isLoading } = useGetSettingsQuery()
    const enableMaintenance = data?.enableMaintenance && process.env.NEXT_PUBLIC_BASE_URL === 'https://wheeltireusa.com'

    if (isLoading) {
        return (
            <div className="min-h-screen w-full bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Ambient Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center z-10"
                >
                    <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-zinc-900/80 border border-zinc-800/50 shadow-2xl backdrop-blur-xl mb-6">
                        <Settings className="w-10 h-10 text-primary animate-[spin_3s_linear_infinite]" />
                        <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl animate-ping opacity-20" />
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-400 text-lg font-medium tracking-wide animate-pulse"
                    >
                        Initializing...
                    </motion.p>
                </motion.div>
            </div>
        )
    }

    if (!enableMaintenance) {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen w-full bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-xl bg-zinc-900/60 border border-zinc-800/50 backdrop-blur-xl rounded-3xl p-10 md:p-16 shadow-2xl flex flex-col items-center text-center"
            >
                {/* Logo Section */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-12 relative w-64 h-20"
                >
                    <Image
                        src="/images/logo.png"
                        alt="Wheel Tire USA"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </motion.div>

                {/* Animated Icon Container */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                    className="relative mb-10"
                >
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                    <div className="relative flex items-center justify-center w-28 h-28 rounded-3xl bg-zinc-800/80 border border-zinc-700/50 shadow-inner">
                        <Settings className="w-14 h-14 text-primary animate-[spin_4s_linear_infinite]" />
                        <div className="absolute bottom-[-10px] right-[-10px] bg-zinc-900 p-2 rounded-xl border border-zinc-800 shadow-lg">
                            <Wrench className="w-6 h-6 text-zinc-400" />
                        </div>
                    </div>
                </motion.div>

                {/* Typography */}
                <motion.h1
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
                >
                    Under Maintenance
                </motion.h1>

                <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-10"
                >
                    We're currently fine-tuning our engine to bring you an even better experience. We'll be back on the road shortly.
                </motion.p>

                {/* Status Indicator */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="flex items-center space-x-4 bg-zinc-900/80 rounded-full py-3 px-6 border border-zinc-700/50 shadow-sm"
                >
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                    <span className="text-sm md:text-base font-medium text-zinc-300">System Upgrades in Progress</span>
                </motion.div>
            </motion.div>

            {/* Footer Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-8 left-0 right-0 text-center"
            >
                <p className="text-zinc-600 text-sm font-medium tracking-wide">
                    © {new Date().getFullYear()} Wheel Tire USA. All rights reserved.
                </p>
            </motion.div>
        </div>
    )
}