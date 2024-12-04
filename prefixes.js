window.onload = function() {
    generateTable();
}

const metricPrefixes = {
	yotta: {symbol: 'Y', exponent: 24, hint: 'Your'},
	zetta: {symbol: 'Z', exponent: 21, hint: 'Zebra'},
	exa: {symbol: 'E', exponent: 18, hint: 'Eats'},
	peta: {symbol: 'P', exponent: 15, hint: 'Party'},
	tera: {symbol: 'T', exponent: 12, hint: 'Treats'},
	giga: {symbol: 'G', exponent: 9, hint: "Greg's"},
	mega: {symbol: 'M', exponent: 6, hint: 'Moose'},
	kilo: {symbol: 'k', exponent: 3, hint: 'killed'},
	hecto: {symbol: 'h', exponent: 2, hint: 'his'},
	deka: {symbol: 'da', exponent: 1, hint: 'dad'},
	base: {symbol: '', exponent: 0, hint: '-'},
	deci: {symbol: 'd', exponent: -1, hint: 'did'},
	centi: {symbol: 'c', exponent: -2, hint: "canada's"},
	milli: {symbol: 'm', exponent: -3, hint: 'military'},
	micro: {symbol: '&mu;', exponent: -6, hint: 'migrate'},
	nano: {symbol: 'n', exponent: -9, hint: 'north'},
	pico: {symbol: 'p', exponent: -12, hint: 'probably'},
	femto: {symbol: 'f', exponent: -15, hint: 'for'},
	atto: {symbol: 'a', exponent: -18, hint: 'a'},
	zepto: {symbol: 'z', exponent: -21, hint: 'zillion'},
	yocto: {symbol: 'y', exponent: -24, hint: 'years'}
}

export function generateTable() {
    let table = '<table>';
    table += '<thead><tr><th>Symbol</th><th>Exponent</th><th>Prefix</th><th style="text-align: left;">Hint</th></tr></thead><tbody>';

    for (const [prefix, details] of Object.entries(metricPrefixes)) {
        const { symbol, exponent, hint } = details;
        table += `
            <tr class='prefix-row'>
                <td style='width: 8em;'>${symbol || '-'}</td>
                <td style='width: 8em;'>${exponent}</td>
                <td style='width: 12em;'>${prefix}</td>
                <td style='text-align: left'>${hint}</td>
            </tr>
        `;                
    }

    table += '</tbody></table>';

    document.getElementById("prefix-table").innerHTML = table;
}