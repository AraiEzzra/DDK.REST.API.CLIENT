import { expect } from 'chai';

import { INode } from 'src/model/node';
import { nodeComparator } from 'src/util/comparator/node';

describe('Node Comparator', () => {
    it('Returns 0 when both nodes are connected and are on the same height', () => {
        const a: INode = { height: 500, isConnected: true };
        const b: INode = { height: 500, isConnected: true };
        const expected = 0;
        const actual = nodeComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Returns 0 when both nodes are disconnected and are on the same height', () => {
        const a: INode = { height: 500, isConnected: false };
        const b: INode = { height: 500, isConnected: false };
        const expected = 0;
        const actual = nodeComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Returns -1 when node A is connected and has height less than node B and node B is disconnected', () => {
        const a: INode = { height: 100, isConnected: true };
        const b: INode = { height: 500, isConnected: false };
        const expected = -1;
        const actual = nodeComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Returns -1 when node A is connected and has height more than node B and node B is disconnected', () => {
        const a: INode = { height: 500, isConnected: true };
        const b: INode = { height: 100, isConnected: false };
        const expected = -1;
        const actual = nodeComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Returns 1 when node A is disconnected and has height more than node B and node B is connected', () => {
        const a: INode = { height: 500, isConnected: false };
        const b: INode = { height: 100, isConnected: true };
        const expected = 1;
        const actual = nodeComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Returns 1 when node A is disconnected and has height less than node B and node B is connected', () => {
        const a: INode = { height: 100, isConnected: false };
        const b: INode = { height: 500, isConnected: true };
        const expected = 1;
        const actual = nodeComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Returns 1 when node A is connected and has height less than node B and node B is connected', () => {
        const a: INode = { height: 100, isConnected: true };
        const b: INode = { height: 500, isConnected: true };
        const expected = 1;
        const actual = nodeComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Returns -1 when node A is connected and has height more than node B and node B is connected', () => {
        const a: INode = { height: 500, isConnected: true };
        const b: INode = { height: 100, isConnected: true };
        const expected = -1;
        const actual = nodeComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Returns -1 when node A is disconnected and has height more than node B and node B is disconnected', () => {
        const a: INode = { height: 500, isConnected: false };
        const b: INode = { height: 100, isConnected: false };
        const expected = -1;
        const actual = nodeComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });

    it('Returns 1 when node A is disconnected and has height less than node B and node B is disconnected', () => {
        const a: INode = { height: 100, isConnected: false };
        const b: INode = { height: 500, isConnected: false };
        const expected = 1;
        const actual = nodeComparator.compare(a, b);

        expect(expected).to.deep.equal(actual);
    });
});
