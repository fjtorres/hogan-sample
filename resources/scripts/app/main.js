var requireLocale = "es-es";
if (typeof CURRENT_LOCALE != 'undefined') {
	requireLocale = CURRENT_LOCALE;
}

require.config({
    baseUrl: 'resources/scripts',
	paths : {
		jquery: 'lib/jquery-1.9.1.min',
        hgn : 'lib/hgn',
        text : 'lib/text',
		i18n: 'lib/i18n',
		hogan: 'lib/hogan-2.0.0',
		bootstrap: 'lib/bootstrap.min',
		
		// Templates
		tmpPersonas: 'app/templates/personas',
		tmpPersona1: 'app/templates/persona1',
		tmpPersona2: 'app/templates/persona2',
		
		// Datos
		datos: 'app/datos'
    },
	shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    },
    locale: requireLocale,
    hgn : {
        // load "*.mustache" files, set to empty string if you
        // want to specify the template extension for each individual file
        // the default value is ".mustache"
        templateExtension : '.mustache',

        // if you need to set custom options it can be done through the
        // "compilationOptions" setting, check hogan documentation:
        // https://github.com/twitter/hogan.js#compilation-options
        compilationOptions : {
            // delimiters : '<% %>',
            // sectionTags: [{o: '_foo', c: 'foo'}],
            // disableLambda : true
        }
    }
});

require(
	[
		"i18n!app/nls/resources",
		"jquery",
		"bootstrap",
		"hgn!tmpPersonas",
		"hgn!tmpPersona1",
		"hgn!tmpPersona2",
		"datos"
	], function(resources, $, $bootstrap, templatePersonas, templatePersona1, templatePersona2) {
	
	var partial = {
		"templatePersona1": templatePersona1.template, 
		"templatePersona2": templatePersona2.template,
	};
	
	// Add i18n support
	datos["i18n"] = function(key){return resources[key];};
	
	$(document).ready(function(){
		$("#contenido").html(templatePersonas(datos, partial));
	});
});