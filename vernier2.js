window.onload = function() {
    createUpperScale();
    createLowerScale();
}

const spacing = 10;

function createUpperScale() {
    const scaleContainer = document.getElementById("scale-upper");
    const totalMarks = 101;
    const containerWidth = scaleContainer.offsetWidth - 40; // Exclude padding
    const spacing = 10;

    for (let i = 0; i < totalMarks; i++) {
        const marking = document.createElement("div");
        marking.classList.add("marking");
        marking.style.left = `${Math.round(10 + i * spacing)}px`;

        if (i % 10 === 0) {
            marking.classList.add("long");

            const label = document.createElement("div");
            label.classList.add("label", "label-top");
            label.style.left = `${Math.round(20 + i * spacing) - 10}px`;
            label.innerText = i / 10;
            scaleContainer.appendChild(label);
        } else if (i % 5 === 0) {
            marking.classList.add("medium");
        } else {
            marking.classList.add("short");
        }

        scaleContainer.appendChild(marking);
    }
}

// Function to create the lower scale
function createLowerScale() {
    const scaleContainer = document.getElementById("scale-lower");
    const totalMarks = 51;
    const containerWidth = scaleContainer.offsetWidth - 40; // Exclude padding
    const upperSpacing = containerWidth / (101 - 1); // Spacing from the upper scale
    const spacing = upperSpacing * 0.95; // 95% of the upper scale spacing

    for (let i = 0; i < totalMarks; i++) {
        const marking = document.createElement("div");
        marking.classList.add("marking");
        marking.style.left = `${Math.round(20 + i * spacing)}px`;
        marking.style.top = "0px"; // Markings come from the top

        if (i % 5 === 0) {
            marking.classList.add("long");

            const label = document.createElement("div");
            label.classList.add("label", "label-bottom");
            label.style.left = `${Math.round(20 + i * spacing) - 10}px`;
            label.innerText = i / 5;
            scaleContainer.appendChild(label);
        } else {
            marking.classList.add("medium");
        }

        scaleContainer.appendChild(marking);
    }
}