import { Button, Typography } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="Header">
      {!session ? (
        <Button onClick={() => signIn()}>Login</Button>
      ) : (
        <>
          <Typography>Signed in as {session.user?.email}</Typography>
          <Button onClick={() => signOut()}>Logout</Button>
        </>
      )}
    </div>
  );
};
export default Header;
