In a CBE site, the structure and data (or references to data) are all specified in a single container variable called 'site' that is made available via the global namespace:
```js
  <script type="text/javascript">
    window.GBEVars = window.GBEVars || {};
    GBEVars.site = {...};
  </script>
```
And that's all there is too it.
