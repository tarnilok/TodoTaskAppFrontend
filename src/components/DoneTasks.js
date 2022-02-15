import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from "@mui/material";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import DoneIcon from "@mui/icons-material/Done";

const DoneTasks = ({ group, tasksData, UpdateAppTodo, SetCatcherHandler }) => {
  return tasksData[0].data?.filter((task) => task.task_group === group.name).some((item) => item.is_completed) ? (
    <Box component="form" onSubmit={(e) => UpdateAppTodo(e)} sx={{ m: 4, p: 2, backgroundImage: "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)" }}>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ color: "red", flex: 1, fontSize: "1.5rem", textAlign: "center" }}>
          <code>{`──── <${group?.name}/DoneTasks> ────`}</code>
        </Typography>
        <Button type="submit" align="right">
          <DoneIcon />
          SAVE
        </Button>
      </Box>
      <hr />
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundImage: "linear-gradient(to top, #a7a6cb 0%, #8989ba 52%, #8989ba 100%)", position: "sticky", top: 0, zIndex: 100 }}>
            <TableRow>
              <TableCell align="left" sx={{ fontSize: "1.2rem" }}>
                <b>
                  <code>Title</code>
                </b>
              </TableCell>
              <TableCell align="left" sx={{ fontSize: "1.2rem" }}>
                <b>
                  <code>Appointed</code>
                </b>
              </TableCell>
              <TableCell align="left" sx={{ fontSize: "1.2rem" }}>
                <b>
                  <code>DueDate</code>
                </b>
              </TableCell>
              <TableCell align="left" sx={{ fontSize: "1.2rem" }}>
                <b>
                  <code>IsDone</code>
                </b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasksData[0].data?.map((task) => {
              if (task.is_completed === true && task.task_group === group.name) {
                return (
                  <TableRow key={task.id} >
                    <TableCell sx={{ m: 0, p: 1 }}>
                      <TextField value={task.title} size="small" multiline InputProps={{ disableUnderline: true }} name="title" variant="standard" sx={{ width: "100px", m: 1 }} />
                    </TableCell>
                    <TableCell sx={{ m: 0, p: 1 }}>
                      <TextField value={task.user} size="small" InputProps={{ disableUnderline: true }} name="user" variant="standard" sx={{ width: "100px", m: 1 }} />
                    </TableCell>
                    <TableCell align="left" sx={{ m: 0, p: 1 }}>
                      <input type="date" style={{ height: "35px", fontSize: "16px", textAlign: "center", width: "142px", borderWidth: "0", outline: 0 }} name="due_date" value={task.due_date} readOnly />
                    </TableCell>
                    <TableCell align="left" sx={{ m: 0, p: 1 }}>
                      <Checkbox name="is_completed" sx={{ mx: 2 }} checked={task.is_completed ? true : false} onChange={(e) => SetCatcherHandler(e, task.id)} />
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  ) : null;
};
export default DoneTasks;
