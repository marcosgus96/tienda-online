// src/pages/productos/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { Container, Typography, Button } from '@mui/material';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export default function ProductoDetalle() {
  const router = useRouter();
  const { id } = router.query;
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProducto = async () => {
        try {
          const response = await api.get(`/productos/${id}`);
          setProducto(response.data);
        } catch (error) {
          console.error('Error al obtener el producto:', error);
        }
      };

      fetchProducto();
    }
  }, [id]);

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {producto.nombre}
      </Typography>
      <img
        src={producto.imagen || '/images/default-product.png'}
        alt={producto.nombre}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <Typography variant="h6" color="primary">
        ${producto.precio}
      </Typography>
      <Typography variant="body1">{producto.descripcion}</Typography>
      <Button variant="contained" color="primary">
        Añadir al carrito
      </Button>
    </Container>
  );
}
