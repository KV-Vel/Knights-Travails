class Node {
    constructor(x, y, predecessors = [], next = []) {
        this.x = x;
        this.y = y;
        this.predecessors = predecessors;
        this.next = next;
    }
}

function knightMoves(startPos, endPos, queue = []) {
    const positions = [...startPos, ...endPos];
    const illegalMoves = positions.some((move) => move < 0 || move > 7);
    if (illegalMoves) return "Can't move here.";

    const startNode = queue[0] || new Node(startPos[0], startPos[1]);

    if (queue.length) queue.shift();

    const possibleMoves = [
        [startPos[0] - 2, startPos[1] - 1],
        [startPos[0] - 2, startPos[1] + 1],
        [startPos[0] + 2, startPos[1] - 1],
        [startPos[0] + 2, startPos[1] + 1],
        [startPos[0] - 1, startPos[1] + 2],
        [startPos[0] - 1, startPos[1] - 2],
        [startPos[0] + 1, startPos[1] + 2],
        [startPos[0] + 1, startPos[1] - 2],
    ];

    for (let i = 0; i < possibleMoves.length; i++) {
        if (
            possibleMoves[i][0] >= 0 &&
            possibleMoves[i][0] <= 7 &&
            possibleMoves[i][1] >= 0 &&
            possibleMoves[i][1] <= 7
        ) {
            const nextNode = new Node(possibleMoves[i][0], possibleMoves[i][1]);
            nextNode.predecessors = [...startNode.predecessors, startPos];
            queue.push(nextNode);
            startNode.next.push(nextNode);
        }
    }
    // If destination found
    if (startPos[0] === endPos[0] && startPos[1] === endPos[1]) {
        const path = [...startNode.predecessors, [startNode.x, startNode.y]];
        console.log(`You made it in ${path.length} moves!  Here's your path:`);
        path.forEach((path) => console.log(path));
        return;
    }

    knightMoves([queue[0].x, queue[0].y], endPos, queue);
}

knightMoves([0, 0], [0, 4]);
