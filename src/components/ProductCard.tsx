// src/components/ProductCard.tsx
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import Link from 'next/link';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

interface Props {
  producto: Producto;
}

export default function ProductCard({ producto }: Props) {
  return (
    <Card>
      <Link href={`/productos/${producto.id}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={producto.imagen || '/images/default-product.png'}
            alt={producto.nombre}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {producto.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {producto.descripcion}
            </Typography>
            <Typography variant="h6" color="primary">
              ${producto.precio}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
