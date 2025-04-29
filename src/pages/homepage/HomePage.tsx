import { Container, Typography, Card, CardMedia, CardContent, CardActionArea } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom'

const HomePage: React.FC = () => {
  const navigate = useNavigate()

  const cards = [
    { src: '/pictures/starryai_eqs5o.png', title: 'Explore Trips', link: '/trips' },
    { src: '/pictures/starryai_k777l.png', title: 'Discover Destinations', link: '/destinations' },
    { src: '/pictures/starryai_mikgm.png', title: 'Plan Your Trips', link: '/my-trips' },
    { src: '/pictures/starryai_oke1e.png', title: 'Find Activities', link: '/activities' }
  ]

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to the Travel Planner
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        Discover, explore, and organize your dream travels in one place.
      </Typography>

      <Grid container spacing={4}>
        {cards.map(({ src, title, link }, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardActionArea onClick={() => navigate(link)}>
                <CardMedia
                  component="img"
                  height="180"
                  image={src}
                  alt={title}
                />
                <CardContent>
                  <Typography variant="h6" align="center">{title}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default HomePage
