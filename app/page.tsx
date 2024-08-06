"use client"

import { Button as NextUiButton } from "@nextui-org/react";
import { Button as MuiButton } from '@mui/material';

export default function Home() {
  return (
    <div>
      <NextUiButton>next ui</NextUiButton>
      <MuiButton variant="contained">MUI</MuiButton>
    </div>
  )
}