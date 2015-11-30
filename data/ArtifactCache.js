import { fromJS } from 'immutable';

class ArtifactCache {
  constructor () {
    this.artifacts = {};
  }

  // Recompute is true the first time or if any arguments change
  needRecompute(id, name, args) {
    let recompute = false;
    if (!(id in this.artifacts)) {
      this.artifacts[id] = {};
      recompute = true;
    }
    if (!(name in this.artifacts[id])) {
      recompute = true;
    }
    else {
      let current = this.artifacts[id][name];
      for (var key in current.args) {
        if (!(key in args) || current.args[key] !== args[key]) {
          recompute = true;
        }
        if (recompute) break;
      }
    }
    return recompute;
  }

  computeArtifact(id, name, args, generator) {
    if (this.needRecompute(id, name, args)) {
      let artifact = generator(args);
      let bag = {};
      for (var key in args) {
        if (args.hasOwnProperty(key)) {
          bag[key] = args[key];
        }
      }
      this.artifacts[id][name] = {args: bag, value: fromJS(artifact)};
    }
    return this.artifacts[id][name].value;
  }
}

export default new ArtifactCache(); // Singleton
