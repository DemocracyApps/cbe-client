import { fromJS } from 'immutable';

class ArtifactCache {
  constructor () {
    this.artifacts = {};
  }

  // Recompute is true the first time or if any arguments change
  needRecompute(current, args) {
    let recompute = false;
    for (var key in current.args) {
      if (!(key in args) || current.args[key] !== args[key]) {
        recompute = true;
      }
      if (recompute) break;
    }
    return recompute;
  }

  /*
   * This applies an array of transforms to the data, one after another, each taking the output of the previous as input.
   * Each transform is computed only if either the input data or any of the arguments have changed.
   */
  computeArtifact(id, name, data, transforms) {
    let recompute = false;
    let initTransforms = function(len) { let a = []; for (let i=0; i<len; ++i) a.push({}); return a; };
    if (!(id in this.artifacts)) {
      this.artifacts[id] = {};
      recompute = true;
    }
    if (!(name in this.artifacts[id])) {
      this.artifacts[id][name] = {value: null, transforms: initTransforms(transforms.length)};
      recompute = true;
    }

    let recomputeIfNeeded = function (previousValue, currentElement, index, array) {
      let args = currentElement.args;
      let transform = currentElement.transform;
      if (!recompute) recompute = this.needRecompute(this.artifacts[id][name].transforms[index], args);
      if (recompute) {
        let newValue = transform(previousValue.toJS(), args);
        let bag = {};
        for (var key in args) {
          if (args.hasOwnProperty(key)) {
            bag[key] = args[key];
          }
        }
        this.artifacts[id][name].transforms[index] = {args: bag, value: fromJS(newValue)};
      }
      return this.artifacts[id][name].transforms[index].value;
    };
    this.artifacts[id][name].value = transforms.reduce (recomputeIfNeeded.bind(this), data);

    return this.artifacts[id][name].value;
  }
}

export default new ArtifactCache(); // Singleton
