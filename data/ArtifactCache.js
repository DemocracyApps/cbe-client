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
      for (var key in current.get('args')) {
        if (!(key in args) || current.get('args').get(key) !== args[key]) {
          recompute = true;
        }
        if (recompute) break;
      }
    }
    return recompute;
  }

  computeArtifact(id, name, args, generator) {
    if (this.needRecompute(id, name, args)) {
      console.log("We are doing the recompute");
      let artifact = generator(args);
      if (!(name in this.artifacts[id])) { 
        this.artifacts[id][name] = fromJS(artifact);
      }
    }
    return this.artifacts[id][name];
  }
}

export default new ArtifactCache(); // Singleton
