export enum IncidentType {
    different_face = "different_face",
    forbidden_object = "forbidden_object",
}

export interface IncidentInterface {
    type?: string,
    startingFrom: number
    endingAt: number
    relatedMedia?: string,
    incidentType: IncidentType
}