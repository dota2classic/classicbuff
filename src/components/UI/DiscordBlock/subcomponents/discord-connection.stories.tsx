import { DiscordConnection } from "./DiscordConnection";
import React from "react";

export default {
  title: "UI/DiscordConnection",
  component: DiscordConnection
};

export const all = () => (
  <div style={{ width: 500 }}>
    <DiscordConnection
      image="https://cdn.discordapp.com/avatars/318014316874039306/f499c9be0ee8654c0a2c912e8c9f419e.webp"
      name="Some account"
    />
  </div>
);
