export function getPredefinedInitials(str: string, defaultInitials: string) {
	switch (str) {
		case 'The Materials Project':
			return "MP";
		case 'odbx':
			return "odbx";
		default:
			return defaultInitials
	}
}