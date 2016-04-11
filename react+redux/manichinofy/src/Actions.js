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
        pantaloni:pantaloni
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
        scarpe:scarpe
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

var downloadConfig = function() {
    return {
        actionType: "downloadConfig"
    };
};

var deleteConfig = function() {
    return {
        actionType: "deleteConfig"
    };
};

var nextConfig = function() {
    return {
        actionType: "nextConfig"
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
    nextConfig: nextConfig
};
