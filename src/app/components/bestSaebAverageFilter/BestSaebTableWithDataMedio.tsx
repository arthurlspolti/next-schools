"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BestSaebTable from "@/app/components/bestSaebAverageFilter/BestSaebTable";

export default function BestSaebTableWithDataMedio() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/getBestSaebAverage");
      setData(response.data.medio);
    };

    fetchData();
  }, []);

  return data.length > 0 ? <BestSaebTable data={data} /> : null;
}
