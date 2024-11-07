import { Authenticator, ThemeProvider, defaultTheme } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
//import { Auth } from 'Amplify';
import { getCurrentUser, fetchUserAttributes, signOut as amplifySignOut } from '@aws-amplify/auth'; // Correct imports
import outputs from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const user = await getCurrentUser();
    //console.log('User:', user); // Log user details

    const attributesArray = await fetchUserAttributes(user);
    console.log('Attributes:', attributesArray); // Log fetched attributes

    // Safely access 'custom:isAdmin'
    const isAdminAttr = attributesArray['custom:isAdmin'];
    // console.log('isAdmin Attribute:', isAdminAttr); // Log attribute value

    // Ensure we handle cases where 'isAdminAttr' is missing or invalid
    const isAdminValue = isAdminAttr ? isAdminAttr.trim() : ''; 
    console.log('isAdmin Value after trim:', isAdminValue); // Check value after trim

    return isAdminValue === 'true'; // Return true if admin
  } catch (error) {
    console.error('Error fetching user attributes:', error);
    return false;
  }
}

async function getEmail() {
  try {
    const user = await getCurrentUser();

    const attributesArray = await fetchUserAttributes(user);
    const emailAttr = attributesArray['email'];
    const emailValue = emailAttr ? emailAttr.trim() : '';
    console.error('EmailValue: ', emailValue);
    return emailValue;
  } catch (error) {
    console.error('Error fetching user email/attributes', error);
    return null;
  }
}

const ProfileSection = ( { handleSignOut }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshUserSession = async () => {
    try {
      //const currentUser = await Auth.currentAuthicatedUser();
      const adminStatus = await isAdminUser(); // Check admin status
      // console.log('Admin status:', adminStatus); // Check if true
      // setIsAdmin((prev) => {
        // console.log('Previous isAdmin:', prev); // Log previous state
        // console.log('New adminStatus:', adminStatus); // Log new status
      //   return adminStatus;
      // });
      setIsAdmin(adminStatus);
      const role = adminStatus ? 'admin' : 'user';
      localStorage.setItem('userRole', role);
      
      const email = await getEmail();
      localStorage.setItem('email', email);
  
      if(adminStatus) {
        navigate('/admin/admin-dashboard', {state: { role: 'admin'}});
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
      setIsAdmin(false); // Reset to false on error
    } finally {
      setLoading(false); // End loading state
    }
  };

  useEffect(() => {
    refreshUserSession(); // Refresh session on component mount
    // console.log('Admin status in useEffect:', isAdmin);
  }, []); // Run only once on mount
  



  if (loading) return <p>Loading...</p>; // Wait until loading finishes

  return (
    <ThemeProvider theme={customTheme}>
      <Authenticator
        onAuthEvent={async (payload) => {
          // console.log('Auth Event:', payload); // Debugging log
          if (payload.event === 'signIn') {
            // console.log('Sign-in detected');
            await refreshUserSession(); // Refresh session on sign in
            // console.log("Rerouting page 2");
            // window.location.replace(window.location.href); // Reload 
            navigate('/');
          } else if (payload.event === 'signOut') {
            handleSignOut(); // Reset state on sign out
          }
        }}
        onStateChange={(state) => console.log('State changed:', state)}
      >
        {({ user }) => (
          <main>
            <h1>Hello {user?.username}</h1>
            <h1>Welcome to the Dashboard</h1>
            <p> This is the email: {localStorage.getItem('email')}</p>
              <p>You are a regular user.</p>
            <button onClick={handleSignOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </ThemeProvider>
  );
};

export default ProfileSection;
