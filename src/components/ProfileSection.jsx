import {
  Authenticator,
  ThemeProvider,
  defaultTheme,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
//import { Auth } from 'Amplify';
import {
  getCurrentUser,
  fetchUserAttributes,
  signOut as amplifySignOut,
} from "@aws-amplify/auth"; // Correct imports
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoleBasedProfile from './profiles/RoleBasedProfile'

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
        fontWeight: { value: "400" },
        fontFamily: { value: '"Just Another Hand", cursive' },
        fontSize: { value: "32px" },
      },
      button: {
        fontFamily: { value: '"Just Another Hand", cursive' },
        fontSize: { value: "25px" },
        primary: {
          _hover: { backgroundColor: { value: "#4E0000" } },
        },
      },
      input: {
        fontFamily: { value: '"Just Another Hand", cursive' },
        fontSize: { value: "25px" },
      },
      label: {
        fontFamily: { value: '"Just Another Hand", cursive' },
        fontSize: { value: "25px" },
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
    console.log("Attributes:", attributesArray); // Log fetched attributes

    // Safely access 'custom:isAdmin'
    const isAdminAttr = attributesArray["custom:isAdmin"];
    // console.log('isAdmin Attribute:', isAdminAttr); // Log attribute value

    // Ensure we handle cases where 'isAdminAttr' is missing or invalid
    const isAdminValue = isAdminAttr ? isAdminAttr.trim() : "";
    console.log("isAdmin Value after trim:", isAdminValue); // Check value after trim

    return isAdminValue === "true"; // Return true if admin
  } catch (error) {
    console.error("Error fetching user attributes:", error);
    return false;
  }
}

async function getEmail() {
  try {
    const user = await getCurrentUser();

    const attributesArray = await fetchUserAttributes(user);
    const emailAttr = attributesArray["email"];
    const emailValue = emailAttr ? emailAttr.trim() : "";
    console.error("EmailValue: ", emailValue);
    return emailValue;
  } catch (error) {
    console.error("Error fetching user email/attributes", error);
    return null;
  }
}

const ProfileSection = ({ handleSignOut }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [userRole, setUserRole] = useState("null");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogOut = async () => {
    console.log("Logging out...");
    await handleSignOut();
    console.log("Navigating to home...");
    navigate("/");
  };

  const refreshUserSession = async () => {
    try {
      //const currentUser = await Auth.currentAuthicatedUser();
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes(user);
      const adminStatus = await isAdminUser(); // Check admin status
      // console.log('Admin status:', adminStatus); // Check if true
      // setIsAdmin((prev) => {
      // console.log('Previous isAdmin:', prev); // Log previous state
      // console.log('New adminStatus:', adminStatus); // Log new status
      //   return adminStatus;
      // });
      setIsAdmin(adminStatus);
      const role = adminStatus ? "admin" : "user";
      localStorage.setItem("userRole", role);

      const email = await getEmail();
      localStorage.setItem("email", email);

      if (adminStatus) {
        navigate("/admin/admin-dashboard", { state: { role: "admin" } });
      }
    } catch (error) {
      console.error("Error refreshing session:", error);
      setIsAdmin(false); // Reset to false on error
      setUserRole("guest");
    } finally {
      setLoading(false); // End loading state
    }
  };

  useEffect(() => {
    refreshUserSession(); // Refresh session on component mount
    // console.log('Admin status in useEffect:', isAdmin);
  }, []); // Run only once on mount

  /* const handleSignOut = async () => {
    setIsAdmin(false); // Reset state
    await amplifySignOut(); // Use Amplify's sign out
  }; */

  if (loading) return <p>Loading...</p>; // Wait until loading finishes

  return (
    <ThemeProvider theme={customTheme}>
      <Authenticator
        onAuthEvent={async payload => {
          // console.log('Auth Event:', payload); // Debugging log
          if (payload.event === "signIn") {
            refreshUserSession(); // Refresh session on sign in
            //navigate('/');
          } else if (payload.event === "signOut") {
            handleSignOut(); // Reset state on sign out
          }
        }}
        onStateChange={state => console.log("State changed:", state)}
      >
        {() => (
          <main>
            {userRole ? <RoleBasedProfile userRole={userRole} /> : <p>Loading profile...</p>}
            <button onClick={handleLogOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </ThemeProvider>
  );
};

export default ProfileSection;
