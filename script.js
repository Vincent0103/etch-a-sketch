function paint(element, container) {
    let isMousedown = false;
    element.addEventListener("mouseover", e => {
        const MAX_RGB_COLOR = 3;

        if (isMousedown) {
            e.preventDefault();
            let randomR;
            let randomG;
            let randomB;
            for (let j = 0; j < MAX_RGB_COLOR; j++) {
                randomR = Math.floor(Math.random() * 256);
                randomG = Math.floor(Math.random() * 256);
                randomB = Math.floor(Math.random() * 256);
            }
            element.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        }
    })

    container.addEventListener("mousedown", () => {
        isMousedown = true;
    })

    container.addEventListener("mouseup", () => {
        isMousedown = false;
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

    let paintableUnitSize = gridLength / PIXEL_PROPORTION;

    // add paintables divs filling in the gridContainer
    for (let i = paintableUnitSize; i <= Math.pow((paintableUnitSize), 3); i += paintableUnitSize) {
        const div = document.createElement("div");
        div.style.height = "16px";
        div.style.width = "16px";
        div.classList.add("grid");
        gridContainer.appendChild(div);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    let gridProportions = 256;

    const gridContainer = document.querySelector(".grid-container");

    changeGridSize(gridContainer, gridProportions);

    let divs = gridContainer.querySelectorAll(".grid");

    document.addEventListener("dragstart", () => {
        return false;
    });
    document.addEventListener("selectstart", () => {
        return false;
    });

    divs.forEach(div => paint(div, gridContainer));

    const gridDragController = document.getElementById("grid-drag-controller");
    const labelController = document.getElementById("label-controller");

    gridDragController.addEventListener("mouseup", e => {
        gridContainer.style.height = `${gridDragController.value}px`;
        gridContainer.style.width = `${gridDragController.value}px`;
        gridProportions = gridDragController.value;
        labelController.textContent = `${gridProportions} x ${gridProportions}`;
        changeGridSize(gridContainer, gridProportions);
        divs = gridContainer.querySelectorAll(".grid");
        divs.forEach(div => paint(div, gridContainer));
    })
});