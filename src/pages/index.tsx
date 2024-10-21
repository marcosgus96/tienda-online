// src/pages/index.tsx
import { useEffect, useState } from 'react';
import api from '../utils/axios';
import { Container, Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get('/productos');
        console.log('Respuesta de la API:', response);
        console.log('Datos recibidos:', response.data);
        setProductos(response.data.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Productos
      </Typography>
      <Grid container spacing={3}>
        {productos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <ProductCard producto={producto} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
