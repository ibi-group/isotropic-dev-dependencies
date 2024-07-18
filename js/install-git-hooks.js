import _fs from 'fs-extra';
import _process from 'node:process';

(async () => {
    const gitDirectoryPath = _process.argv[2] ?? '.git';

    if ((await _fs.lstat(gitDirectoryPath)).isDirectory()) {
        const preCommitHookPath = `${gitDirectoryPath}/hooks/pre-commit`;

        await _fs.outputFile(preCommitHookPath, `#!/bin/sh\nnode ${import.meta.dirname}/validate-committer.js\n`);
        await _fs.chmod(preCommitHookPath, 0o0755);
    }
})();
