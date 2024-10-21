// src/pages/admin/editar/[id].tsx
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography, Grid, Box, Paper } from '@mui/material';
import api from '../../../utils/axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import withAuth from '../../../components/withAuth';

interface ProductoFormInputs {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
  categoriaId: number;
}

function EditarProducto() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductoFormInputs>();
  const router = useRouter();
  const { id } = router.query;
  const [loaded, setLoaded] = useState(false);  // Nuevo estado para indicar si los datos han sido cargados

  useEffect(() => {
    if (id) {
      const fetchProducto = async () => {
        try {
          const response = await api.get(`/productos/${id}`);
          const producto = response.data;

          // Establecer los valores en el formulario
          setValue('nombre', producto.nombre);
          setValue('descripcion', producto.descripcion);
          setValue('precio', producto.precio);
          setValue('imagen', producto.imagen);
          setValue('stock', producto.stock);
          setValue('categoriaId', producto.categoriaId);
          setLoaded(true); // Los datos se han cargado
        } catch (error) {
          console.error('Error al obtener producto:', error);
        }
      };

      fetchProducto();
    }
  }, [id, setValue]);

  const onSubmit = async (data: ProductoFormInputs) => {
    try {
      await api.put(`/productos/${id}`, data);
      router.push('/admin');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  if (!loaded) {
    return <div>Cargando...</div>; // Muestra algo hasta que los datos se carguen
  }

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
              Editar Producto
            </Typography>
            <Typography variant="body1">
              Actualiza la información del producto utilizando el formulario a la derecha.
            </Typography>
          </Paper>
        </Grid>

        {/* Formulario de edición de producto */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Nombre"
                fullWidth
                margin="normal"
                defaultValue={''} // Usar defaultValue para controlar correctamente el renderizado
                {...register('nombre', { required: 'El nombre es obligatorio' })}
                error={Boolean(errors.nombre)}
                helperText={errors.nombre?.message}
              />
              <TextField
                label="Descripción"
                fullWidth
                margin="normal"
                defaultValue={''} // Default value para evitar el solapamiento
                {...register('descripcion')}
              />
              <TextField
                label="Precio"
                type="number"
                fullWidth
                margin="normal"
                defaultValue={0}
                {...register('precio', { required: 'El precio es obligatorio', valueAsNumber: true })}
                error={Boolean(errors.precio)}
                helperText={errors.precio?.message}
              />
              <TextField
                label="Imagen (URL)"
                fullWidth
                margin="normal"
                defaultValue={''}
                {...register('imagen')}
              />
              <TextField
                label="Stock"
                type="number"
                fullWidth
                margin="normal"
                defaultValue={0}
                {...register('stock', { required: 'El stock es obligatorio', valueAsNumber: true })}
                error={Boolean(errors.stock)}
                helperText={errors.stock?.message}
              />
              <TextField
                label="Categoría ID"
                type="number"
                fullWidth
                margin="normal"
                defaultValue={0}
                {...register('categoriaId', { required: 'La categoría es obligatoria', valueAsNumber: true })}
                error={Boolean(errors.categoriaId)}
                helperText={errors.categoriaId?.message}
              />
              <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                <Button type="submit" variant="contained" color="primary" sx={{ padding: '10px 40px' }}>
                  Actualizar
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withAuth(EditarProducto);


