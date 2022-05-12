import { cpSync } from 'fs';
import { join, dirname } from 'path';

export default function copy({ from, to }) {
	return {
		name: 'copy',
		setup(build) {
			build.onEnd(() => cpSync(from, join(dirname(build.initialOptions.outfile), to), {
				recursive: true,
				force: true,
				dereference: true
			}));
		},
	};
}
