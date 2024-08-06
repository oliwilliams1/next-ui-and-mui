"use client"

import { Button as NextUiButton } from "@nextui-org/react";
import { Button as MuiButton } from '@mui/material';

import SceneCanvas from "./scene.js"

export default function Home() {
  return (
  <div>
    <NextUiButton>next ui</NextUiButton>
    <MuiButton variant="contained">MUI</MuiButton>
    <SceneCanvas />
  </div>
  );
}