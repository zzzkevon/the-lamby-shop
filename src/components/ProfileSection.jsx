import { Authenticator, ThemeProvider, defaultTheme } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { getCurrentUser, fetchUserAttributes, signOut as amplifySignOut } from '@aws-amplify/auth'; // Correct imports
import outputs from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import { useState, useEffect } from 'react';

// Configure Amplify
Amplify.configure(outputs);

// Custom theme
const customTheme = {
  tokens: {
    components: {
      authenticator: {
        fontFamily: { value: '"Just Another Hand", cursive' },
      },
      heading: {
        fontWeight: { value: '400' },
        fontFamily: { value: '"Just Another Hand", cursive' },
        fontSize: { value: '32px' },
      },
      button: {
        fontFamily: { value: '"Just Another Hand", cursive' },
        fontSize: { value: '25px' },
        primary: {
          _hover: { backgroundColor: { value: '#4E0000' } },
        },
      },
      input: {
        fontFamily: { value: '"Just Another Hand", cursive' },
        fontSize: { value: '25px' },
      },
      label: {
        fontFamily: { value: '"Just Another Hand", cursive' },
        fontSize: { value: '25px' },
      },
    },
  },
};

// Helper function to check if the user is an admin
async function isAdminUser() {
  try {
    const user = await getCurrentUser(); // Get the authenticated user
    const attributesArray = await fetchUserAttributes(user); // Fetch user attributes
    console.log('User Attributes:', attributesArray); // Debugging log

    // Find the custom:isAdmin attribute
    const isAdminAttr = attributesArray["custom:isAdmin"];
    console.log("test",isAdminAttr);

    return isAdminAttr?.Value === 'true'; // Return true if admin
  } catch (error) {
    console.error('Error fetching user attributes:', error);
    return false;
  }
}

const ProfileSection = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const refreshUserSession = async () => {
    try {
      const adminStatus = await isAdminUser(); // Check if user is admin
      setIsAdmin(adminStatus); // Update admin state
    } catch (error) {
      console.error('Error refreshing session:', error);
      setIsAdmin(false); // Reset admin state if session fetch fails
    } 
  };

  useEffect(() => {
    refreshUserSession(); // Refresh session on component mount
  }, []); // Run only once on mount

  const handleSignOut = async () => {
    setIsAdmin(false); // Reset state
    await amplifySignOut(); // Use Amplify's sign out
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Authenticator
        onAuthEvent={async (payload) => {
          console.log('Auth Event:', payload); // Debugging log
          if (payload.event === 'signIn') {
            await refreshUserSession(); // Refresh session on sign in
          } else if (payload.event === 'signOut') {
            handleSignOut(); // Reset state on sign out
          }
        }}
      >
        {({ user }) => (
          <main>
            <h1>Hello {user?.username}</h1>
            <h1>Welcome to the Dashboard</h1>
            {isAdmin ? (
              <p>You are an admin. You can manage content here.</p>
            ) : (
              <p>You are a regular user.</p>
            )}
            <button onClick={handleSignOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </ThemeProvider>
  );
};

export default ProfileSection;
