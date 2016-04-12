const initialState = {
    "maglie": [],
    "pantaloni": [],
    "scarpe": [],
    "currentConfig": {"maglia": "", "pantalone": "", "scarpa": "", "occhiali": false},
    "configs": [],
    "selected": -1,
    "manichino": "manichino.jpg",
    "braccioSx": "mano_sx.png",
    "braccioDx": "mano_dx.png",
};

function maglieLoaded(state,action){
    var toReturn = Object.assign({}, state);
    toReturn.maglie = action.maglie;
    return toReturn;
};

function pantaloniLoaded(state,action){
    var toReturn = Object.assign({}, state);
    toReturn.pantaloni = action.pantaloni;
    return toReturn;
};

function scarpeLoaded(state,action){
    var toReturn = Object.assign({}, state);
    toReturn.scarpe = action.scarpe;
    return toReturn;
};

function setMaglia(state, capo){
    var toReturn = Object.assign({}, state,{
        maglie: [...state.maglie], pantaloni: [...state.pantaloni], scarpe: [...state.scarpe]
    });
    toReturn.currentConfig.maglia = capo;
    return toReturn;
};

function setPantalone(state, capo){
    var toReturn = Object.assign({}, state);
    console.log();
    toReturn.currentConfig.pantalone = capo;
    return toReturn;
};

function setScarpa(state, capo){
    var toReturn = Object.assign({}, state);
    toReturn.currentConfig.scarpa = capo;
    return toReturn;
};

function toogleOcchiali(state){
    var toReturn = Object.assign({}, state);
    toReturn.currentConfig.occhiali = !toReturn.currentConfig.occhiali;
    return toReturn;
};

function uploadConfig(state){
    var toReturn = Object.assign({}, state);
    var handler = $.ajax({
        data: toReturn.currentConfig,
		url: 'http://localhost:3000/react/manichinofy/config',
		type: 'PUT',
		dataType: 'json'
    });
	handler.done(function(res){
        if (res)
            console.log("put ok");
        else
            alert("Configurazione gia' presente sul server");
    }).fail(function(res){
        if(res.status==200)
            alert("Caricamento effettuato con successo");
        console.log(res.status);
    });
    return toReturn;
};

function nextConfig(state){
    var toReturn = Object.assign({}, state);
    toReturn.selected++;
    if (toReturn.configs.length <= toReturn.selected)
        toReturn.selected = 0;
        toReturn.currentConfig = toReturn.configs[toReturn.selected];
        toReturn.currentConfig.occhiali = toBoolean(toReturn.configs[toReturn.selected].occhiali);
    return toReturn;
};

function deleteConfig(state, result) {
    var toReturn = Object.assign({}, state);
    console.log("delete ok");
    toReturn.configs = [];
    toReturn.currentConfig = {"maglia": "", "pantalone": "", "scarpa": "", "occhiali": false};
    toReturn.selected = -1;
    return toReturn;
};

function notDelete(state, result) {
    var toReturn = Object.assign({}, state);
    console.log(result.statuText);
    return toReturn;
};

function configDownloaded(state, result) {
    var toReturn = Object.assign({}, state);
    toReturn.configs = result;
    toReturn.currentConfig = result[0];
    toReturn.currentConfig.occhiali = toBoolean(toReturn.configs[0].occhiali);
    toReturn.selected = 0;
    console.log("get ok");
    return toReturn;
};

function notDownloaded(state, result) {
    var toReturn = Object.assign({}, state);
    console.log(result.statusText);
    if (result.status==404)
        alert("Nessuna configurazione presente sul server");
    return toReturn;
};

function reset(state, initialState) {
    var toReturn = Object.assign({}, state);
    toReturn.currentConfig = {"maglia": "", "pantalone": "", "scarpa": "", "occhiali": false};
    toReturn.configs = [];
    toReturn.selected = -1;
    return toReturn;
};

function toBoolean(x){
    if (x=="true")
        return true;
    if (x=="false")
		return false;
	return x;
};

export default function App(state = initialState, action) {
    switch (action.actionType) {
        case "setMaglia":
            return setMaglia(state, action.capo);
        case "setPantalone":
            return setPantalone(state, action.capo);
        case "setScarpa":
            return setScarpa(state, action.capo);
        case "toogleOcchiali":
            return toogleOcchiali(state);
        case "uploadConfig":
            return uploadConfig(state);
        case "nextConfig":
            return nextConfig(state);
        case "maglieLoaded":
            return maglieLoaded(state,action);
        case "pantaloniLoaded":
            return pantaloniLoaded(state, action);
        case "scarpeLoaded":
            return scarpeLoaded(state, action);
        case "configDeleted":
            return deleteConfig(state, action.result);
        case "notDeleted":
            return notDelete(state, action.result);
        case "configDownloaded":
            return configDownloaded(state, action.result);
        case "notDownloaded":
            return notDownloaded(state, action.result);
        case "reset":
            return reset(state, initialState);
        default:
            return state;
    };
}