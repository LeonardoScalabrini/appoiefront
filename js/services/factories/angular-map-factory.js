appoie.factory('uiGmapMapScriptLoader', ['$q', 'uiGmapuuid', ($q, uuid) ->

    scriptId = undefined
    usedConfiguration = undefined

    getScriptUrl = (options)->

        if options.china
        	'http://maps.google.cn/maps/api/js?'
        else
        	if options.transport == 'auto'
            	'//maps.googleapis.com/maps/api/js?';
        	else
            	options.transport + '://maps.googleapis.com/maps/api/js?';

    includeScript = (options)->
        omitOptions = ['transport', 'isGoogleMapsForWork', 'china', 'preventLoad']
        
        if options.isGoogleMapsForWork
          omitOptions.push('key')

        query = _.map _.omit(options, omitOptions), (v, k) ->
        	k + '=' + v

        if scriptId
        	scriptElem = document.getElementById(scriptId)
        	scriptElem.parentNode.removeChild(scriptElem)

        query = query.join '&'
        script = document.createElement 'script'
        script.id = scriptId = "ui_gmap_map_load_#{uuid.generate()}"
        script.type = 'text/javascript'
        script.src = getScriptUrl(options) + query
        document.head.appendChild script

      	isGoogleMapsLoaded = ->
        	angular.isDefined(window.google) and angular.isDefined(window.google.maps)

      	load: (options)->
        	deferred = $q.defer()


	        if isGoogleMapsLoaded()
	          	deferred.resolve window.google.maps
	         	return deferred.promise

	        randomizedFunctionName = options.callback = 'onGoogleMapsReady' + Math.round(Math.random() * 1000)
	        window[randomizedFunctionName] = ->
	          	window[randomizedFunctionName] = null
	          	deferred.resolve window.google.maps
	          	return

	       
	        if window.navigator.connection && window.Connection && window.navigator.connection.type == window.Connection.NONE && !options.preventLoad
	        	document.addEventListener 'online', ->
	            	includeScript options if !isGoogleMapsLoaded()
	        else if !options.preventLoad
	          includeScript options

	        usedConfiguration = options
	        usedConfiguration.randomizedFunctionName = randomizedFunctionName

	        deferred.promise

    manualLoad: () ->

        config = usedConfiguration

        if !isGoogleMapsLoaded()
        	includeScript config
        else
        	window[config.randomizedFunctionName]() if window[config.randomizedFunctionName]
])