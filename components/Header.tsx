import { Button, Typography } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import AboutDialog from "./AboutDialog";

const Header = () => {
  const { data: session } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

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
      <Button onClick={handleDialogOpen}>About</Button>
      <AboutDialog open={isDialogOpen} onClose={handleDialogClose} />
    </div>
  );
};
export default Header;
