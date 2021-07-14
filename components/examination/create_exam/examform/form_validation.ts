export function validate_end_time(start_time:number,end_time:number,target_element):boolean{
    
    if(end_time < start_time){
        target_element.setCustomValidity("end date cannot be before start date")
        console.debug(`startTime ${new Date(start_time)}`)
        console.debug(`endTime ${new Date(end_time)}`)
        return false;
    } else {
        target_element.setCustomValidity("")
        return true;
    }
}