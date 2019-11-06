import { Comparator } from 'src/util/comparator';
import { INode } from 'src/model/node';

export class NodeConnectComparator implements Comparator<INode> {
    compare(a: INode, b: INode): number {
        if (!a.isConnected && b.isConnected) {
            return 1;
        }
        if (a.isConnected && !b.isConnected) {
            return -1;
        }
        return 0;
    }
}

export const nodeConnectComparator = new NodeConnectComparator();
