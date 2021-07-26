import Link from "next/link";
import React from "react";

function ExamInfo(props: { id: string }) {
    return (
      <>
        <div
          className="position-sticky bg-primary d-flex justify-content-center"
          style={{ top: 0, zIndex: 1000 }}
        >
          <h1 style={{ color: "white" }}>exam info</h1>
        </div>
        <div
          className="d-flex justify-content-center my-5"
          style={{ width: "100%", height: "60vh", alignItems: "center" }}
        >
          <div>
            <table className="table">
              <tr>
                <td>exam duration</td>
                <td>08:20</td>
              </tr>
              <tr>
                <td>course</td>
                <td>the name </td>
              </tr>
              <tr>
                <td>professor</td>
                <td>someone</td>
              </tr>
            </table>
            <Link href="/examination/authentication/1" >
              <a className="d-flex justify-content-center">
                <button className="btn btn-primary ">
                  start authentication
                </button>
              </a>
            </Link>
          </div>
        </div>
      </>
    );
  }
  