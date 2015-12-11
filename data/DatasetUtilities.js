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
        let detailLevel = args.detailLevel;
        let initValues = function(len, value) { let a = []; for (let i=0; i<len; ++i) a.push(value); return a; };
        let newRows = [];
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

    /* 
     * This routine takes only one argument:
     *      data - the raw dataset
     * If the input has N values, it outputs 2*N-1 values which are the original N
     * plus the N-1 differences between successive pairs.
     */
     differences (data, args) {
        let rows = [];
        let initValues = function(len, value) { let a = []; for (let i=0; i<len; ++i) a.push(value); return a; };
        data.map(function (row, index) {
            let len = row.get('values').size;
            let current = {
                categories: row.get('categories').toArray(),
                values: initValues(len, 0.0)
            };

            row.get('values').forEach((item, index) => {
                current['values'][index] = Number(item);
            });
            if (len > 1) {
                for (let i=1; i<len; ++i) {
                    current['values'][len + i - 1] = current['values'][i] - current['values'][i-1];
                }
            }
            rows.push(current);
        });
        return rows;
    }
}
export default new DatasetUtilities(); // Singleton
