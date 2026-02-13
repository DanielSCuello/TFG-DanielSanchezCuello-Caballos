//Copy this file to config.js and specify your own settings

export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  //background: "NONE", //background can be "NONE" or a URL.
  actionAfterSolve: "NONE", //actionAfterSolve can be "NONE" or "SHOW_MESSAGE".
  //message: "Custom message",

  //Number of wires
  numberOfWires: 5,
  //solutionLength: 5,

  timer: "TRUE",

  //Settings that will be automatically specified by the Escapp server
  //solutionLength: 4, // If solutionLength is not specified, it will automatically be set to numberOfWires.
  locale: "es",

  escappClientSettings: {
    endpoint: "https://escapp.es/api/escapeRooms/id",
    linkedPuzzleIds: [1],
    rtc: false,
    preview: false
  },
};