import { expect } from 'chai';

import { INode } from 'src/model/node';
import { nodeHeightDescComparator } from 'src/util/comparator/node/height';

describe('Node Height Desc Comparator', () => {
    it('Returns 0 when both nodes are on the same height', () => {
        const a: INode = { height: 500, isConnected: true };
        const b: INode = { height: 500, isConnected: true };
        const expected = 0;
        const actual = nodeHeightDescComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Returns 1 when node A has a height less than B', () => {
        const a: INode = { height: 100, isConnected: false };
        const b: INode = { height: 500, isConnected: false };
        const expected = 1;
        const actual = nodeHeightDescComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Returns -1 when node A has a height more than B', () => {
        const a: INode = { height: 500, isConnected: true };
        const b: INode = { height: 100, isConnected: false };
        const expected = -1;
        const actual = nodeHeightDescComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });
});
