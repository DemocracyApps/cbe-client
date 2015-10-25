
We basically want a module that does:

let appState = {
  // define some public methods
};
export default appState;

We'll have two: one that maps cards to the cardsets that components use, another to map datasets to the merged datasets that components use. In both cases, they need to walk through the components and walk through their named cardsets and datasets, and create a derived version of each. Both should start from a list of the indices needed and save out the pointers that they get back so that they can compare to see if they've changed. If not, no need to recompute.

START: write from the perspective of SimpleCard and build up from there.
