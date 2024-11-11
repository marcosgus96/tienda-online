// src/pages/login.tsx
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { styled } from '@mui/system';
import api from '../utils/axios';
import { useRouter } from 'next/router';

interface LoginFormInputs {
  username: string;
  password: string;
}

// Estilos personalizados
const FormContainer = styled(Container)({
  backgroundColor: '#333', // color oscuro del fondo del formulario
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // sombra del formulario
  textAlign: 'center',
  width: '400px',
});

const StyledTextField = styled(TextField)({
  '& label': {
    color: '#FFF', // color del texto del label
  },
  '& input': {
    color: '#FFF', // color del texto dentro del input
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#555', // color del borde del input
    },
    '&:hover fieldset': {
      borderColor: '#FFF', // color del borde cuando el mouse está sobre el input
    },
    '&.Mui-focused fieldset': {
      borderColor: '#007bff', // color del borde cuando el input está enfocado
    },
  },
  marginBottom: '1rem',
});

const StyledButton = styled(Button)({
  backgroundColor: '#007bff', // color del botón
  color: '#FFF', // color del texto del botón
  padding: '0.8rem',
  marginBottom: '1rem',
  '&:hover': {
    backgroundColor: '#0056b3', // color al pasar el mouse sobre el botón
  },
});

const LoginBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // para centrar el formulario verticalmente
  backgroundColor: '#0d3a5c', // fondo de la página similar al de la imagen
});

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await api.post('/auth/login', data);
      console.log('Respuesta del login:', response); // Verifica la respuesta
      localStorage.setItem('token', response.data.access_token);
      router.push('/admin');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <LoginBox>
    <FormContainer>
      <Typography variant="h5" color="white" gutterBottom>
        Formulario Login - Tienda Online
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          label="Usuario"
          fullWidth
          {...register('username', { required: 'El nombre de usuario es obligatorio' })}
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
        />
        <StyledTextField
          label="Contraseña"
          type="password"
          fullWidth
          {...register('password', { required: 'La contraseña es obligatoria' })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />
        <StyledButton type="submit" fullWidth>
          Ingresar
        </StyledButton>
      </form>
      <Link href="#" color="inherit" underline="none" sx={{ color: '#FFF', display: 'block', marginTop: '1rem' }}>
        ¿Olvidó Contraseña?
      </Link>
    </FormContainer>
  </LoginBox>
  );
}
