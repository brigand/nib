// Pad a string with characters, e.g. for time formatting
// String[, count=2, s="0"] -> String
function leftPad(str, count, s){
	count = count || 2;
	s = s || "0";

	while (str.length < count) {
		str = s + str;
	}

	return str;
}

// format a number of minutes
leftPad(7) // => "07"

// make a binary string at least 8 bits
leftPad("010101", 8); // => "00010101"

// right justify a string with spaces
leftPad("foo", 10, " "); // => "       foo"
