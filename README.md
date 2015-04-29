# HTML5-Speak-Easy
##A Web Speech API Speech Synthesis (Text to Speech) Wrapper

So you want to start using the HTML5 Speech Synthesis API, but you're having problems. You've found out chrome won't play text longer than a certain size.

This aims to solve that problem. Text is split into as large of chunks as possible, looking for .'s, !'s and ?'s. Methods to pause, play, stop and change settings are provided as well. At the moment, settings only take place when the next chunk starts.

###Usage

####TLDR
```
speaker.text("Text to play!");
speaker.settings({
  rate: 1.5,
  pitch: 0.8
});
speaker.play();
speaker.pause();
speaker.resume();
speaker.stop();
```

####Domready isn't enough

It's important to realize that SpeechSynthesis API is not always available when the DOM is ready. If you're going to be changing the voice or playing some text when the page loads, you must add an event listener to ```window.speechSynthesis.onvoiceschanged``` like so:
```
window.speechSynthesis.onvoiceschanged = function(){
  speaker.voice("Daniel"); // Daniel is the best voice.
  speaker.play();
};
```

####Full API

* ```text(textToPlay)```: sets the text to be played. If you switch texts while one text is already playing, you'll need to wait until it finishes or stop and start it for the new text to take effect.
* ```settings({rate: integer, voice: <an object from speechSynthesis.getVoices()>, volume: integer, pitch: integer})```: Settings will only take effect on the start of the next chunk (usually about a sentence).
* ```defaultSettings()```
* ```pause()```
* ```resume()```
* ```stop()```
* ```voice(string name, string language)```: for example, voice("Bruce", "en-US"). This searches speechSynthesis.getVoices() for a voice that matches the parameters and assigns it to settings.voice if it finds one.
* ```pitch(integer)```
* ```increaseRate()```
* ```decreaseRate()```

All functions return the API object to allow chaining, like:

```
speaker
  .text("Just what the hell do you think you're doing?")
  .voice("Bruce","en-US")
  .increaseRate()
  .speak();
```

### License
MIT
