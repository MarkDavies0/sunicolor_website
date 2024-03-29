let LONGEST_NAME = 'mailModernLabelledAddressAtomDefaultTextColor';
const languages = { SWIFT: 'swift', OBJC: "objc", SWIFTUI: 'swiftui' }
const defaultSwiftNamedColors = ['systemBackground', 'secondarySystemBackground', 'tertiarySystemBackground', 'systemGroupedBackground', 'secondarySystemGroupedBackground', 'tertiarySystemGroupedBackground', 'label', 'secondaryLabel', 'tertiaryLabel', 'quaternaryLabel', 'placeholderText', 'separator', 'opaqueSeparator', 'systemRed', 'systemOrange', 'systemYellow', 'systemGreen', 'systemBlue', 'systemIndigo', 'systemPurple', 'systemTeal', 'systemPink', 'systemGray', 'systemGray2', 'systemGray3', 'systemGray4', 'systemGray5', 'systemGray6'];
const defaultSwiftUIColors = ['black', 'blue', 'gray', 'green', 'orange', 'pink', 'primary', 'purple', 'red', 'white']
const defaultAppKitSwiftNamedColors = ['systemBlue', 'systemBrown', 'systemGray', 'systemGreen', 'systemIndigo', 'systemOrange', 'systemPink', 'systemPurple', 'systemRed', 'systemTeal', 'systemYellow', 'black', 'blue', 'brown', 'cyan', 'darkGray', 'gray', 'green', 'lightGray', 'magenta', 'orange', 'purple', 'red', 'white', 'yellow']

let selectedLanguage = languages.SWIFT;

document.addEventListener('DOMContentLoaded', (event) => {
        // Execute after the DOM Loads
        if (document.body.offsetWidth > 450) {
                setColorContainerWidth();
        }

        addNewlineToSubheaderIfScreenTooSmall()
        setColorListULWidth()
        // sortListAlphabetically();
        updateAlphaTag();
        updateFooterDate();
})

window.addEventListener('resize', (event) => {
        if (document.body.offsetWidth < 450) {
                LONGEST_NAME = 'tertiarySystemGroupedBackgroundColor';
                setColorContainerWidth();
        }
        setColorListULWidth();
})

function updateAlphaTag() {
        const colorItems = document.querySelectorAll(".colorItem");

        colorItems.forEach((colorItem) => {
                let actualColorStr = String(colorItem.outerHTML).split(';')[0].split('background-color: ')[1];
                let details = getColorDetails(actualColorStr);
                if (details.type = 'rgba' && details.alpha < 1.0) {
                        let displayed = rgbaOverWhite2rgb(details.red, details.green, details.blue, details.alpha);
                        let p = colorItem.getElementsByTagName('p')[0];
                        p.style.color = getColorBasedOnContrastYIQ(displayed);
                }
        })
}

function addNewlineToSubheaderIfScreenTooSmall() {
        if (document.body.offsetWidth <= 1000) {
                let subLink = document.getElementById('subheaderLink');
                subLink.style.display = 'block';
                subLink.style.paddingTop = '0.8em';
                let h2 = document.getElementsByTagName('h2')[0];
                let br = document.createElement("br");
                document.body.insertBefore(br, h2)
        }
}


// function addTextSrollingOnHover() {

//         const tansitionTimePerPixel = 0.015;
//         const textBoxes = document.querySelectorAll(
//                 ".colorContainer"
//         );

//         textBoxes.forEach((textBox) => {
//                 textBox.addEventListener('mouseenter', () => {
//                         let textWidth = textBox.childNodes[3].clientWidth;
//                         let boxWidth = parseFloat(getComputedStyle(textBox).width);
//                         let translateVal = Math.min(boxWidth - textWidth, 0);
//                         let translateTime = - tansitionTimePerPixel * translateVal + "s";
//                         textBox.childNodes[3].style.transitionDuration = translateTime;
//                         textBox.childNodes[3].style.transform = "translateX(" + translateVal + "px)";
//                 })
//                 textBox.addEventListener('mouseleave', () => {
//                         textBox.childNodes[3].style.transitionDuration = "0.3s";
//                         textBox.childNodes[3].style.transform = "translateX(0)";
//                 })
//         });

// }

