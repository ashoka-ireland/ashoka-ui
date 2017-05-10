export default (context) => {
  context.keys().forEach(function(path) {
      try {
          context(path);
      } catch(err) {
          console.error('[ERROR] WITH SPEC FILE: ', path, err.stack);
      }
  });
};
