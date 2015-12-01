Could do some cleanup in the rendering routine of ShowMePage, but I think the main next step is to walk into creating the treemap.

I've made the createArtifact routine take an array of transforms, however, there are a couple issues:

1. We need to actually test that it works on a multi-step thing (e.g., differences)
2. We need to make sure that we're settled on what each transform takes (i.e., that a differencer can operate both
   directly on the same thing the HistoryTable sends and on the OUTPUT of that).
   