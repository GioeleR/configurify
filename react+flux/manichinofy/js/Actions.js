var Dispatcher = require('./Dispatcher');

Actions = {
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
