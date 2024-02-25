import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { useState } from "react";

import { addUser } from "../service/api";
import { useNavigate } from "react-router-dom";

const Container = styled(FormGroup)`
  margin: 5% auto 0 auto;
  width: 40%;
`;
const Field = styled(FormControl)`
  margin: 10px 0;
`;

const UserInitValue = {
  name: "",
  username: "",
  email: "",
  phone: "",
};

const AddUser = () => {
  const [user, setUser] = useState(UserInitValue);
  const navigate = useNavigate();
  const onValueChange = (e) => {
    console.log(e.target.name, e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {
    await addUser(user);
    navigate("/allusers");
  };

  return (
    <Container>
      <Typography variant="h3">Add User</Typography>
      <Field>
        <InputLabel>Name</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="name" />
      </Field>
      <Field>
        <InputLabel>Username</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="username" />
      </Field>
      <Field>
        <InputLabel>Email</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="email" />
      </Field>
      <Field>
        <InputLabel>Phone</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="phone" />
      </Field>
      <Field>
        <Button variant="contained" onClick={() => addUserDetails()}>
          Add User
        </Button>
      </Field>
    </Container>
  );
};

export default AddUser;
