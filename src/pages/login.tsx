// src/pages/login.tsx
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography } from '@mui/material';
import api from '../utils/axios';
import { useRouter } from 'next/router';

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await api.post('/auth/login', data);
      // Guardar el token en el almacenamiento local o en cookies
      localStorage.setItem('token', response.data.access_token);
      // Redirigir al panel de administración
      router.push('/admin');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Manejar errores, mostrar mensajes al usuario, etc.
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Nombre de usuario"
          fullWidth
          margin="normal"
          {...register('username', { required: 'El nombre de usuario es obligatorio' })}
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          {...register('password', { required: 'La contraseña es obligatoria' })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" color="primary">
          Ingresar
        </Button>
      </form>
    </Container>
  );
}
