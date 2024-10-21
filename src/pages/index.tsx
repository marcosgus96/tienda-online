// src/pages/index.tsx
import { useEffect, useState } from 'react';
import api from '../utils/axios';
import { Container, Grid, Typography, MenuItem, Select, Box, Slider, Button, TextField, Pagination } from '@mui/material';
import ProductCard from '../components/ProductCard';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

interface Categoria {
  id: number;
  nombre: string;
}

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filtros, setFiltros] = useState({
    categoriaId: '',
    nombre: '',
    precioMin: 0,
    precioMax: 1000,
    pagina: 1,
    limite: 10,
  });
  const [totalPaginas, setTotalPaginas] = useState(1);

  // Obtener productos y aplicar filtros
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get('/productos', { params: filtros });
        setProductos(response.data.data);
        setTotalPaginas(response.data.lastPage); // Define el número de páginas desde la respuesta de la API
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, [filtros]);

  // Obtener categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get('/categorias'); // Ajusta la ruta según tu API
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChangeFiltro = (e: any) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handlePrecioChange = (e: any, newValue: number | number[]) => {
    const [precioMin, precioMax] = newValue as number[];
    setFiltros({ ...filtros, precioMin, precioMax });
  };

  const handlePaginaChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setFiltros({ ...filtros, pagina: value });
  };

  return (
    <Container>
      {/* Filtros */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          marginBottom: '20px',
          backgroundColor: '#f8f8f8',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Select
          value={filtros.categoriaId}
          onChange={handleChangeFiltro}
          displayEmpty
          name="categoriaId"
          sx={{ minWidth: '150px' }}
        >
          <MenuItem value="">Selecciona una Categoría</MenuItem>
          {categorias.map((categoria) => (
            <MenuItem key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Buscar por nombre"
          variant="outlined"
          name="nombre"
          value={filtros.nombre}
          onChange={handleChangeFiltro}
          sx={{ minWidth: '200px' }}
        />

        <Box sx={{ width: '200px', marginLeft: '20px' }}>
          <Typography gutterBottom>Precio</Typography>
          <Slider
            value={[filtros.precioMin, filtros.precioMax]}
            onChange={handlePrecioChange}
            valueLabelDisplay="auto"
            min={0}
            max={2000}
          />
        </Box>

        <Button variant="contained" color="primary">
          Aplicar Filtros
        </Button>
      </Box>

      {/* Lista de productos */}
      <Typography variant="h4" gutterBottom>
        Productos Destacados
      </Typography>
      <Grid container spacing={3}>
        {productos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <ProductCard producto={producto} />
          </Grid>
        ))}
      </Grid>

      {/* Paginación */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={totalPaginas}
          page={filtros.pagina}
          onChange={handlePaginaChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}

