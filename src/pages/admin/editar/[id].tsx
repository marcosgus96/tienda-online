// src/pages/admin/editar/[id].tsx
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography } from '@mui/material';
import api from '../../../utils/axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import withAuth from '../../../components/withAuth';

interface ProductoFormInputs {
  nombre: string;
  descripcion: string;
  precio: string; // Cambiado a string
  imagen: string;
  stock: number;
  categoriaId: number;
}

function EditarProducto() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductoFormInputs>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchProducto = async () => {
        try {
          const response = await api.get(`/productos/${id}`);
          const producto = response.data;

          // Establecer los valores en el formulario
          setValue('nombre', producto.nombre);
          setValue('descripcion', producto.descripcion);
          setValue('precio', producto.precio.toString()); // Asegurarse de que es string
          setValue('imagen', producto.imagen);
          setValue('stock', producto.stock);
          setValue('categoriaId', producto.categoriaId);
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

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Editar Producto
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
          type="text" // Cambiado a texto
          fullWidth
          margin="normal"
          {...register('precio', { required: 'El precio es obligatorio' })}
          error={Boolean(errors.precio)}
          helperText={errors.precio?.message}
        />
        <TextField
          label="Imagen (URL)"
          fullWidth
          margin="normal"
          {...register('imagen')}
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
        <Button type="submit" variant="contained" color="primary">
          Actualizar
        </Button>
      </form>
    </Container>
  );
}

export default withAuth(EditarProducto);

