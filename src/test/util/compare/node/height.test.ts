import { expect } from 'chai';

import { INode } from 'src/model/node';
import { nodeHeightDescComparator } from 'src/util/comparator/node/height';

describe('Node Height Desc Comparator', () => {
    it('Test 1', () => {
        const a: INode = { height: 500, isConnected: true };
        const b: INode = { height: 500, isConnected: true };
        const expected = 0;
        const actual = nodeHeightDescComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Test 2', () => {
        const a: INode = { height: 100, isConnected: false };
        const b: INode = { height: 500, isConnected: false };
        const expected = 1;
        const actual = nodeHeightDescComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Test 3', () => {
        const a: INode = { height: 500, isConnected: true };
        const b: INode = { height: 100, isConnected: false };
        const expected = -1;
        const actual = nodeHeightDescComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });
});
