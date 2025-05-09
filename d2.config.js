const config = {
  name: "zipcode-lookup-plugin",
  title: "Zipcode Lookup Plugin",
  description:
    "A Capture Plugin to look up zipcodes and prefill city and state information",
  type: "app",

  entryPoints: {
    plugin: "./src/Plugin.tsx",
  },
};

module.exports = config;
