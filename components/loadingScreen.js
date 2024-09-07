import {Mosaic} from 'react-loading-indicators';
import "../styling/loadingScreen.css"

export default function LoadingScreen() {

    return (
    <div className='loading-container'>
        <Mosaic 
        text="My Footy App" 
        color="white" 
        style={{fontSize: '60px', fontStyle: 'oblique'}}/>
    </div>
    )
}