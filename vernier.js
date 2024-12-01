// If there are 20px btw markings on the linear scale, 1px=0.02mm.

window.onload = function() {
    createUpperScale();
    createLowerScale(0); // argument is in pixels.

    // Initialize inputs
    const mmInput = document.getElementById('mm-input');
    const cmInput = document.getElementById('cm-input');
    mmInput.value = '0.00';
    cmInput.value = '0.000';

    // Event listeners for arrows
    document.getElementById('decrement').addEventListener('click', () => updateMeasurement(-0.02));
    document.getElementById('increment').addEventListener('click', () => updateMeasurement(0.02));
    mmInput.addEventListener('change', (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) { setMeasurement('mm', value);}
    });
    cmInput.addEventListener('change', (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) { setMeasurement('cm', value);}
    });
};

const units = 'cm';
const upperLength = 200; // in mm
const resolution = 0.02; // in mm
const startPadding = 20; // in px
const upperSpacing = 50; // in px
const lowerSpacing = upperSpacing * (1 - resolution);

function createUpperScale() {
    const scaleContainer = document.getElementById("scale-upper");
    scaleContainer.style.width = `${upperLength * upperSpacing + 2 * startPadding}px`;

    for (let i = 0; i <= upperLength; i++) {
        const location = Math.round(startPadding + i * upperSpacing);


        const marking = document.createElement("div");
        marking.classList.add("marking");
        marking.style.left = `${location}px`;

        // Every 10th marking, make it long and add a label.
        if (i % 10 === 0) {
            marking.classList.add("long");

            const label = document.createElement("div");
            label.classList.add("label", "label-top");
            label.style.left = `${location - 3}px`;
            label.innerText = i / 10 + ' ' + units;
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
function createLowerScale(offset) {
    const scaleContainer = document.getElementById("scale-lower");
    const totalMarks = 1 / resolution;
    scaleContainer.style.width = `${totalMarks * lowerSpacing + 2 * startPadding}px`;
    scaleContainer.style.marginLeft = `${offset}px`;

    for (let i = 0; i <= totalMarks; i++) {
        const location = Math.round(startPadding + i * lowerSpacing);


        const marking = document.createElement("div");
        marking.classList.add("marking");
        marking.style.left = `${location}px`;
        marking.style.top = "0px"; // Markings come from the top

        if (i % 5 === 0) {
            marking.classList.add("medium");

            const label = document.createElement("div");
            label.classList.add("label", "label-bottom");
            label.style.left = `${location - 3}px`;
            label.innerText = i / 5;
            scaleContainer.appendChild(label);
        } else {
            marking.classList.add("short");
        }

        scaleContainer.appendChild(marking);
    }
}

function moveLowerScale(offset) {
    console.log(offset);
    document.getElementById("scale-lower").style.marginLeft = `${offset}px`;
}

// Update measurement function
function updateMeasurement(delta) {
    const mmInput = document.getElementById('mm-input');
    const cmInput = document.getElementById('cm-input');

    let currentMM = parseFloat(mmInput.value);
    currentMM = Math.max(0, (currentMM + delta).toFixed(2)); // Prevent negative values

    mmInput.value = currentMM.toFixed(2);
    cmInput.value = (currentMM / 10).toFixed(3);

    moveLowerScale(mmInput.value / resolution);
}

function setMeasurement(unit, value) {
    if (unit === 'mm') {
        // Convert mm to cm and update cm input
        document.getElementById('cm-input').value = (value / 10).toFixed(3);
    } else if (unit === 'cm') {
        // Convert cm to mm and update mm input
        document.getElementById('mm-input').value = (value * 10).toFixed(2);
    }
    updateMeasurement(0);
}