module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'csp-xss': 'warn',
        'errors-in-console': 'warn',
        'non-composited-animations': 'warn',
        'tap-targets': 'warn',
        'unused-javascript': 'warn',
      },
    },
  },
};
