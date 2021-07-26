import moment from "moment";
import Link from "next/link";
import React from "react";
import { Table } from "react-bootstrap";
import { Exam } from "../../../model/Exam";

export default function ExamInfo(props: { exam: Exam }) {
  return (
    <>
      <Table striped bordered hover width="80%">
        <tbody>
          <tr>
            <td>title</td>
            <td>{props.exam.title}</td>
          </tr>
          <tr>
            <td>start time</td>
            <td>{moment(props.exam.startTime).format("YYYY-MM-DD HH:mm:ss")}</td>
          </tr>
          <tr>
            <td>duration</td>
            <td>{props.exam.duration} minutes</td>
          </tr>
          <tr>
            <td>max mark</td>
            <td>{props.exam.mark}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
