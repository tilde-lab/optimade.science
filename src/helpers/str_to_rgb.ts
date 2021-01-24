export function str_to_rgb(input_str) {
	var baseRed = 0,
			baseGreen = 256,
			baseBlue = 256;
	//lazy seeded random hack to get values from 0 - 256
	//for seed just take bitwise XOR of first two chars
	var seed = input_str.charCodeAt(0) ^ input_str.charCodeAt(1);
	var rand_1 = Math.abs(Math.sin(seed++) * 10000) % 256;
	var rand_2 = Math.abs(Math.sin(seed++) * 10000) % 256;
	var rand_3 = Math.abs(Math.sin(seed++) * 10000) % 256;
	var red = Math.round((rand_1 + baseRed) / 2);
	var green = Math.round((rand_2 + baseGreen) / 2);
	var blue = Math.round((rand_3 + baseBlue) / 2);
	return `rgb(${[red, green, blue].join(',')})`;
}