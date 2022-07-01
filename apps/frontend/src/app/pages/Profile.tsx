import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

const Profile = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    logout,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = 'lumn.eu.auth0.com';

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user',
        });

        console.log(accessToken);

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e: any) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      {isAuthenticated && (
        <Card>
          <CardMedia
            component="img"
            height="140"
            image={user?.picture}
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {user?.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {user?.email}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </Button>
          </CardActions>
        </Card>
      )}
      {!isAuthenticated && (
        <Button onClick={() => loginWithRedirect()}>Log In</Button>
      )}
    </Box>
  );
};

export default Profile;
