import { Authenticator, ThemeProvider, defaultTheme } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { getCurrentUser, fetchUserAttributes, signOut as amplifySignOut } from '@aws-amplify/auth'; // Correct imports
import outputs from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedProfile from './profiles/RoleBasedProfile';

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



const ProfileSection = ( { handleSignOut }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [name, setName] = useState('');
  const [userRole, setUserRole] = useState('null');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogOut = async () => {
    console.log("Logging out...");
    await handleSignOut();
    console.log("Navigating to home...");
    navigate('/');
  };

  const refreshUserSession = async () => {
    try {

      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes(user);

      const getAdmin = attributes['custom:isAdmin'] === 'true';
      setIsAdmin(getAdmin);
      const role = isAdmin ? 'admin' : 'customer';
      setUserRole(role);
      localStorage.setItem('userRole', role);

      const emailValue = attributes['email'] || '';
      setEmail(emailValue);
      localStorage.setItem('email', emailValue);

      const nameValue = attributes['name'] || '';
      setName(nameValue);
      localStorage.setItem('name', nameValue);
    } catch (error) {
      console.error('Error refreshing session:', error);
      setIsAdmin(false); // Reset to false on error
      setUserRole('guest');
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
    <ThemeProvider theme={{ customTheme}}>
      <Authenticator onAuthEvent={async (payload) => {
        if (payload.event === 'signIn') {
          await refreshUserSession();
          navigate('/');
        } else if (payload.event === 'signOut') {
            handleSignOut();
            navigate('/');
          }
        }}
      >
        {() => (
          <main>
            {userRole ? <RoleBasedProfile userRole={userRole} /> : <p>Loading profile...</p>}
            <button onClick={handleSignOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </ThemeProvider>
  );

};

export default ProfileSection;
