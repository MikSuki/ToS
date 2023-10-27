class Node {
    /**
     * @param {number} data 
     */
    constructor(data) {
        this.parent = this
        this.size = 1
        this.data = data
    }
}

class DisjointSet {
    /**
     * create a new disjoint set
     * @param {number} data 
     * @returns 
     */
    MakeSet(data) {
        return new Node(data)
    }

    /**
     * find parent of node x
     * @param {Node} x 
     * @returns 
     */
    Find(x) {
        if (x.parent != x)
            x.parent = this.Find(x.parent)
        return x.parent
    }

    /**
     * union two disjoint set, and the parent will be the one whose size larger
     * @param {Node} x 
     * @param {Node} y 
     * @returns 
     */
    Union(x, y) {
        let root1 = this.Find(x)
        let root2 = this.Find(y)
        if (root1 == root2) return

        if (root2.data < root1.data)
            [root1, root2] = [root2, root1]

        root2.parent = root1
        root1.size += root2.size
        root2.size = 0
    }
}

function convert(m, n, nodes) {
    const res = [];
    for (let i = 0; i < m; ++i)
        for (let j = 0; j < n; ++j)
            res.push(nodes[i * n + j].parent.data);
    return res;
}

/**
 * use disjoint set to calculate which beads will be clear
 * @param {number} m number of rows
 * @param {number} n number of columns
 * @param {{type: number}[]} beads game beads
 * @returns @type number[][] group of nodes be cleared this run 
 */
function findConnect(m, n, beads) {
    /** @type bead[] */
    // const beads = createBeads(arr);
    /** @type number */
    const mn = m * n;
    /** @type DisjointSet */
    const ds = new DisjointSet();
    /** @type Node[] */
    const nodes = new Array(mn).fill(null);
    
    const clears = [];
    /** @type number the num of minimum beads connect to be cleared */
    const min_connect = 3;

    for (let i = 0; i < mn; ++i)
        nodes[i] = ds.MakeSet(i);

    // calculate clear of horizontal and vertical

    const dir = [
        [1, 0],
        [0, 1]
    ];
    const getInd = (x, y) => x * n + y;

    // vertical
    for (let j = 0; j < n; ++j) {
        for (let i = 0; i < m; ++i) {
            const index = getInd(i, j);
            const type = beads[index].type;
            let [x, y] = [i + dir[0][0], j + dir[0][1]];
            while (x < m && y < n && beads[getInd(x, y)].type == type)
                [x, y] = [x + dir[0][0], y + dir[0][1]];
            const connect = x - i;
            if (connect < min_connect) continue;
            for (let k = i + 1; k < x; ++k)
                ds.Union(nodes[index], nodes[getInd(k, j)]);
            i = x - 1;
        }
    }

    // horizontal
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            const index = getInd(i, j);
            const type = beads[index].type;
            let [x, y] = [i + dir[1][0], j + dir[1][1]];
            while (x < m && y < n && beads[getInd(x, y)].type == type)
                [x, y] = [x + dir[1][0], y + dir[1][1]];
            const connect = y - j;
            if (connect < min_connect) continue;
            for (let k = j + 1; k < y; ++k)
                ds.Union(nodes[index], nodes[getInd(i, k)]);
            j = y - 1;
        }
    }

    // union adjacent beads
    for (let i = 0; i < m - 1; ++i)
        for (let j = 0; j < n; ++j) {
            const x = getInd(i, j);
            const y = x + n;
            if (beads[x].type == beads[y].type && ds.Find(nodes[x]).size >= min_connect && ds.Find(nodes[y]).size >= min_connect){
                ds.Union(nodes[x], nodes[y]);
        }
    for (let i = 0; i < m; ++i)
        for (let j = 0; j < n - 1; ++j) {
            const x = getInd(i, j);
            const y = x + 1;
            if (beads[x].type == beads[y].type && ds.Find(nodes[x]).size >= min_connect && ds.Find(nodes[y]).size >= min_connect)
                ds.Union(nodes[x], nodes[y]);
        }
    }
    nodes.forEach(node => ds.Find(node));

    // for test
    // return convert(m, n, nodes);

    const map = new Map();
    for(let i = 0; i < mn; ++i){
        if(nodes[i].parent.size >= min_connect){
            const key = nodes[i].parent.data;
            if(!map.has(key))
                map.set(key, []);
            map.get(key).push(i);
        }
    }

    return Array.from(map.values());
}

// for test
// module.exports = findConnect;