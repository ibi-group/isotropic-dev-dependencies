import _babel from '@babel/core';
import {
    Buffer as _Buffer
} from 'node:buffer';
import _url from 'node:url';

const _load = async (url, context, nextLoad) => {
    const {
        format,
        source
    } = await nextLoad(url, context);

    if (source) {
        switch (format) {
            case 'commonjs':
            case 'module':
                return {
                    format,
                    source: (await _babel.transformAsync(
                        typeof source === 'string' ?
                            source :
                            _Buffer.isBuffer(source) ?
                                source.toString('utf-8') :
                                _Buffer.from(source).toString('utf-8'),
                        {
                            configFile: `${import.meta.dirname}/../config/babel.json`,
                            filename: _url.fileURLToPath(url),
                            sourceType: 'module'
                        }
                    )).code
                };
        }
    }

    return {
        format,
        source
    };
};

export {
    _load as load
};
