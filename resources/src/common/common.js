function requireAll(r) {
	r.keys().map(r);
  }
  
  requireAll(require.context('.', true, /^\.\/[^/]+\/[^/.]+\.(js|scss|)$/));