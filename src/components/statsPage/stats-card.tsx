import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const StatCard = ({ title, value, icon }: { title: string, value: any, icon: JSX.Element }) => {
  return (
    <Card className="p-5">
      <CardHeader className="flex gap-5 flex-row items-center">
      {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center text-3xl font-semibold">{value}</CardContent>
    </Card>
  ); 
};

export default StatCard;
