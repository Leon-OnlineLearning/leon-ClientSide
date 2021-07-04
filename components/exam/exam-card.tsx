import Link from "next/link";
import { Card } from "react-bootstrap";

interface ExamCardProps {
    id: string,
    title: string,
    startTime: Date,
    endTime: Date,
    mark: number
}

const ExamCard: React.FC<ExamCardProps> = ({ id, title, startTime: startTime, endTime: endDate, mark }) => {
    return (
        <Link href={`/student/examination/form_viewer/${id}`}>
            <Card className="p-3 m-3">
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Body>
                    <div>
                        <strong>Starting:</strong>{startTime.toString().split(' GMT')[0]}
                    </div>
                    <div>
                        <strong>Ending:</strong>{endDate.toString().split(' GMT')[0]}
                    </div>
                    <div>
                        <strong>Mark:</strong>{mark}
                    </div>
                </Card.Body>
            </Card></Link>);
}

export default ExamCard;