// src/pages/admin/nuevo.tsx
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography, Grid, Box, Paper } from '@mui/material';
import api from '../../utils/axios';
import { useRouter } from 'next/router';
import withAuth from '../../components/withAuth';

interface ProductoFormInputs {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  categoriaId: number;
}

function NuevoProducto() {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductoFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: ProductoFormInputs) => {
    try {
      await api.post('/productos', data);
      router.push('/admin');
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  return (
    <Container sx={{ marginTop: '40px' }}>
      <Grid container spacing={3}>
        {/* Sección izquierda con imagen de fondo */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{
              padding: '20px',
              backgroundColor: '#3f51b5', // Color azul para el fondo
              color: '#fff',
              borderRadius: '10px',
              textAlign: 'center',
              height: '100%',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Crear Producto
            </Typography>
            <Typography variant="body1">
              Ingresa la información del nuevo producto en el formulario a la derecha.
            </Typography>
          </Paper>
        </Grid>

        {/* Formulario de creación de producto */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Nombre"
                fullWidth
                margin="normal"
                {...register('nombre', { required: 'El nombre es obligatorio' })}
                error={Boolean(errors.nombre)}
                helperText={errors.nombre?.message}
              />
              <TextField
                label="Descripción"
                fullWidth
                margin="normal"
                {...register('descripcion')}
              />
              <TextField
                label="Precio"
                type="number"
                fullWidth
                margin="normal"
                {...register('precio', { required: 'El precio es obligatorio', valueAsNumber: true })}
                error={Boolean(errors.precio)}
                helperText={errors.precio?.message}
              />
              <TextField
                label="Stock"
                type="number"
                fullWidth
                margin="normal"
                {...register('stock', { required: 'El stock es obligatorio', valueAsNumber: true })}
                error={Boolean(errors.stock)}
                helperText={errors.stock?.message}
              />
              <TextField
                label="Imagen (URL)"
                fullWidth
                margin="normal"
                {...register('imagen')}
              />
              <TextField
                label="Categoría ID"
                type="number"
                fullWidth
                margin="normal"
                {...register('categoriaId', { required: 'La categoría es obligatoria', valueAsNumber: true })}
                error={Boolean(errors.categoriaId)}
                helperText={errors.categoriaId?.message}
              />
              <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                <Button type="submit" variant="contained" color="primary" sx={{ padding: '10px 40px' }}>
                  Crear
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withAuth(NuevoProducto);

