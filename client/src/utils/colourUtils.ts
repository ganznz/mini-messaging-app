const BASE_HUE = 131;
const TOTAL_COLOURS = 50;
const HUE_ROTATION = 360 / TOTAL_COLOURS;

export const generateColour = (() => {
    let currentIndex = 0;

    return () => {
        const hue = (BASE_HUE + currentIndex * HUE_ROTATION) % 360;
        currentIndex = (currentIndex + 1) % TOTAL_COLOURS;

        return `hsl(${hue}, 95%, 62%)`;
    };
})();
