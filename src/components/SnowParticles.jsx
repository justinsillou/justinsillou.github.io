import { useEffect } from "preact/hooks";
import { tsParticles } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function SnowParticles() {
    useEffect(() => {
        loadSlim(tsParticles).then(() => {
            tsParticles.load("snow", {
                fullScreen: {
                    enable: true,
                    zIndex: 0,
                },
                particles: {
                    number: { value: 120 },
                    color: { value: "#ffffff" },
                    opacity: { value: 0.8 },
                    size: { value: { min: 1, max: 4 } },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "bottom",
                    },
                },
            });
        });
    }, []);

    return <div id="snow"></div>;
}
