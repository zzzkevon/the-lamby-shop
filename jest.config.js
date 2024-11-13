module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transform JS and JSX files using Babel
    },
    transformIgnorePatterns: [
      'node_modules/(?!axios/)', // Transform axios and its dependencies
    ],
  };
  