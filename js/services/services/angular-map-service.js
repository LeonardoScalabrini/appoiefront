appoie.service('uiGmapGoogleMapApiManualLoader', ['uiGmapMapScriptLoader', (loader) ->
    load: ()->
        loader.manualLoad()
        return
])