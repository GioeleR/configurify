var getMaglie = function(capo) {
    return dispatch => {
        $.get("http://localhost:3000/react/manichinofy/maglie.json", function(result){
            dispatch(maglieLoaded(result.maglie.slice()));
        });
    };
};

var maglieLoaded = function(maglie) {
    return {
        actionType: "maglieLoaded",
        maglie:maglie
    };
};

var getPantaloni = function(capo) {
    return dispatch => {
        $.get("http://localhost:3000/react/manichinofy/pantaloni.json", function(result){
            dispatch(pantaloniLoaded(result.pantaloni.slice()));   
        });
    };
};

var pantaloniLoaded = function(pantaloni) {
    return {
        actionType: "pantaloniLoaded",
        pantaloni: pantaloni
    };
};

var getScarpe = function(capo) {
    return dispatch => {
        $.get("http://localhost:3000/react/manichinofy/scarpe.json", function(result){
            dispatch(scarpeLoaded(result.scarpe.slice()));
        });
    };
};

var scarpeLoaded = function(scarpe) {
    return {
        actionType: "scarpeLoaded",
        scarpe: scarpe
    };
};

var setMaglia = function(capo) {
    return {
        actionType: "setMaglia",
        capo: capo
    };
};

var setPantalone = function(capo) {
    return {
        actionType: "setPantalone",
        capo: capo
    };
};

var setScarpa = function(capo) {
    return {
        actionType: "setScarpa",
        capo: capo
    };
};

var toogleOcchiali = function () {
    return {
        actionType: "toogleOcchiali"
    };
};

var uploadConfig = function() {
    return {
        actionType: "uploadConfig"
    };
};

var downloadConfig = function(){
    return dispatch => {
        $.ajax({
            url: "http://localhost:3000/react/manichinofy/config",
            type : 'GET',
            success: function(result){
                dispatch(configDownloaded(result));
            },
            error: function(result){
                dispatch(notDownloaded(result));
            }
        });
    }
};

var configDownloaded = function(result){
    return{
        actionType: "configDownloaded",
        result: result
    };
};

var notDownloaded = function(result){
    return {
        actionType: "notDownloaded",
        result: result
    };
};

var deleteConfig = function() {
    return dispatch => {
        var handler = $.ajax({
            url: "http://localhost:3000/react/manichinofy/config",
            type: 'DELETE',
            success: function(result){
                dispatch(configDeleted(result));
            },
            error: function(result){
                dispatch(notDeleted(result));
            }
        });
    };
};

var configDeleted = function(result) {
    return {
        actionType: "configDeleted",
        result: result
    };
};

var notDeleted = function(result) {
    return {
        actionType: "deleteConfig",
        result: result
    };
};

var nextConfig = function() {
    return {
        actionType: "nextConfig"
    };
};

var resetApp = function() {
    return {
        actionType: "reset"
    };
};

export default {
    getMaglie: getMaglie,
    getPantaloni: getPantaloni,
    getScarpe: getScarpe,
    setMaglia: setMaglia,
    setPantalone: setPantalone,
    setScarpa: setScarpa,
    toogleOcchiali: toogleOcchiali,
    uploadConfig: uploadConfig,
    downloadConfig: downloadConfig,
    deleteConfig: deleteConfig,
    nextConfig: nextConfig,
    resetApp: resetApp
};
