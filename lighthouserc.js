module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'csp-xss': 'off',
        'errors-in-console': 'off',
        'non-composited-animations': 'off',
        'tap-targets': 'off',
        'unused-javascript': 'off',
      },
    },
  },
};
