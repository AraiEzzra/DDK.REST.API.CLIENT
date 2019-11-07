import { Comparator } from 'src/util/comparator';
import { INode } from 'src/model/node';
import { Direction } from 'ddk.registry/dist/model/common/type';

export class NodeHeightComparator implements Comparator<INode> {
    private readonly direction: Direction;

    constructor(direction: Direction = 'ASC') {
        this.direction = direction;
    }

    compare(a: INode, b: INode): number {
        if (a.height < b.height) {
            if (this.direction === 'ASC') {
                return -1;
            }
            return 1;
        }
        if (a.height > b.height) {
            if (this.direction === 'ASC') {
                return 1;
            }
            return -1;
        }
        return 0;
    }
}

export const nodeHeightDescComparator = new NodeHeightComparator('DESC');
