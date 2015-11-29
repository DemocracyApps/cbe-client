- Not sure that it makes sense to pass componentId AND childId into the subcomponent (see ShowmePage including HistoryTable). I think we pass in that sub-components ID as componentId and leave it at that. Every component gets an id, but it's only used to store things like state in a unique place. The question is, do subcomponents like HistoryTable get a componentState that they can use. I'm thinking only those that actually have a definition at the site level do. Other components can use the artifact cache, but that's all. Note that the generator passed in could be a simple function to just copy the arguments for storage.

- Consider making the last parameter in computeArtifact an array of generators, each of
which takes the output of the previous. That way we can have a pipeline.


