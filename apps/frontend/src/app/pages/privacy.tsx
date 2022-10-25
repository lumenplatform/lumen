import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

export default function Privacy() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
            <Typography variant="body1"> LUMEN PRIVACY POLICY</Typography>
            <Typography variant="h5" sx={{ padding: 2 }} align="justify">
              When you use our services, you’re trusting us with your
              information. We understand this is a big responsibility and work
              hard to protect your information and put you in control.
            </Typography>
            <Typography variant="body2" sx={{ padding: 2 }} align="justify">
              This Privacy Policy is meant to help you understand what
              information we collect, why we collect it, and how you can update,
              manage, export, and delete your information. 
            </Typography>
            <Typography variant="body2" sx={{ padding: 2 }} align="justify">
              We build a range of
              services that help millions of people daily to explore and
              interact with the world in new ways. Our services include: Lumen
              apps, sites, and devices, like Search, YouTube, and Lumen Home
              Platforms like the Chrome browser and Android operating system
              Products that are integrated into third-party apps and sites, like
              ads, analytics, and embedded Lumen Maps You can use our services
              in a variety of ways to manage your privacy. For example, you can
              sign up for a Lumen Account if you want to create and manage
              content like emails and photos, or see more relevant search
              results. And you can use many Lumen services when you’re signed
              out or without creating an account at all, like searching on
              Lumen or watching YouTube videos. You can also choose to browse
              the web in a private mode, like Chrome Incognito mode. And across
              our services, you can adjust your privacy settings to control what
              we collect and how your information is used. To help explain
              things as clearly as possible, we’ve added examples, explanatory
              videos, and definitions for key terms. And if you have any
              questions about this Privacy Policy, you can contact us
            </Typography>
            <Typography variant="h5" sx={{ padding: 2 }} align="justify">
            We want you to understand the types of information we collect as you use our services
            </Typography>
            <Typography variant="body1" sx={{ padding: 2 }} align="justify">
            We collect information to provide better services to all our users — from figuring out basic stuff like which language you speak, to more complex things like which ads you’ll find most useful, the people who matter most to you online, or which YouTube videos you might like. The information Lumen collects, and how that information is used, depends on how you use our services and how you manage your privacy controls.
            </Typography>
            <Typography variant="body1" sx={{ padding: 2 }} align="justify">
            When you’re not signed in to a Lumen Account, we store the information we collect with unique identifiers tied to the browser, application, or device you’re using. This allows us to do things like maintain your preferences across browsing sessions, such as your preferred language or whether to show you more relevant search results or ads based on your activity.
            </Typography>

            <Typography variant="body1" sx={{ padding: 2 }} align="justify">
            When you’re signed in, we also collect information that we store with your Lumen Account, which we treat as personal information.
            </Typography>

          </Paper>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
  );
}
