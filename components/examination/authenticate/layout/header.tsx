export default function PageHeader(props:{centerTitle?:string ,children?}){
    
    // TODO color from variables
    return(<>
        <div className="position-sticky bg-primary d-flex justify-content-center" style={{top:0,zIndex:1000}}>
        {props.children}
        {props.centerTitle && <h1 style={{color: "white"}}>{props.centerTitle}</h1>}
        
    </div>
    </>
    )
}