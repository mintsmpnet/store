"use client";

import SnowflakeLib from "react-snowfall";

export default function Snowflake() {
  return (
    <SnowflakeLib
      snowflakeCount={20}
      color="#c2f8c8"
      speed={[0.1, 0.5]}
      style={{
        opacity: 0.1,
      }}
    />
  );
}
