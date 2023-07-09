window.addEventListener("DOMContentLoaded", () => {
    const GRID_HEIGHT = 16;
    const GRID_WIDTH = 16;
    const GRID_PROPORTIONS = 256;
    const CONTAINER_GRID_PROPORTIONS = Math.pow(256, 2);
    const MAX_RGB_COLOR = 3;
    let isMousedown = false;

    let randomRGBColor = Math.floor(Math.random() * 256);
    const body = document.querySelector("body");

    const gridContainer = document.querySelector(".grid-container");

    for (let i = GRID_PROPORTIONS; i <= CONTAINER_GRID_PROPORTIONS; i += GRID_PROPORTIONS) {
        const div = document.createElement("div");
        div.style.height = "16px"
        div.style.width = "16px";
        // div.style.backgroundColor = `rgb(${randomRGBRed}, ${randomRGBBlue}, ${randomRGBGreen})`;
        div.classList.add("grid");
        gridContainer.appendChild(div);
    }

    const divs = gridContainer.querySelectorAll(".grid");

    gridContainer.addEventListener("mousedown", () => {
        isMousedown = true;
    })

    gridContainer.addEventListener("mouseup", () => {
        isMousedown = false;
    })

    document.addEventListener("dragstart", () => {
        return false;
    });
    document.addEventListener("selectstart", () => {
        return false;
    });

    divs.forEach(div => {
        div.addEventListener("mouseover", e => {
            if (isMousedown) {
                e.preventDefault();
                let randomRGBRed;
                let randomRGBBlue;
                let randomRGBGreen;
                for (let j = 0; j < MAX_RGB_COLOR; j++) {
                    randomRGBRed = Math.floor(Math.random() * 256);
                    randomRGBBlue = Math.floor(Math.random() * 256);
                    randomRGBGreen = Math.floor(Math.random() * 256);
                }
                div.style.backgroundColor = `rgb(${randomRGBRed}, ${randomRGBBlue}, ${randomRGBGreen})`;
            }

        })
    })
});