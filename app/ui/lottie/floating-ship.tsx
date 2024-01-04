'use client'
import animationData from "@/public/lottie/ship.json";
import Lottie from "lottie-react";

export default function FloatingShip() {
    return <Lottie
        animationData={animationData}
        className={'opacity-90'}
        loop={true}
    />
}
