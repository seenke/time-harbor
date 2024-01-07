'use client'
import animationData from "@/public/lottie/clock.json";
import Lottie from "lottie-react";

export default function Clock() {
    return <Lottie
        animationData={animationData}
        loop={true}
    />
}
