const initialState = {
    /*"maglie":[{"desc": "Maglia Nera", "img": "maglia_nera.png"}, {"desc": "Superman", "img": "superman.png"}, {"desc": "Maglia a Righe", "img": "maglia_a_righe.png"}, {"desc": "Maglia Verde", "img": "maglia_verde.png"}],
    "pantaloni":[{"desc": "Pantaloni Beige", "img": "pantaloni_beige.png"}, {"desc": "Pantaloni Neri", "img": "pantaloni_neri.png"}, {"desc": "Pantaloni Verdi", "img": "pantaloni_verdi.png"}, {"desc": "Pantaloni da Elicotterista", "img": "pantaloni_elicotterista.png"}, {"desc": "Pantaloni Shorts", "img": "pantaloni_shorts.png"}],
    "scarpe":[{"desc": "Scarpe Grigie", "img": "scarpe_grigie.png"}, {"desc": "Scarpe Eleganti", "img": "scarpe_eleganti.png"}],*/
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

function getMaglie(state){
    var toReturn = Object.assign({}, state);
    //TODO: alla get per ora non succede nulla
    return toReturn;
};

function maglieLoaded(state,action){
    var toReturn = Object.assign({}, state);
    toReturn.maglie = action.maglie;
    return toReturn;
};

function getPantaloni(state){
    var toReturn = Object.assign({}, state);
    var serverRequestPantaloni = $.get("http://localhost:3000/react/manichinofy/pantaloni.json", function(result){
        toReturn.pantaloni = result.pantaloni.slice();
    });
    return toReturn;
};

function getScarpe(state){
    var toReturn = Object.assign({}, state);
    var serverRquestScarpe = $.get("http://localhost:3000/react/manichinofy/scarpe.json", function(result){
        toReturn.scarpe = result.scarpe.slice();
    });
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

function downloadConfig(state){
    var toReturn = Object.assign({}, state);
    var requestConfig = $.get('http://localhost:3000/react/manichinofy/config', function (result){
        toReturn.configs = result;
        toReturn.currentConfig.maglia = toReturn.configs[0].maglia;
        toReturn.currentConfig.pantalone = toReturn.configs[0].pantalone;
        toReturn.currentConfig.scarpa = toReturn.configs[0].scarpa;
        toReturn.currentConfig.occhiali = toBoolean(toReturn.configs[0].occhiali);
        toReturn.selected = 0;
        console.log("get ok");
    }).fail(function(res){
        console.log(res.statusText);
        if (res.status==404)
            alert("Nessuna configurazione presente sul server");
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

function deleteConfig(state){
    var toReturn = Object.assign({}, state);
    var handler = $.ajax({
			url: 'http://localhost:3000/react/manichinofy/config',
			type: 'DELETE'
        });
    handler.done(function(res){
        console.log("delete ok");
        toReturn.configs = [];
        toReturn.currentConfig = {"maglia": "", "pantalone": "", "scarpa": "", "occhiali": false};
        toReturn.selected = -1;
    }).fail(function(res){
        console.log(res.statusText);
    });
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
        case "getMaglie":
            return getMaglie(state);
        case "getPantaloni":
            return getPantaloni(state);
        case "getScarpe":
            return getScarpe(state);
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
        case "downloadConfig":
            return downloadConfig(state);
        case "nextConfig":
            return nextConfig(state);
        case "deleteConfig":
            return deleteConfig(state);
        case "maglieLoaded":
            return maglieLoaded(state,action);
        default:
            return state;
    };
}
