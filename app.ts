
import express from 'express';
import staffRouter from './src/routers/staffRouter';
import userRouter from './src/routers/userRouter';
import patientRouter from './src/routers/patientRouter';
import { loginUser } from './src/controllers/loginController';

const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());


app.use('/staff', staffRouter);
app.use('/user',userRouter );
app.use('/patient', patientRouter);
app.use('/login', loginUser);


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});