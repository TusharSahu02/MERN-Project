import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

import { updateUser, getUser } from "../service/api";
import { useNavigate, useParams } from "react-router-dom";

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

const EditUser = () => {
  const [user, setUser] = useState(UserInitValue);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUser(id);
    setUser(response.data);
  };

  const onValueChange = (e) => {
    console.log(e.target.name, e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateUserDetails = async () => {
    await updateUser(user, id);
    navigate("/allusers");
  };

  return (
    <Container>
      <Typography variant="h3">Edit User</Typography>
      <Field>
        <InputLabel>Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={user.name}
        />
      </Field>
      <Field>
        <InputLabel>Username</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="username"
          value={user.username}
        />
      </Field>
      <Field>
        <InputLabel>Email</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={user.email}
        />
      </Field>
      <Field>
        <InputLabel>Phone</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="phone"
          value={user.phone}
        />
      </Field>
      <Field>
        <Button variant="contained" onClick={() => updateUserDetails()}>
          Edit User
        </Button>
      </Field>
    </Container>
  );
};

export default EditUser;
