// src/pages/productos/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { Container, Typography, Button, Grid, Box } from '@mui/material';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  color?: string;
}

export default function ProductoDetalle() {
  const router = useRouter();
  const { id } = router.query;
  const [producto, setProducto] = useState<Producto | null>(null);
  const imagenUrl = producto?.imagen
  ? `http://localhost:3000/uploads/${producto.imagen}`
  : '/images/default-product.png';

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
    <Container sx={{ padding: '40px 0' }} data-cy="producto-detalle">
      <Grid container spacing={4}>
        {/* Imagen del producto */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img   
            src={imagenUrl}
            alt={producto.nombre}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          </Box>
        </Grid>

        {/* Detalles del producto */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {producto.nombre}
          </Typography>
          
          {/* Precio y entrega */}
          <Typography variant="h5" sx={{ color: '#333', fontWeight: 'bold', marginBottom: '10px' }}>
            {producto.precio} €
          </Typography>
          <Typography variant="body2" sx={{ color: '#4caf50', marginBottom: '20px' }}>
            Entrega y devolución gratis
          </Typography>

          {/* Color */}
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            COLOR: <span style={{ fontWeight: 'normal' }}>{producto.color || 'No especificado'}</span>
          </Typography>

          {/* Botón añadir al carrito */}
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: '20px', padding: '10px 30px', fontWeight: 'bold', fontSize: '16px' }}
          >
            AÑADIR A MI BOLSA
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

