appoie.provider('uiGmapGoogleMapApi', ->

    @options =

      transport: 'https'
      isGoogleMapsForWork: false
      china: false
      v: '3'
      libraries: ''
      language: 'en'
      preventLoad: false

    @configure = (options) ->
      angular.extend @options, options
      return

    @$get = ['uiGmapMapScriptLoader' ,(loader) =>
      loader.load @options
    ]
    @
  )