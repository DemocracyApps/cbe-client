NEXT:
2. Create the what's new page
3. create the budget doc breakdown page
4. Figure out how to connect to actual dataserver.
5. Figure out how to put it on a server

LATER:

* I've made the createArtifact routine take an array of transforms, however, there are a couple issues:
    1. We need to actually test that it works on a multi-step thing (e.g., differences)
    2. We need to make sure that we're settled on what each transform takes (i.e., that a differencer can operate both
    directly on the same thing the HistoryTable sends and on the OUTPUT of that).
* Mustache templates for the treemap are included right now in the main index.html file. Before they were included
  via a php require, but still in the main template. Need a better way!
* Need a better way to include the CSS for the treemap


   