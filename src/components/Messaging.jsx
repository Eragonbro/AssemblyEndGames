import React from 'react'
export default function Messaging(props) {
    
    let message = null;
    let style;
    const languagesState = props.languagesState
    
    const killedLanguages = languagesState
                                            .filter(item => item.killed)
                                            .map(item => item.language);

    console.log('killed languages are:',killedLanguages);

    function joinMiddleValues(arr, separator = ", ") {
        if (arr.length <= 2) return ""; // Return empty string if no middle values exist
        return arr.slice(1, -1).join(separator);
    }

    let killedLanguagesString = joinMiddleValues(killedLanguages);

    
    const getFarewell = () =>{
        if (killedLanguages.length === 1) {
            return `Farewell ${killedLanguages[0]} 🫡`;
        } else if (killedLanguages.length === 2 ) {
            return `Farewell ${killedLanguages[0]} & ${killedLanguages[1]}🫡`;
        } else if (killedLanguages.length > 2 ) {
            return `Farewell ${killedLanguages[0]}, ${killedLanguagesString} & ${killedLanguages[killedLanguages.length - 1]}🫡`;
        }
    }
   console.log("killed languages string is: ", killedLanguagesString)

    if(props.state === 'notStarted') {
        message = <div><p>You can start.</p><p>You will do it 😉💪</p></div>;
        style ={backgroundColor : '#323232',
                color:'#F9F4DA'
        }} else if(props.state === 'playing') {
        message = <div><p>Go baby</p><p>You will do it 😉💪</p></div>;
        style ={backgroundColor : '#323792',
                color:'#F9F4DA'
        }
    } else if (props.state === 'killed') {
        message = <div><p>    
            {getFarewell()}
        </p></div>;
        style ={backgroundColor : '#7A5EA7',
            color:'#F9F4DA'}
    } else if(props.state === 'won') {
        message = <div><p>You WIN!</p><p>Well done! 🎉</p></div> ;
        style ={backgroundColor : '#10A95B',
                color:'#F9F4DA'
        }
    } else if(props.state === 'lost') {
        message = <div><p>You lost!</p><p>Better start learning Assembly 😭</p></div> ;
        style ={backgroundColor : '#BA2A2A',
            color:'#F9F4DA'
        }
    } 
        

    return(
        <div style={style} className='messaging'>
          {message }
        </div>
    )    
        
}