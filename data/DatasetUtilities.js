
class DatasetUtilities {
        // let rows = cache.computeArtifact(myId, 'processedData',
        //                                   {data, detailLevel, startPath: null},
        //                                   DatasetUtilities.extractHierarchy);

  extractHierarchy (args) {
    let data = args.data;
    return data;
  }
}
export default new DatasetUtilities(); // Singleton
