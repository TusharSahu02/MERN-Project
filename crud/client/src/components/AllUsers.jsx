import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { getUsers, deleteUser } from "../service/api";
import { useEffect, useState } from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px auto 0 auto;
  border: 1px solid #ccc;
`;
const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
  };

  const deleteUserById = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Typography
        variant="h3"
        style={{
          textAlign: "center",
          marginTop: 80,
        }}
      >
        List of All users
      </Typography>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>S.no</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Edit User</TableCell>
            <TableCell>Delete User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/edit/${user._id}`}
                  >
                    <MdEdit
                      size={22}
                      style={{
                        marginRight: 4,
                      }}
                    />
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteUserById(user._id)}
                  >
                    <MdDeleteForever
                      size={22}
                      style={{
                        marginRight: 4,
                      }}
                    />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default AllUsers;
