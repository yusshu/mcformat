/*! mcformat v1.1.0 | MIT License | github.com/yusshu/mcformat */

const MCFormat = function ({ colorChar = '&', allowMagic = true }) {

    if (allowMagic) {

        /*
         * Object binding char width to the characters
         * that have that width.
         */
        const charsByLength = {
            6: '@',
            5: 'AaBbCcDdEeFGgHhJjKLMmNnOoPpQqRrSsTUuVvWwXxYyZz1234567890#$%^&*-_+=?/\\~',
            4: 'fkt(){}<>',
            3: 'I[]" ',
            2: 'l\'',
            1: 'i!:;|.,',
        };

        /*
         * Similar to 'charsByLength', but reversed, it
         * binds the characters to their length
         */
        const lengthByChars = {};

        // copy information from charsByLength to lengthByCHars
        for (const length in charsByLength) {
            const chars = charsByLength[length];
            for (const c of chars) {
                lengthByChars[c] = length;
            }
        }

        /**
         * Obfuscates the text elements inside the
         * given node
         * @param {Node} node
         */
        function obfuscate(node) {
            for (const child of node.childNodes) {
                if (child.nodeType === Node.TEXT_NODE) {
                    const content = child.textContent;
                    let newContent = [];
                    for (let i = 0; i < content.length; i++) {
                        const char = content.charAt(i);
                        const length = lengthByChars[char] || 4;
                        const chars = charsByLength[length];

                        newContent.push(chars.charAt(Math.floor(Math.random() * chars.length)));
                    }
                    child.textContent = newContent.join('');
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    obfuscate(child);
                }
            }
        }

        // finally set the interval that updates all the "magic" elements
        setInterval(() => {
            for (const element of document.getElementsByClassName("mc-magic")) {
                obfuscate(element);
            }
        }, 50);
    }

    /**
     * Object containing all color characters
     * and their format
     */
    const COLORS = {
        '0': { name: 'black' },
        '1': { name: 'dark-blue' },
        '2': { name: 'dark-green' },
        '3': { name: 'dark-aqua' },
        '4': { name: 'dark-red' },
        '5': { name: 'dark-purple' },
        '6': { name: 'gold' },
        '7': { name: 'gray' },
        '8': { name: 'dark-gray' },
        '9': { name: 'blue' },
        'a': { name: 'green' },
        'b': { name: 'aqua' },
        'c': { name: 'red' },
        'd': { name: 'light-purple' },
        'e': { name: 'yellow' },
        'f': { name: 'white' },
        'r': { name: 'reset' },

        // formats (they don't override previous element format)
        'm': { name: 'strikethrough', pass: true },
        'o': { name: 'italic', pass: true },
        'l': { name: 'bold', pass: true },
        'n': { name: 'underline', pass: true },
        'k': { name: 'magic', pass: true },
    };

    this.format = function (input) {

        /** The root element, will contain all the other elements */
        const root = document.createElement("span");
        root.classList.add("mc-root"); // add class

        let content = [];

        let next = undefined; // the next element to append to root
        let active = root; // the last used element

        for (let i = 0; i < input.length; i++) {
            const current = input.charAt(i);

            if (current !== colorChar) {
                // not a color char, just push it
                content.push(current);
                continue;
            }

            const nextIndex = ++i;

            if (nextIndex >= input.length) {
                // last character, just push it
                content.push(current);
                break;
            }

            const code = input.charAt(nextIndex);
            const format = COLORS[code];

            if (format) {
                const element = document.createElement("span");
                element.classList.add(`mc-${format.name}`);

                active.innerText = content.join(''); // set the content to the previous element
                content = []; // clear the content

                if (format.pass) {
                    active.appendChild(element);
                } else {
                    if (next !== undefined && next !== root) {
                        root.appendChild(next);
                    }
                    next = element;
                }

                active = element;
            } else {
                // not a code, push everything
                content.push(current);
                content.push(code);
            }
        }

        // check for remaining content
        if (next !== undefined && next !== root) {
            root.appendChild(next);
        }

        if (content.length > 0) {
            active.innerText += content.join('');
        }

        return root;
    }
};
