export function getPredefinedInitials(str: string) {
	switch (str) {
		case 'TMP':
			return "MP";
		case 'O':
			return "odbx";
		default:
			return str
	}
}