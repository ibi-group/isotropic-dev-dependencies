import _console from 'node:console';
import _fs from 'fs-extra';
import _process from 'node:process';

(async () => {
    const committer = `${_process.env.GIT_AUTHOR_NAME} <${_process.env.GIT_AUTHOR_EMAIL}>`,
        packageDefinition = await _fs.readJson(_process.argv[2] || 'package.json').catch(() => ({})),
        validCommitterSet = new Set();

    if (packageDefinition) {
        if (packageDefinition.author) {
            validCommitterSet.add(packageDefinition.author);
        }

        if (Array.isArray(packageDefinition.contributors)) {
            packageDefinition.contributors.forEach(contributor => {
                validCommitterSet.add(contributor);
            });
        }
    }

    if (!validCommitterSet.has(committer)) {
        _console.log('Invalid committer:', committer);
        _console.log('Check git configuration and package contributors.');
        _process.exit(1);
    }
})();
