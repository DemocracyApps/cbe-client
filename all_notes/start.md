Working on getting the HistoryTable to show the collapsed hierarchy rather than all the line items.
 - Probably rename DatasetUtilities.extractHierarcy to collapsehierarchy
 - Running into a binding problem. When I pass extractHierarchy from HistoryTable.js line 26 into ArtifactCache.js and it gets called, 'this' no longer refers to the DatasetUtilities singleton. Need to bind it (and generalize this). To see how, look at http://alistapart.com/article/getoutbindingsituations#section7
 