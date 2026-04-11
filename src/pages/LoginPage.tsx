import { useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Paper,
  Center,
  Box,
} from '@mantine/core';

/**
 * Login page with Google OAuth placeholder.
 * TODO: Replace with Google OAuth integration (e.g., Firebase Auth, Supabase Auth, or NextAuth)
 * TODO: Add proper auth state management and token handling
 * TODO: Tokens should be stored in secure httpOnly cookies, NOT localStorage
 */
const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // TODO: Replace with Google OAuth integration
    // Example: signInWithGoogle() from auth provider
    // After successful auth, redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container size="xs">
        <Paper
          radius="lg"
          p="xl"
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
          }}
        >
          <Stack align="center" gap="lg">
            <Box>
              <Title
                order={1}
                style={{ color: '#f8fafc', fontSize: '2rem', letterSpacing: '-0.02em' }}
                ta="center"
              >
                Inbox
                <Text
                  component="span"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  AI
                </Text>
              </Title>
              <Text size="sm" c="dimmed" ta="center" mt="xs">
                Your AI-powered email assistant
              </Text>
            </Box>

            <Button
              size="lg"
              fullWidth
              radius="md"
              variant="white"
              color="dark"
              onClick={handleGoogleLogin}
              leftSection={
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              }
            >
              Continue with Google
            </Button>

            <Text size="xs" c="dimmed" ta="center">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </Text>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
