import React from "react";

function App({clip}) {

  const audioClips = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];

  const [volume, setVolume] = React.useState(1)

  const handlePower = () => {
    if (document.getElementById('indicator').classList.contains('slide')) {
      document.getElementById('indicator').classList.remove('slide')
      document.getElementById('indicator').innerText = 'ON'
    } else {
      document.getElementById('indicator').classList.add('slide')
      document.getElementById('indicator').innerText = 'OFF'
    }
  }
 

 

  return (
    <div id="drum-machine">
      <div id="controls">
        <div id="pad-bank">
        {audioClips.map(clip => {
        return <Pad className='drum-pad' key={clip.id} clip={clip} volume={volume} />
        })}
        </div>
        <div id="control-container">
        <div id="display" />
          <div className="slide-container">
            <label>Volume</label>
            <input 
            onChange={(e) => setVolume(e.target.value)} 
            type="range"
            step='0.01' 
            min="0" 
            max="1" 
            value={volume}
            id="slider" />
          </div>
          <p>Power</p>
          <div id="power-button">
            <div id="indicator" onClick={handlePower}>
              ON
            </div>
          </div>
        </div>
        </div>
      </div>
    
  );

}

function Pad({clip, volume}) {

  // Event handler for keypress behavior
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);

    }
  }, []);

  // Event handler for display behavior on keypress
  React.useEffect(() => {
    document.addEventListener('keydown', handleDisplay);
    return () => {
    document.removeEventListener('keydown', handleDisplay);
    }
  }, []);

  // Event handler for display behacior on click
  React.useEffect(() => {
    document.addEventListener('click', handleDisplay);
    return () => {
    document.removeEventListener('click', handleDisplay);
    }
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound()
    }
  }

  const handleDisplay = (e) => {
    if (e.keyCode === clip.keyCode) {
      document.getElementById('display').innerText = clip.id
    }
  }

  const handleDisplayOnClick = () => {
    document.getElementById('display').innerText = clip.id
  }



  const playSound = () => {
   const audioTag = document.getElementById(clip.keyTrigger);
   audioTag.volume = volume;
   audioTag.currentTime = 0;
   audioTag.play();
   
  }

  
  return (
    <div id={clip.id} onClick={() => {playSound(); handleDisplayOnClick()}} className="drum-pad">
      <audio className="clip" id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </div>
  );
}

export default App;
