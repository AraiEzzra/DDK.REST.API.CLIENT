import { expect } from 'chai';

import { INode } from 'src/model/node';
import { nodeConnectComparator } from 'src/util/comparator/node/connect';

describe('Node Connect Comparator', () => {
    it('Returns 0 when both nodes are connected', () => {
        const a: INode = { height: 100, isConnected: true };
        const b: INode = { height: 500, isConnected: true };
        const expected = 0;
        const actual = nodeConnectComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Returns 0 when both nodes are disconnected', () => {
        const a: INode = { height: 100, isConnected: false };
        const b: INode = { height: 500, isConnected: false };
        const expected = 0;
        const actual = nodeConnectComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Returns -1 when node A is connected and node B is disconnected', () => {
        const a: INode = { height: 100, isConnected: true };
        const b: INode = { height: 500, isConnected: false };
        const expected = -1;
        const actual = nodeConnectComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Returns 1 when node A is disconnected and node B is connected', () => {
        const a: INode = { height: 100, isConnected: false };
        const b: INode = { height: 500, isConnected: true };
        const expected = 1;
        const actual = nodeConnectComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });
});
