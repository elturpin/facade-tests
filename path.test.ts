import { expect, it } from 'vitest';
import { join, resolve } from 'node:path';
import { describe } from 'node:test';
import { getPath } from './path-test-module/path-test-module';

it('should give a path compatible for the system, test should fail on windows', () => {
    const path = join('path/to/file');

    expect(path).toBe('path/to/file');
});

describe('from another module path', () => {
    it('should base import.meta.dirname on the file where the code is located', () => {
        const resultPath = getPath('./localPath');

        expect(resultPath).not.toBe(resolve('.', 'localPath'));
    });
});