function filterColorList() {
        // Declare variables
        var input, searchText, li, span, i, txtValue;
        input = document.getElementById('searchInput');
        searchText = input.value.toUpperCase();
        li = document.getElementsByTagName('li');

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
                span = li[i].getElementsByClassName('cspan')[0];

                txtValue = span.textContent || span.innerText;
                if (!searchText.includes('_')) {
                        txtValue = txtValue.replace(/_/g, "");
                }

                if (txtValue.toUpperCase().indexOf(searchText) > -1) {
                        li[i].style.display = "";
                } else {
                        li[i].style.display = "none";
                }
        }
}

function langBtnPressed(elmnt) {
        let styleStr = 'background-color: rgb(237, 240, 242); color: rgb(85, 101, 126);';
        elmnt.style = "";

        let swiftButton = document.getElementById("swift");
        let objcButton = document.getElementById("objc");
        let swiftuiButton = document.getElementById("swiftui");

        switch (elmnt.id) {
                case languages.SWIFT:
                        selectedLanguage = languages.SWIFT;
                        objcButton.style = styleStr;
                        swiftuiButton.style = styleStr;
                        break;
                case languages.OBJC:
                        selectedLanguage = languages.OBJC;
                        swiftButton.style = styleStr;
                        swiftuiButton.style = styleStr;
                        break;
                case languages.SWIFTUI:
                        selectedLanguage = languages.SWIFTUI;
                        objcButton.style = styleStr;
                        swiftButton.style = styleStr;
                        break;
        }
}

function copyColor(elmnt) {
        let name = elmnt.parentElement.getElementsByClassName("cspan")[0].innerText;
        let swiftName = name.substring(0, name.length - 5);
        let isMacos = elmnt.parentElement.parentElement.classList[0] == 'macList';
        let prefix = isMacos ? 'NS' : 'UI';

        if (defaultSwiftNamedColors.includes(swiftName) || (isMacos && defaultAppKitSwiftNamedColors.includes(swiftName))) {
                switch (selectedLanguage) {
                        case languages.SWIFT:
                                copyToClipboard(`${prefix}Color.${swiftName}`);
                                showCopiedTooltipOn(elmnt);
                                return;
                        case languages.OBJC:
                                copyToClipboard(`${prefix}Color.${name}`);
                                showCopiedTooltipOn(elmnt);
                                return;
                        case languages.SWIFTUI:
                                let suiName = swiftName.substring(6).toLowerCase();
                                if (defaultSwiftUIColors.includes(suiName)) {
                                        copyToClipboard(`Color.${suiName}`)
                                        showCopiedTooltipOn(elmnt);
                                        return
                                }
                                break
                }
        }
        let actualColorStr = String(elmnt.outerHTML).split(';')[0].split('background-color: ')[1];
        let details = getColorDetails(actualColorStr);
        var red, green, blue, hue, saturation, brightness;
        let alpha = 1.0;
        var stringToCopy;

        switch (details.type) {
                case 'rgb', 'rgba':
                        red = parseFloat((details.red / 255).toFixed(5));
                        green = parseFloat((details.green / 255).toFixed(5));
                        blue = parseFloat((details.blue / 255).toFixed(5));
                        if (details.type.includes('a')) { alpha = details.alpha; }

                        switch (selectedLanguage) {
                                case languages.SWIFT:
                                        stringToCopy = `${prefix}Color(red: ${red}, green: ${green}, blue: ${blue}, alpha: ${alpha})`;
                                        break;
                                case languages.OBJC:
                                        stringToCopy = `[${prefix}Color colorWith: ${red} green: ${green} blue: ${blue} alpha: ${alpha}];`;
                                        break;
                                case languages.SWIFTUI:
                                        stringToCopy = `Color(red: ${red}, green: ${green}, blue: ${blue}, opacity: ${alpha})`;
                                        break;
                        }
                        copyToClipboard(stringToCopy);
                        showCopiedTooltipOn(elmnt);
                        break;
                case 'hsl', 'hsla':
                        hue = details.hue / 360;
                        saturation = details.saturation / 100;
                        brightness = details.brightness / 100;
                        if (details.type.includes('a')) { alpha = details.alpha; }

                        switch (selectedLanguage) {
                                case languages.SWIFT:
                                        stringToCopy = `${prefix}Color(hue: ${hue}, saturation: ${saturation}, brightness: ${brightness}, alpha: ${alpha})`;
                                case languages.OBJC:
                                        stringToCopy = `[${prefix}Color colorWithHue: ${hue} saturation: ${saturation} brightness: ${brightness} alpha: ${alpha}];`;
                                case languages.SWIFTUI:
                                        stringToCopy = `Color(hue: ${hue}, saturation: ${saturation}, brightness: ${brightness}, opacity: ${alpha})`;
                        }
                        copyToClipboard(stringToCopy);
                        showCopiedTooltipOn(elmnt);
                        break;
        }
}

