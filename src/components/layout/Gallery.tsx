"use client";
import React from "react";
import Button from "../common/Button";
interface GridItem {
  url?: string;
}

const Gallery = () => {
  const placeholder: GridItem = { url: " " };
  const MintCollection: GridItem[] = [
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
  ];

  const GridItem = ({ item }: { item: any }) => (
    <div className="border rounded-md text-white relative overflow-hidden aspect-square">
      <div className="tv-static"></div>
    </div>
  );

  const Grid = ({ data }: { data: Array<any> }) =>
    data.map((item, i) => <GridItem item={item} key={`grid-item-${i}`} />);

  return (
    <>
      <div className="grid grid-cols-3 gap-3 flex-1 w-full content-start">
        <Grid data={MintCollection} />
      </div>
    </>
  );
};

export default Gallery;
