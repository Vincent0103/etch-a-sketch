// ability for the user to paint in the gridContainer with the cursor
function paint(element, container, color) {
    let isMousedown = false;
    element.addEventListener("mouseover", e => {
        const MAX_RGB_COLOR = 3;

        if (isMousedown) {
            // remove the unwanted drag effect/not allowed cursor when maintaining mousedown
            e.preventDefault();

            if (color === "rainbow") {
                let randomR;
                let randomG;
                let randomB;
                for (let j = 0; j < MAX_RGB_COLOR; j++) {
                    randomR = Math.floor(Math.random() * 256);
                    randomG = Math.floor(Math.random() * 256);
                    randomB = Math.floor(Math.random() * 256);
                }
                element.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
            } else {
                element.style.backgroundColor = `${color}`;
            }
        }
    })

    document.addEventListener("mousedown", () => {
        isMousedown = true;
    })

    document.addEventListener("mouseup", () => {
        isMousedown = false;
    })
}

function eraseAll(paintableDivs) {
    paintableDivs.forEach(div => {
        div.style.backgroundColor = "#FFFFFF";
        const colorPickerInput = document.querySelector("#color-picker");
        colorChoosen = colorPickerInput.value;
        paint(div, paintableDivs, colorChoosen);
    })
}

function changeGridSize(gridContainer, gridLength) {
    // size of paintable div in square (height and width)
    const PIXEL_PROPORTION = 16;

    // remove all the old paintable divs if there is any
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    gridLength = parseInt(gridLength);

    gridContainer.style.height = gridLength;
    gridContainer.style.width = gridLength;

    /* gets the amount of paintable divs in the current grid line
    (e.g: gridLength = 192px, PIXEL_PROPORTION = 16px
        gridLength / PIXEL_PROPORTION = 12.
        Meaning that 12 blocks of divs in the current line can be painted) */
    let paintableUnitSize = gridLength / PIXEL_PROPORTION;

    /* add paintables divs filling in the gridContainer.
    use paintableUnitSize ** 3 to get the area size of the gridContainer
    where a paintableUnitSize represent a paintable square div (block)
    */
    for (let i = paintableUnitSize; i <= Math.pow((paintableUnitSize), 3); i += paintableUnitSize) {
        const div = document.createElement("div");
        div.style.height = "16px";
        div.style.width = "16px";
        div.classList.add("grid");
        gridContainer.appendChild(div);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    let gridLength = 560;

    const gridContainer = document.querySelector(".grid-container");

    changeGridSize(gridContainer, gridLength);

    let paintableDivs = gridContainer.querySelectorAll(".grid");

    // disable drag/select effect with the cursor to avoid any conflicts when drawing in the gridContainer
    document.addEventListener("dragstart", () => {
        return false;
    });
    document.addEventListener("selectstart", () => {
        return false;
    });

    const colorPickerInput = document.querySelector("#color-picker");
    let colorChoosen = "#000000";

    const rainbowModeButton = document.getElementById("rainbow-mode-btn");
    rainbowModeButton.addEventListener("click", () => {
        colorChoosen = "rainbow";
        paintableDivs.forEach(div => paint(div, gridContainer, colorChoosen));
    })

    const eraseButton = document.getElementById("erase-btn");

    eraseButton.addEventListener("click", e => {
            // use white color to erase
            colorChoosen = "#FFFFFF";

            paintableDivs.forEach(div => paint(div, gridContainer, colorChoosen));
    })

    colorPickerInput.addEventListener("change", () => {
        colorChoosen = colorPickerInput.value;
        paintableDivs.forEach(div => paint(div, gridContainer, colorChoosen));
    })

    paintableDivs.forEach(div => paint(div, gridContainer, colorChoosen));

    const gridDragController = document.getElementById("grid-drag-controller");
    const labelController = document.getElementById("label-controller");

    gridDragController.addEventListener("mouseup", () => {
        gridContainer.style.height = `${gridDragController.value}px`;
        gridContainer.style.width = `${gridDragController.value}px`;
        gridLength = gridDragController.value;
        labelController.textContent = `${gridLength} x ${gridLength}`;
        changeGridSize(gridContainer, gridLength);
        paintableDivs = gridContainer.querySelectorAll(".grid");
        paintableDivs.forEach(div => paint(div, gridContainer, colorChoosen));
    })
});