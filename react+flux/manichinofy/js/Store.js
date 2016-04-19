var Dispatcher = require('./Dispatcher');
var Events = require('events');
var _ = require('underscore');

var EventEmitter = Events.EventEmitter;

var selected = -1;
var configs = [];
var currentConfig = {"maglia": "", "pantalone": "", "scarpa": "", "occhiali": false};
var data = {"maglie": [], "pantaloni": [], "scarpe": []};

Dispatcher.register(function(action) {
    switch (action.actionType) {
		case "maglieLoaded":
			Store.maglieLoaded(action.result);
			break;
			
		case "pantaloniLoaded":
			Store.pantaloniLoaded(action.result);
			break;
			
		case "scarpeLoaded":
			Store.scarpeLoaded(action.result);
			break;
			
        case "setMaglia":
            Store.setMaglia(action.capo);
            break;
            
        case "setPantalone":
            Store.setPantaloni(action.capo);
            break;
        
        case "setScarpa":
            Store.setScarpa(action.capo);
            break;
        
        case "toogleOcchiali":
            Store.setOcchiali(action.show);
            break;
            
        case "upload":
            Store.uploadConfig();
            break;
        
        case "download":
            Store.downloadConfig();
            break;
        
        case "next":
            Store.next();
            break;
        
        case "delete":
            Store.deleteConfig();
            break;
		default:
			break;
    };
});

var Store = _.extend({
    getData: function() {
       return data;
    },
    getCurrent: function() {
        return currentConfig;
    },
    getConfigs: function(){
        return configs;
    },
	toBoolean: function(x) {
		if (x=="true")
			return true;
		if (x=="false")
			return false;
		return x;
	},
	maglieLoaded: function(maglie){
		data.maglie = maglie;
		this.emit("Change");
	},
    pantaloniLoaded: function(pantaloni){
		data.pantaloni = pantaloni;
		this.emit("Change");
	},
    scarpeLoaded: function(scarpe){
		data.scarpe = scarpe;
		this.emit("Change");
	},
    setMaglia: function(capo){
        currentConfig.maglia = capo;
        this.emit("Change");
    },
    setPantaloni: function(capo){
        currentConfig.pantalone = capo;
        this.emit("Change");
    },
    setScarpa: function(capo){
        currentConfig.scarpa = capo;
        this.emit("Change");
    },
    setOcchiali: function(show){
        if (show != undefined)
            currentConfig.occhiali = show;
        else
            currentConfig.occhiali = !currentConfig.occhiali;
        this.emit("Change");
    },
    uploadConfig: function(){
        var handler = $.ajax({
			data: currentConfig,
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
    },
    downloadConfig: function(){
        var requestConfig = $.get('http://localhost:3000/react/manichinofy/config', function (result){
            configs = result;
            currentConfig = configs[0];
            currentConfig.occhiali = this.toBoolean(configs[0].occhiali);
            selected = 0;
            console.log("get ok");
            this.emit("Change");
        }.bind(this)).fail(function(res){
            console.log(res.statusText);
            if (res.status==404)
                alert("Nessuna configurazione presente sul server");
        });       
    },
    next: function(){
        selected++;
        if (configs.length <= selected)
            selected = 0;
        currentConfig = configs[selected];
        currentConfig.occhiali = this.toBoolean(configs[selected].occhiali);
        this.emit("Change");
    },
    deleteConfig: function(){
        var handler = $.ajax({
			url: 'http://localhost:3000/react/manichinofy/config',
			type: 'DELETE'
        });
		handler.done(function(res){
            console.log("delete ok");
            configs = [];
            currentConfig = {"maglia": "", "pantalone": "", "scarpa": "", "occhiali": false};
            selected = -1;
            this.emit("Change");
		}.bind(this)).fail(function(res){
            console.log(res.statusText);
        });  
    },
    addChangeListener: function(callback) {
        this.on("Change", callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener("Change", callback);
    }
}, EventEmitter.prototype);

module.exports = Store;