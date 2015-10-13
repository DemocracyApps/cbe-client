In a CBE site, the structure and data (or references to data) are all specified in a single container variable called 'site' that is made available via the global namespace:
```js
  <script type="text/javascript">
    window.GBEVars = window.GBEVars || {};
    GBEVars.site = {...};
  </script>
```
And that's all there is too it. We'll use that as a way of doing a local development site - see lib/index.html,
which simply includes files for the site and for test data.

Maybe create a route on the admin server that delivers contents usable in testsite.js based on the slugname and a route on the data server that delivers a collection of datasets in a form usable in testdata.js. Rather than hooking up directly to the server.

Alternatively, could continue to use the dataserver directly, but I'd have to write the reverse-proxy code in the local dev server code.


