var Dispatcher = require('./Dispatcher');

Actions = {
	getMaglie: function() {
		Dispatcher.dispatch({
			actionType: "getMaglie"
		});
		var serverRequestMaglie = $.get("http://localhost:3000/react/manichinofy/maglie.json", function(result){
			Dispatcher.dispatch({
				actionType: "maglieLoaded",
				result: result.maglie.slice()
			});
		});
	},
	
	getPantaloni: function() {
		Dispatcher.dispatch({
			actionType: "getPantaloni"
		});
		var serverRequestPantaloni = $.get("http://localhost:3000/react/manichinofy/pantaloni.json", function(result){
			Dispatcher.dispatch({
				actionType: "pantaloniLoaded",
				result: result.pantaloni.slice()
			});
		});
	},
	
	getScarpe: function() {
		Dispatcher.dispatch({
			actionType: "getScarpe"
		});
		var serverRquestScarpe = $.get("http://localhost:3000/react/manichinofy/scarpe.json", function(result){
			Dispatcher.dispatch({
				actionType: "scarpeLoaded",
				result: result.scarpe.slice()
			});
		});
	},
	
    setMaglia: function(capo) {
        Dispatcher.dispatch({
            actionType: "setMaglia",
            capo: capo
        });
    },
    
    setPantalone: function(capo) {
        Dispatcher.dispatch({
            actionType: "setPantalone",
            capo: capo
        });
    },

    setScarpa: function(capo) {
        Dispatcher.dispatch({
            actionType: "setScarpa",
            capo: capo
        });
    },

    toogleOcchiali: function(show){
        Dispatcher.dispatch({
            actionType: "toogleOcchiali",
            show: show
        });
    },
    
    uploadConfig: function() {
        Dispatcher.dispatch({
            actionType: "upload"
        });
    },

    downloadConfig: function() {
        Dispatcher.dispatch({
            actionType: "download"
        });
    },

    nextConfig: function() {
        Dispatcher.dispatch({
            actionType: "next"
        });
    },

    deleteConfig: function() {
        Dispatcher.dispatch({
            actionType: "delete"
        });
    }
};

module.exports = Actions;
