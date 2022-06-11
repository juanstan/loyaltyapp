// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  apiUrl: 'https://loyalty.bondly.io/api',
  mapbox: {
    accessToken: 'pk.eyJ1IjoianVhbnN0YW4iLCJhIjoiY2wwbmd4OHJ1MWJhZzNicXRrZzJpY3JlciJ9.Xoyr3G5e_tCy_ZAsTv4aeQ',
    icon: {
      vessel: {
        iconUrl: 'assets/img/marker-icon.png',
        shadowUrl: 'assets/img/marker-shadow.png',
        popupAnchor: [13, 0],
      },
      locator: {
        iconUrl: 'assets/img/marker-user-icon.png',
        shadowUrl: 'assets/img/marker-shadow.png',
        popupAnchor: [13, 0],
      }
    }
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
