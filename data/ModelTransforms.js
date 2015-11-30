import DatasetUtilities from './DatasetUtilities';

class ModelTransforms {
    constructor () {
        this.rollupHierarchy = this.createBoundWrapper(DatasetUtilities, DatasetUtilities.rollupHierarchy);
    }

    createBoundWrapper(object, method) {
      return function() {
          return method.apply(object, arguments);
      }
    }
}
export default new ModelTransforms(); // Singleton

