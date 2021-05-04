import Link from "next/link";
import { Card } from "react-bootstrap";

interface ExamCardProps {
    id: string,
    title: string,
    startDate: Date,
    endDate: Date,
    mark: number
}

const ExamCard: React.FC<ExamCardProps> = ({ id, title, startDate, endDate, mark }) => {
    return (
        <Link href={`/student/examination/form_viewer/${id}`}>
            <Card>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Body>
                    <strong>Starting:</strong>{startDate.toString().split(' GMT')[0]}
                    <strong>Ending:</strong>{endDate.toString().split(' GMT')[0]}
                    <strong>Mark:</strong>{mark}
                </Card.Body>
            </Card></Link>);
}

export default ExamCard;