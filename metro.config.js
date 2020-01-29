const { assetExts, sourceExts } = require("metro-config/src/defaults/defaults");
const blacklist = require("metro-config/src/defaults/blacklist");
const { getDefaultConfig, mergeConfig } = require("metro-config");
const cfg = async () => await getDefaultConfig();
module.exports = mergeConfig(cfg, {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    }),
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
    blacklistRE: blacklist([/ios\/Pods\/.*/])
  }
});
