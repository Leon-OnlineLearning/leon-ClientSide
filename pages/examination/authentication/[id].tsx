import CameraView from '../../../components/authenticate/CameraView';
import Link from 'next/link'



export default function Authenticate(){
    return (
    <>
    <div className="position-sticky bg-primary d-flex justify-content-center" style={{top:0,zIndex:1000}}>
        <h1 style={{color: "white"}}>authenticate</h1>
    </div>
 
    <div className="d-flex justify-content-center my-3" style={{width: "100%" , alignItems: "center",}} >
        <CameraView />
    </div>
    <div className="d-flex justify-content-center" style={{width: "100%"}}>
    <Link href="/examination/form_viewer/1">
          <a>
          <button className="btn btn-primary mx-auto">authenticate</button>
          </a>
        
        </Link>
    </div>
    </>
    
    
    
    )
}