function copyToClipboard(text) {
        let dummy = document.createElement("textarea");
        document.body.appendChild(dummy);

        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
}

function showCopiedTooltipOn(elmnt) {
        let tooltip = elmnt.getElementsByClassName('tooltiptext')[0];

        tooltip.classList.add('visibile');
        tooltip.classList.add('pulse');

        tooltip.addEventListener("animationend", (event) => {
                tooltip.classList.remove('pulse');
                tooltip.classList.remove('visibile');
                tooltip.classList.add('fadeOut');
        })

        tooltip.addEventListener("transitionend", (event) => {
                tooltip.classList.remove('fadeOut');
        })
}

function setColorContainerWidth() {
        let width = getTextWidth(LONGEST_NAME, 'caption');

        let listItems = document.getElementsByClassName("colorContainer");

        // Add class to each instance in for loop
        for (var i = 0; i < listItems.length; i++) {
                listItems[i].style.width = width + "px";
                listItems[i].getElementsByClassName('cspan')[0].style.width = width + "px";
        }
}

function setColorListULWidth() {
        let width = getTextWidth(LONGEST_NAME, 'caption');
        let docWidth = document.body.offsetWidth;
        let liItemWidth = Math.ceil(width + 60 + 5);

        let listUls = document.getElementsByTagName("ul");
        let numCollumns = Math.floor(docWidth / liItemWidth);

        const listWidth = numCollumns * liItemWidth;
        for (var i = 0; i < listUls.length; i++) {
                listUls[i].style.width = listWidth + "px";
        }

        if (numCollumns == 1) {
                let allLIElements = document.getElementsByTagName("li");
                for (var i = 0; i < allLIElements.length; i++) {
                        let liWidth = allLIElements[i].offsetWidth;
                        allLIElements[i].style.margin = `20px 0px 0px ${((listWidth - liWidth) / 2 - 2)}px`;
                }
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
        let context = canvas.getContext("2d");
        context.font = font;
        let metrics = context.measureText(text);
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

function sortListAlphabetically() {
        // TODO: this function is currently unused but add sort for macos div
        let ul = document.getElementById('colorList');
        let collator = new Intl.Collator('en', { ignorePunctuation: true });

        Array.from(ul.getElementsByTagName("LI"))
                .sort((a, b) => collator.compare(a.getElementsByClassName("cspan")[0].textContent, b.getElementsByClassName("cspan")[0].textContent))
                .forEach(li => ul.appendChild(li));
}

// Color Helpers

function getColorDetails(colorStr) {
        let type = colorStr.split("(")[0];
        let rest = colorStr.split("(")[1];
        rest = rest.substring(0, rest.length - 1);
        let colorArr = rest.split(", ");
        let first = parseFloat(colorArr[0]);
        let second = parseFloat(colorArr[1]);
        let third = parseFloat(colorArr[2]);
        let alpha = parseFloat(colorArr[3]);

        switch (type) {
                case 'rgb':
                        return {
                                type: type,
                                red: first,
                                green: second,
                                blue: third,
                        }
                case 'rgba':
                        return {
                                type: type,
                                red: first,
                                green: second,
                                blue: third,
                                alpha: alpha
                        }
                case 'hsl':
                        return {
                                type: type,
                                hue: first,
                                saturation: second,
                                brightness: third
                        }
                case 'hsla':
                        return {
                                type: type,
                                hue: first,
                                saturation: second,
                                brightness: third,
                                alpha: alpha
                        }
        }
}

function rgbaOverWhite2rgb(r, g, b, alpha) {

        return {
                r: (1 - alpha) * 255 + alpha * r,
                g: (1 - alpha) * 255 + alpha * g,
                b: (1 - alpha) * 255 + alpha * b
        }
}

function getColorBasedOnContrastYIQ(color) {
        let yiq = ((color.r * 299) + (color.g * 587) + (color.b * 114)) / 1000;
        return (yiq >= 128) ? 'rgb(5, 5, 5)' : 'rgb(250, 250, 250)';
}

function updateFooterDate() {
        const date = new Date();
        document.getElementById('date').innerHTML = `${date.getFullYear()}`;
      }