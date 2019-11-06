import { Comparator } from 'src/util/comparator';
import { INode } from 'src/model/node';
import { nodeConnectComparator } from 'src/util/comparator/node/connect';
import { nodeHeightDescComparator } from 'src/util/comparator/node/height';

export class NodeComparator implements Comparator<INode> {
    private readonly connectComparator: Comparator<INode>;
    private readonly heightDescComparator: Comparator<INode>;

    constructor(
        connectComparator: Comparator<INode>,
        heightDescComparator: Comparator<INode>,
    ) {
        this.connectComparator = connectComparator;
        this.heightDescComparator = heightDescComparator;

        this.compare = this.compare.bind(this);
    }

    compare(a: INode, b: INode): number {
        const result = this.connectComparator.compare(a, b);
        if (result) {
            return result;
        }

        return this.heightDescComparator.compare(a, b);
    }
}

export const nodeComparator = new NodeComparator(
    nodeConnectComparator,
    nodeHeightDescComparator,
);
