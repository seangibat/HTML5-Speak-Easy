(function(){
    'use strict';
    var text, utterance, API = {};
    var settings = {
        rate: 1,
        volume: 1,
        pitch: 1
    };

    API.text = function(str){
        if (!str) return text;
        text = str.replace(/\n/g," ").trim();
        return API;
    }

    API.settings = function(set){
        if (!set) return settings;

        settings.voice = set.voice || settings.voice;
        settings.rate = set.rate || settings.rate;
        settings.pitch = set.pitch || settings.pitch;
        settings.volume = set.volume || settings.volume;

        return API;
    }

    API.defaultSettings = function(){
        settings = {
            rate: 1,
            volume: 1,
            pitch: 1
        };
    }

    API.speak =  function(){
        var createNewChunkUtterance = function(){
            var chunk = _text.match(/(^.{1,300}[!.?])|(^.{1,300}\s)/g);
            if (!chunk) return null;
            chunk = chunk[0];
            _text = _text.substring(chunk.length);
            utterance = new SpeechSynthesisUtterance();
            utterance.text = chunk;
            utterance.voice = settings.voice;
            utterance.rate = settings.rate;
            utterance.pitch = settings.pitch;
            utterance.volume = settings.volume;
            return true;
        }

        var play = function(){
            if (utterance) API.stop();
            if (!createNewChunkUtterance()) return API.stop();

            utterance.onend = function(){
                console.log("END OF UTT");
                play();
            };

            //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
            console.log(utterance); 

            //placing the speak invocation inside a callback fixes ordering and onend issues.
            setTimeout(function () {
                speechSynthesis.speak(utterance);
            }, 0);
        }

        var _text = text;

        API.stop();
        play();
        return API;
    }

    API.pause = function(){
        speechSynthesis.pause();
        return API;
    }

    API.resume = function(){
        speechSynthesis.resume();
        return API;
    }

    API.stop = function(){
        if (utterance) {
            utterance.onend = null;
            utterance = null;
        }
        speechSynthesis.cancel();
        return API;
    }

    API.voice = function(name, lang){
        var v = speechSynthesis.getVoices().filter(function(voice) { 
            return (voice.name.indexOf(name) >= 0) && (lang ? (voice.lang.indexOf(lang) >= 0) : true)
        })[0];
        console.log(v);
        if (v) settings.voice = v;
        return API;
    }

    API.pitch = function(n){
        settings.pitch = n;
        return API;
    }

    API.increaseRate = function(by){
        var increaseBy = by || 0.25;
        settings.rate += increaseBy;
        console.log(settings.rate);
        return API;
    }

    API.decreaseRate = function(by){
        var decreaseBy = by || 0.25;
        settings.rate -= decreaseBy;
        return API;
    }

    window.speaker = API;
})();