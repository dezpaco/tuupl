function returnInt( element ){
    return parseInt( element, 10 );
}

function testNumber( number ) {
    return !isNaN(parseFloat( number )) && isFinite( number );
}

function removeSpaces( test ) {
    return test.replace( /^\s+|\s+$/g, '' );
}

function isHex( number ) {
    return number = /^#?[0-9a-fA-F]{3}$|^#?[0-9a-fA-F]{6}$/i.test( removeSpaces( number ) );
}

function isRgb( number ) {
    return number = testNumber( number ) && number >= 0 && 255 >= number;
}

function convertHex( number ) {
    return parseInt( number, 16 );
}

function rgbToHex( color ) {
    /*
     * Use map( Number ) so color is array of integer values.
     * Use rgbPattern to ignore the rgba(,0.2); string part of the value entered
     * so only the RGB numbers within the brackets are returned.
     */
    // Bug: 232,232,2323232323 doesn't cause error
    var rgbPattern = /^[rgba]*\(?(\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3}),?\s?\d?\.?\d*\)?;?$/;
    if ( rgbPattern.test( color ) ) {
        var colorGroup = rgbPattern.exec( color ).map( returnInt ),
            r = colorGroup[1],
            g = colorGroup[2],
            b = colorGroup[3];
    }

    /*
     * << is the bitwise left shift operator.
     * g << 8 therefore effectively multiplies g by 256,
     * adding two zeroes to the end of its Hex representation.
     * Likewise r << 16 adds four zeroes. Adding 1 << 24 (1000000 in Hex)
     * ensures that the Hex representation is left-padded with any required
     * zeroes once the leading 1 is stripped off using slice().
     * Before returning Hex check r,g,b values are between 0 and 255 with isRgb().
     * Using void 0 as undefined can be overwritten.
     */
    return isRgb( r ) && isRgb( g ) && isRgb( b ) ? '#' + ( ( 1 << 24 ) + ( r << 16 ) + ( g << 8 ) + b ).toString( 16 ).slice( 1 ) : void 0;
}

function hexToRgb( color ) {
    /*
     * To simplify the calculations convert three digit shorthand Hex to
     * the standard six digit number.
     */
    var shorthand = /^#?([a-fA-F\d])([a-fA-F\d])([a-fA-F\d])$/i;
    color = color.replace( shorthand, function( m, r, g, b ) {
        return r + r + g + g + b + b;
    });

    // Split the six digit Hex into three two digit pairs e.g. #112233 becomes 11, 22, 33.
    var splitHex = /^#?([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/,
        result = splitHex.test(color) ? color.match( splitHex ) : void 0;

    // Doing the convertHex() here so no error when isHex() is false during typing of number.
    return isHex( color ) ? 'rgb(' + convertHex( result[1] ) + ',' + convertHex( result[2] ) + ',' + convertHex( result[3] ) + ')' : void 0;
}

$( window ).load( function() {
    var hex = $( '#hex' ),
        rgb = $( '#rgb' ),
        viewer = $( '#viewer' );

    hex.bind( 'blur input', function( e ) {
        color = hexToRgb( hex.val() );
        color ? rgb.val( color ) : rgb.val( '' );
        viewer.css( 'background-color', hexToRgb( hex.val() ) );
    });

    rgb.bind( 'blur input', function( e ) {
        color = rgbToHex( rgb.val() );
        color ? hex.val( color ) : hex.val( '' );
        viewer.css( 'background-color', rgbToHex( rgb.val() ) );
    });
});
