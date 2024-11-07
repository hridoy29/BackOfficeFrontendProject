import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import CourseTableRow from "./CourseTableRow";
import { useState } from "react";
import { useCourses } from "@/ApiProviders/CourseProvider";
// import { useNewsLetters } from "@/ApiProviders/NewslettersProvider";

const CoursesTable = () => {
  const { courses, error, loading } = useCourses();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const { newsLetters } = useNewsLetters();
  // console.log(newsLetters);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="shadow-xl overflow-hidden">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ bgcolor: "#eef1f8" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.6rem" }}>
                Title
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.6rem" }}>
                Author
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.6rem" }}>
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.6rem" }}>
                Hours
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "1.6rem" }}
                align="right"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((course) => (
                <CourseTableRow key={course.id} course={course} />
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={courses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            "& .MuiTablePagination-toolbar": {
              fontSize: "1.2rem",
            },
            "& .MuiTablePagination-selectLabel": {
              fontSize: "1.2rem",
            },
            "& .MuiTablePagination-input": {
              fontSize: "1.2rem",
            },
            "& .MuiTablePagination-displayedRows": {
              fontSize: "1.2rem",
            },
          }}
        />
      </TableContainer>
    </div>
  );
};

export default CoursesTable;
