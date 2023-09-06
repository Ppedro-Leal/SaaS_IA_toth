"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("0804317c-14a4-4280-a6f9-2113847defef");
  }, []);

  return null;
};
