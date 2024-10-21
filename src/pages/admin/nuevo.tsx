// src/pages/admin/nuevo.tsx
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography } from '@mui/material';
import api from '../../utils/axios';
import { useRouter } from 'next/router';
import withAuth from '../../components/withAuth';

interface ProductoFormInputs {
  nombre: string;
  descripcion: string;
  precio: string;
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
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Nuevo Producto
      </Typography>
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
          type="text"
          fullWidth
          margin="normal"
          {...register('precio', { required: 'El precio es obligatorio'})}
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
        <Button type="submit" variant="contained" color="primary">
          Crear
        </Button>
      </form>
    </Container>
  );
}

export default withAuth(NuevoProducto);
