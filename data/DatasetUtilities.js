/*
 * NOTE: When adding a routine here that will be directly passed to ArtifactCache.computeArtifact as a
 * transform, be sure to add it to the constructor of the wrapper class, ModelTransforms.js.
 */
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
     * This routine takes 1 argument in addition to the data:
     *      detailLevel - the maximum depth to go to
     */
     rollupHierarchy (data, args) {
        let detailLevel = args.detailLevel;
        let initValues = function(len, value) { let a = []; for (let i=0; i<len; ++i) a.push(value); return a; };
        let tree = {};
        data.map(function (row, index) {
            let current = tree;
            for (let i=0; i<=detailLevel; ++i) {
                let cat = row['categories'][i];
                if (!(cat in current)) {
                    current[cat] = {};
                }
                current = current[cat];
                if (i == detailLevel) {
                    if (!('values' in current)) current['values'] = initValues(row['values'].length, 0.0);
                    if (!('categories' in current)) current['categories'] = row['categories'].slice(0);
                    row['values'].forEach((item, index) => {
                        current['values'][index] += Number(item);
                    })
                }
            }
        });
        let rows = this.extractFromTree(tree);
        return rows;
    }

    /* 
     * This routine takes 1 argument in addition to the data:
     *      useInfinity - Whether to use the infinity sign for new items or the word "New"
     *
     * If the input has N values, it outputs N-1 differents between successive pairs, N-1 percentage change
     * entries (or N/A or New for negative items or items with previous value zero, respectively). It also
     * outputs a 'percentSort' field based on the *last* difference.
     */

    differences (data, args) {
        let useInfinity = args.useInfinity;
        let rows = [];
        let initValues = function(len, value) { let a = []; for (let i=0; i<len; ++i) a.push(value); return a; };
        data.map(function (row, index) {
            let len = row['values'].length;
            let current = {
                categories: row['categories'].slice(0),
                values: initValues(len, 0.0),
                differences: initValues(len-1,0.0),
                percents: initValues(len-1,"")
            };

            row['values'].forEach((item, index) => {
                current['values'][index] = Number(item);
            });
            if (len > 1) {
                for (let i=1; i<len; ++i) {
                    let cur = current['values'][i];
                    let prev = current['values'][i-1];
                    let diff = cur - prev;
                    current['differences'][i - 1] = diff;
                    current['percents'][i - 1] = current['values'][i] - current['values'][i-1];
                    if (Math.abs(prev) < 0.001) {
                        if (useInfinity) {
                            current['percents'][i-1] = String.fromCharCode(8734) + " %";
                        }
                        else {
                            current['percents'][i-1] = "New";
                        }
                    }
                    else if (cur < 0. || prev < 0.) {
                        current['percents'][i-1] ="N/A";
                    }
                    else {
                        let pct = Math.round(1000*(diff)/prev)/10;
                        if (pct > 0) pct = "+" + pct;
                        current['percents'][i-1] = (pct) + "%";
                    }
                }
            }
            rows.push(current);
        });
        return rows;
    }
}
export default new DatasetUtilities(); // Singleton
