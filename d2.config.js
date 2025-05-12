const config = {
  name: "zipcode-lookup-plugin",
  title: "Zipcode Lookup Capture Plugin",
  description:
    "A Capture Plugin to look up zipcodes and prefill city and state information",
  type: "app",
  author: "EyeSeeTea team",

  entryPoints: {
    plugin: "./src/Plugin.tsx",
  },
};

module.exports = config;
