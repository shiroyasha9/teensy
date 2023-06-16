"use client";
import type { NextPage } from "next";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const SwaggerPage: NextPage = () => {
  return (
    <div className="h-screen overflow-scroll bg-white">
      <SwaggerUI url="/api/openapi.json" />
    </div>
  );
};

export default SwaggerPage;
