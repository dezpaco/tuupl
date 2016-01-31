(function() {
    /*
     * isHex checks for both 3-value and 6-value Hex codes.
     */
    var isHex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    /*
     * rgbPattern will ignore the rgba(,0.2); part of the code
     * and will also check if values 0-255.
     * Bug in rgbPattern where it will pass if you set:
     * 01,01,02 - does this matter?
     * 12,34,5 6 passes as 12,34,5
     */
    isRgb = /^[rgba]*\(?\b([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\b,\s?\b([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\b,\s?\b([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\b/;

    var Convert = {
        init: function() {
            this.parent = document.querySelector('#convert');
            this.hex = document.querySelector('#hex');
            this.rgb = document.querySelector('#rgb');
            this.viewer = document.querySelector('#viewer');

            // 'this' will be used by handleEvent, below.
            this.parent.addEventListener('input', this, false);
        },

        /*
         * addEventListener looks for handleEvent.
         * Only execute if a child element of the parent
         * (i.e. not the parent). Then for each of the two
         * color spaces use the appopriate methods.
         */
        handleEvent: function(evt) {
            if (evt.target !== evt.currentTarget) {
                var colorspace = evt.target.id;

                switch(colorspace) {
                    case 'hex':
                        this.showHexResult();
                        break;

                    case 'rgb':
                        this.showRgbResult();
                        break;
                }
            }

            evt.stopPropagation();
        },

        /*
         * If evalHex() is defined then update the value of the inputRgb with the
         * result of the Hex conversion. Otherwise leave blank.
         * Update the background of the color viewer. If evalHex() is undefined the
         * viewer will keep the last defined color so it doesn't "flicker" all the time.
         */
        showHexResult: function() {
            this.evalHex() ? this.rgb.value = this.evalHex() : this.rgb.value = '';
            this.viewer.style.backgroundColor = this.evalHex();
        },

        /*
         * If evalRgb() is defined then update the value of the inputHex with the
         * result of the RGB conversion. Otherwise leave blank.
         * Update the background of the color viewer. If evalHex() is undefined the
         * viewer will keep the last defined color so it doesn't "flicker" all the time.
         */
        showRgbResult: function() {
            this.evalRgb() ? this.hex.value = this.evalRgb() : this.hex.value = '';
            this.viewer.style.backgroundColor = this.evalHex();
        },

        /*
         * Output the value typed into the Hex input element.
         */
        hexValue: function() {
            return this.hex.value;
        },

        /*
         * Output the value typed into the RGB input element.
         */
        rgbValue: function() {
            return this.rgb.value;
        },

        /*
         * Test if the value entered is a valid Hex color code.
         */
        evalHex: function() {
            return isHex.test(this.hexValue()) ? this.convertHex() : void 0;
        },

        /*
         * Test if the value entered is a valid RGB color code.
         */
        evalRgb: function() {
            return isRgb.test(this.rgbValue()) ? this.convertRgb() : void 0;
        },

        /*
         * If evalHex() verifies input as Hex then convert to an RGB color code.
         * Before converting run the Hex code through expandHex() so becomes
         * a six digit code if user inputs a three digit shorthand.
         */
        convertHex: function() {
            /*
             * Split the six digit Hex into three two digit pairs
             * e.g. #112233 becomes 11, 22, 33.
             */
            var split = /^#?([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/,
                hex = this.expandHex().match(split);

            return 'rgb(' + parseInt(hex[1], 16) + ',' + parseInt(hex[2], 16) + ',' + parseInt(hex[3], 16) + ')';
        },

        /*
         * To simplify the Hex calculations convert three digit shorthand Hex to
         * the standard six digit number. If already six digit, output unaltered.
         */
        expandHex: function() {
            var isShorthand = /^#?([a-fA-F\d])([a-fA-F\d])([a-fA-F\d])$/i,
                hex = this.hexValue().replace(isShorthand, function(m, r, g, b) {
                    return r + r + g + g + b + b;
                });

            return hex;
        },

        /*
         * If evalRgb() verifies input as RGB then convert to a Hex color code.
         * splitRgb will take the RGB string and create an array of numbers.
         * << is the bitwise left shift operator.
         * g << 8 therefore effectively multiplies g by 256,
         * adding two zeroes to the end of its Hex representation.
         * Likewise r << 16 adds four zeroes. Adding 1 << 24 (1000000 in Hex)
         * ensures that the Hex representation is left-padded with any required
         * zeroes once the leading 1 is stripped off using slice().
         */
        convertRgb: function() {
            var splitRgb = isRgb.exec(this.rgbValue()).map(this.returnInt),
                r = splitRgb[1],
                g = splitRgb[2],
                b = splitRgb[3];

            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        },

        /*
         * parseInt is often used with one argument, but takes two. The second being the radix
         * to the callback function, Array.prototype.map passes 3 arguments:
         * the element, the index, the array
         * The third argument is ignored by parseInt, but not the second one,
         * hence the possible confusion of using .map(parseInt) and getting NaN.
         * More here:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
         */
        returnInt: function(element) {
            return parseInt(element, 10);
        }
    }

    Convert.init();
})();
