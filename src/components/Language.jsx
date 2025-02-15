export default function Language(props) {
  
  let killed = props.killed
  let style ={};
  

 

    switch (props.language) {
      case 'HTML':
        style = {
        backgroundColor: '#E2680F',
        color: '#F9F4DA',
        }
        break;
      
        case 'CSS':
          style = {
          backgroundColor: '#328AF1',
          color: '#F9F4DA',
          }
          break;
      
      case 'Javascript':
        style = {
        backgroundColor: '#F4EB13',
        color: '#1E1E1E',
        }
        break;
      
      case 'React':
        style = {
        backgroundColor: '#2ED3E9',
        color: '#1E1E1E',
        }
        break;
      
      case 'TypeScript':
        style = {
        backgroundColor: '#298EC6',
        color: '#F9F4DA',
        }
        break;
      
      case 'Node.js':
        style = {
        backgroundColor: '#599137',
        color: '#F9F4DA',
        }
        break;
      
      case 'Python':
        style = {
          backgroundColor: '#FFD742' ,
          color: '#000000'
        }
        break;

      case 'Ruby':
        style = {
          backgroundColor: '#D02B2B',
        }
        break;

      case 'Assembly':
        style = {
        backgroundColor: '#2D519F',
        color: ''
        }
        break;

        
      }
    
    const styleKilled = {...style, opacity: 0.5};
    
    return(
      <div className="killed">
        <li style={!killed?style:styleKilled}>{props.language}</li>
        {killed?<p className="dead">💀</p>:null}
      </div>
    )
  }
