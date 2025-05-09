## Zipcode lookup Capture Plugin

Based on the [Civil Registry Mock Plugin](https://github.com/eirikhaugstulen/civil-registry-plugin/).

Adds a button that allows auto-populating State and City from a Zip Code.

### How to use

1. Install plugin `.zip` file
2. Download and install the Tracker configurator app from the _App management application_ or from the [App hub](https://apps.dhis2.org/app/85d156b7-6e3f-43f0-be57-395449393f7d).
3. Follow the instructions in the Tracker configurator app to configure the plugin.
4. Open the Capture app and create or edit the configured entity.

### Development

1. `yarn install`
2. `yarn start`
3. Configure the plugin in Tracker Plugin Configurator with "Add Local Plugin" -> url: `http://localhost:3001/plugin.html`.

### Generate a release

1. `yarn install`
2. Update `version` in `package.json` if required
3. `yarn build`

The output will be the `build/bundle/zipcode-lookup-plugin-{version}.zip` file, ready to upload in App Management -> Manual Install.

### Configuration

The plugin expects three tracked entity attributes to be configured in the field map. Please configure this in the Tracker configurator app.

Example

| Attribute ID | Plugin alias | Type |
| ------------ | ------------ | ---- |
| w75KJ2mc4zz  | zipCode      | Text |
| zDhUuAYrxNC  | state        | Text |
| cejWyOfXge6  | city         | Text |

### Important notes

#### API Integration

This plugin expects that a [route](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/route.html) is configured.

The route must be named `zipcode-lookup`. When searching, a POST request will be made with the following JSON body:

```json
{
  "datasets": ["us-address"],
  "key": {
    "type": "postal_code",
    "value": "{{zip code}}"
  },
  "country_iso": "USA"
}
```

To switch this API integration, change the `fetchZipcodeLookup` implementation. An alternative example can be found at `fetchZipcodeLookupZippo`.
