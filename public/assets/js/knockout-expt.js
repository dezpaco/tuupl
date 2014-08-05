// <p>hex: <input data-bind='value: convertedHex, valueUpdate: ["input", "input"]' /></p>
// <p>rgb: <input data-bind='value: convertedRgb, valueUpdate: ["input", "input"]' /></p>

function viewModel() {
    this.hex = ko.observable();
    this.rgb = ko.observable();

    /*
     * Adding the rateLimit slows the app down
     * but makes it easier to slowly add numbers.
     *
     * How this Works:
     * The rgb.read takes the this.hex() value.
     * rgb.write sets hex value, which in turn
     * writes a new rgb value.
     */
    this.convertedHex = ko.computed({
        read: function( value ) {
            if ( value ) {
                return hexToRgb( value.toString() );
            } else {
                return this.hex();
            }
        },
        write: function( value ) {
            if ( value ) {
                this.rgb( hexToRgb( this.hex( value ).toString() ) );
            }
        },
        owner: this
    }).extend({ rateLimit: 200 });

    this.convertedRgb = ko.computed({
        read: function( value ) {
            if ( this.hex() == null ) {
                return value;
            } else {
                return hexToRgb( this.hex().toString() );
            }
        },
        write: function( value ) {
            var rgbOutput = this.hex( rgbToHex( value.toString() ) );
            if ( value ) {
                return rgbOutput;
            }
        },
        owner: this
    }).extend({ rateLimit: 200 });
}

ko.applyBindings(viewModel());
