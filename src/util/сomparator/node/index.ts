import { Comparator } from 'src/util/сomparator';
import { INode } from 'src/model/node';
import { nodeConnectComparator } from 'src/util/сomparator/node/connect';
import { nodeHeightDescComparator } from 'src/util/сomparator/node/height';

export class NodeComparator implements Comparator<INode> {
    private readonly connectComparator: Comparator<INode>;
    private readonly heightDescComparator: Comparator<INode>;

    constructor(
        connectComparator: Comparator<INode>,
        heightDescComparator: Comparator<INode>,
    ) {
        this.connectComparator = connectComparator;
        this.heightDescComparator = heightDescComparator;
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
