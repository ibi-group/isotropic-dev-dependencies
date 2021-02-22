import _process from 'process';

const _committer = `${_process.env.GIT_AUTHOR_NAME} <${_process.env.GIT_AUTHOR_EMAIL}>`,
    _committerSet = new Set(),
    _packageDefinition = require(_process.argv[2] || `${_process.cwd()}/package.json`);

if (_packageDefinition) {
    if (_packageDefinition.author) {
        _committerSet.add(_packageDefinition.author);
    }

    if (Array.isArray(_packageDefinition.contributors)) {
        _packageDefinition.contributors.forEach(contributor => {
            _committerSet.add(contributor);
        });
    }
}

if (!_committerSet.has(_committer)) {
    console.log('Invalid committer:', _committer);
    console.log('Check git configuration and package contributors');
    _process.exit(1);
}
