let LONGEST_NAME = 'mailModernLabelledAddressAtomDefaultTextColor';
var isSwift = true;

document.addEventListener('DOMContentLoaded', (event) => {
        // Execute after the DOM Loads
        if (document.body.offsetWidth < 450) {
                LONGEST_NAME = 'tertiarySystemGroupedBackgroundColor';
        }
        setColorContainerWidth();
        // addTextSrollingOnHover();
        setColorListULWidth()
        sortListAlphabetically();
})

window.addEventListener('resize', (event) => {
        if (document.body.offsetWidth < 450) {
                LONGEST_NAME = 'tertiarySystemGroupedBackgroundColor';
                setColorContainerWidth();
        }
        setColorListULWidth();
})


function addTextSrollingOnHover() {

        const tansitionTimePerPixel = 0.015;
        const textBoxes = document.querySelectorAll(
                ".colorContainer"
        );

        textBoxes.forEach((textBox) => {
                textBox.addEventListener('mouseenter', () => {
                        let textWidth = textBox.childNodes[3].clientWidth;
                        let boxWidth = parseFloat(getComputedStyle(textBox).width);
                        let translateVal = Math.min(boxWidth - textWidth, 0);
                        let translateTime = - tansitionTimePerPixel * translateVal + "s";
                        textBox.childNodes[3].style.transitionDuration = translateTime;
                        textBox.childNodes[3].style.transform = "translateX(" + translateVal + "px)";
                })
                textBox.addEventListener('mouseleave', () => {
                        textBox.childNodes[3].style.transitionDuration = "0.3s";
                        textBox.childNodes[3].style.transform = "translateX(0)";
                })
        });

}

function filterColorList() {
        // Declare variables
        var input, filter, ul, li, span, i, txtValue;
        input = document.getElementById('searchInput');
        filter = input.value.toUpperCase();
        ul = document.getElementById("colorList");
        li = ul.getElementsByTagName('li');

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
                span = li[i].getElementsByTagName("span")[0];
                txtValue = span.textContent || span.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        li[i].style.display = "";
                } else {
                        li[i].style.display = "none";
                }
        }
}

function langBtnPressed(elmnt) {
        let styleStr = 'background-color: rgb(237, 240, 242); color: rgb(135, 157, 192);';
        elmnt.style = "";
        if (elmnt.id == "swift") {
                isSwift = true;
                let objcBtn = document.getElementById("objc");
                objcBtn.style = styleStr;
        } else {
                isSwift = false;
                let swiftBtn = document.getElementById("swift");
                swiftBtn.style = styleStr;
        }
}

function copyColor(elmnt) {
        let colorStr = elmnt.style.backgroundColor;
        let type = colorStr.split("(")[0];
        let rest = colorStr.split("(")[1];
        rest = rest.substring(0, rest.length - 1);

        var stringToCopy = 'UIColor'; // 'NSColor'

        let colorArr = rest.split(", ");
        let first = parseFloat(colorArr[0]);
        let second = parseFloat(colorArr[1]);
        let third = parseFloat(colorArr[2]);


        switch (type) {
                case 'rgb':
                        var red = first / 255;
                        var green = second / 255;
                        var blue = third / 255;
                        if (isSwift) {
                                stringToCopy += `(red: ${red.toFixed(5)}, green: ${green.toFixed(5)}, blue: ${blue.toFixed(5)}, alpha: ${1.0})`;
                        } else {
                                stringToCopy = `[UIColor colorWithRed: ${red.toFixed(5)} green: ${green.toFixed(5)} blue: ${blue.toFixed(5)} alpha: ${1.0}];`;
                        }
                        copyToClipboard(stringToCopy);
                        break;
                case 'rgba':
                        var red = first / 255;
                        var green = second / 255;
                        var blue = third / 255;
                        var alpha = parseFloat(colorArr[3]);
                        if (isSwift) {
                                stringToCopy += `(red: ${red.toFixed(5)}, green: ${green.toFixed(5)}, blue: ${blue.toFixed(5)}, alpha: ${alpha})`;
                        } else {
                                stringToCopy = `[UIColor colorWithRed: ${red.toFixed(5)} green: ${green.toFixed(5)} blue: ${blue.toFixed(5)} alpha: ${alpha}];`;
                        }
                        copyToClipboard(stringToCopy);
                        break;
                case 'hsl':
                        var hue = first / 360;
                        var saturation = second / 100;
                        var brightness = third / 100;
                        if (isSwift) {
                                stringToCopy += `(hue: ${hue.toFixed(5)}, saturation: ${saturation.toFixed(5)}, brightness: ${brightness.toFixed(5)}, alpha: ${alpha})`;
                        } else {
                                stringToCopy = `[UIColor colorWithHue: ${hue.toFixed(5)} saturation: ${saturation.toFixed(5)} brightness: ${brightness.toFixed(5)} alpha: ${1.0}];`;
                        }
                        copyToClipboard(stringToCopy);
                        break;
                case 'hsla':
                        var hue = first / 360;
                        var saturation = second / 100;
                        var brightness = third / 100;
                        var alpha = parseFloat(colorArr[3]);
                        if (isSwift) {
                                stringToCopy += `(hue: ${hue.toFixed(5)}, saturation: ${saturation.toFixed(5)}, brightness: ${brightness.toFixed(5)}, alpha: ${alpha})`;
                        } else {
                                stringToCopy = `[UIColor colorWithHue: ${hue.toFixed(5)} saturation: ${saturation.toFixed(5)} brightness: ${brightness.toFixed(5)} alpha: ${alpha}];`;
                        }
                        copyToClipboard(stringToCopy);
                        break;
        }
}

function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(dummy);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
}

function setColorContainerWidth() {
        let width = getTextWidth(LONGEST_NAME, 'caption');

        var listItems = document.getElementsByClassName("colorContainer");

        // Add class to each instance in for loop
        for (var i = 0; i < listItems.length; i++) {
                listItems[i].style.width = width + "px";
        }
}

function setColorListULWidth() {
        let width = getTextWidth(LONGEST_NAME, 'caption');
        let docWidth = document.body.offsetWidth;
        let liItemWidth = Math.ceil(width + 60 + 5);

        var listUls = document.getElementsByTagName("ul");
        let numConts = Math.floor(docWidth / liItemWidth);

        const listWidth = numConts * liItemWidth;
        for (var i = 0; i < listUls.length; i++) {
                listUls[i].style.width = listWidth + "px";
        }
}

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 * 
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 * 
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
        // re-use canvas object for better performance
        var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
        var context = canvas.getContext("2d");
        context.font = font;
        var metrics = context.measureText(text);
        return metrics.width;
}

function toggleDarkMode() {
        let theme = "dark";
        if (document.documentElement.getAttribute('data-theme') == "dark") {
                theme = "";
        }
        document.documentElement.classList.add('color-theme-in-transition')
        document.documentElement.setAttribute('data-theme', theme)
        window.setTimeout(function () {
                document.documentElement.classList.remove('color-theme-in-transition')
        }, 1000)

}

function toggleSwiftObjc() {
        isSwift = !isSwift;
}

function sortListAlphabetically(ul) {
        var ul = document.getElementById('colorList');
        let collator = new Intl.Collator('en', {ignorePunctuation: true});

        Array.from(ul.getElementsByTagName("LI"))
                .sort((a, b) => collator.compare(a.getElementsByTagName("span")[0].textContent, b.getElementsByTagName("span")[0].textContent))
                .forEach(li => ul.appendChild(li));
}
