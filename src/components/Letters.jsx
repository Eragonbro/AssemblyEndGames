export default function Letters(props) {

    


    return(
        <ul className='letters' onClick={props.onClick}>
            {props.letters}
        </ul>
    )
}