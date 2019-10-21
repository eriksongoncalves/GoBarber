module.exports = {
  root: true,
  extends: '@react-native-community',
  setting: {
    "import/resolver": {
      'babel-plugin-root-import': {
        rootPathSuffix: 'src'
      }
    }
  }
};
