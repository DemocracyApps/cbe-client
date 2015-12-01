class DatasetUtilities {

    extractFromTree (node) {
        let data = [];
        if (node.hasOwnProperty('values') && node.values) {
            data.push({categories: node.categories, values: node.values});
        }
        else {
            for (var prop in node) {
                if (node.hasOwnProperty(prop)) {
                    data = data.concat(this.extractFromTree(node[prop]));
                }
            }
        }
        return data;
    }

    /* 
     * This routine takes 2 arguments:
     *      data - the raw dataset
     *      detailLevel - the maximum depth to go to
     */
     rollupHierarchy (data, args) {
//        let data = args.data;
        let detailLevel = args.detailLevel;
        let initValues = function(len, value) { let a = []; for (let i=0; i<len; ++i) a.push(value); return a; };
        let tree = {};
        data.map(function (row, index) {
            let current = tree;
            for (let i=0; i<=detailLevel; ++i) {
                let cat = row.get('categories').get(i);
                if (!(cat in current)) {
                    current[cat] = {};
                }
                current = current[cat];
                if (i == detailLevel) {
                    if (!('values' in current)) current['values'] = initValues(row.get('values').size, 0.0);
                    if (!('categories' in current)) current['categories'] = row.get('categories').toArray();
                    row.get('values').forEach((item, index) => {
                        current['values'][index] += Number(item);
                    })
                }
            }
        });
        let rows = this.extractFromTree(tree);
        return rows;
    }
}
export default new DatasetUtilities(); // Singleton
