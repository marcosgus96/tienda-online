// src/pages/admin/nuevo.tsx
import { useForm, Controller } from 'react-hook-form';
import { Container, TextField, Button, Typography, Grid, Box, Paper, Input } from '@mui/material';
import api from '../../utils/axios';
import { useRouter } from 'next/router';
import withAuth from '../../components/withAuth';
import axios from 'axios';

interface ProductoFormInputs {
  nombre: string;
  descripcion: string;
  precio: number;
  categoriaId: number;
  stock: number;
  imagen: FileList; // Para manejar archivos
}

function NuevoProducto() {
  const { control, register, handleSubmit, formState: { errors } } = useForm<ProductoFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: ProductoFormInputs) => {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('descripcion', data.descripcion);
    formData.append('precio', data.precio.toString());
    formData.append('categoriaId', data.categoriaId.toString());
    formData.append('stock', data.stock.toString());
  
    if (data.imagen && data.imagen.length > 0) {
      formData.append('imagen', data.imagen[0]); // Archivo de imagen
    }

    // Imprimir los datos para ver qué se está enviando
    const entriesArray = Array.from(formData.entries());
    entriesArray.forEach(([key, value]) => {
      console.log(key, value);
    });
  
    try {
      await api.post('/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/admin');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error al crear producto:', error.response?.data);
      } else {
        console.error('Error al crear producto:', error);
      }
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
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <TextField
          label="Nombre"
          fullWidth
          margin="normal"
          {...register('nombre', { required: 'El nombre es obligatorio' })}
          error={Boolean(errors.nombre)}
          helperText={errors.nombre?.message}
        />
        <Controller
                name="descripcion"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Descripción"
                    fullWidth
                    margin="normal"
                    multiline
                    inputProps={{ 'data-cy': 'input-descripcion' }}
                    {...field}
                  />
                )}
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
          label="Categoría ID"
          type="number"
          fullWidth
          margin="normal"
          {...register('categoriaId', { required: 'La categoría es obligatoria', valueAsNumber: true })}
          error={Boolean(errors.categoriaId)}
          helperText={errors.categoriaId?.message}
        />
        <Input
          type="file"
          inputProps={{ accept: 'image/*' }}
          {...register('imagen')}
        />
        <Button type="submit" variant="contained" color="primary">
          Crear
        </Button>
      </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withAuth(NuevoProducto);
