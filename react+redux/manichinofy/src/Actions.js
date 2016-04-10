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
    return {
        actionType: "getPantaloni"
    };
};

var getScarpe = function(capo) {
    return {
        actionType: "getScarpe"
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
