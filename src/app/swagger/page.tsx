"use client";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

const SwaggerPage: NextPage = () => {
  return (
    <div className="h-screen overflow-scroll bg-white">
      <SwaggerUI url="/api/openapi.json" />
    </div>
  );
};

export default SwaggerPage;
