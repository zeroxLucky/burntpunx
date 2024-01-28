import React from "react";
import Frame from "../view/Frame";
import Gallery from "./Gallery";
import DisplayGrid from "../view/DisplayGrid";
import Button from "../common/Button";

const Content = ({
  view,
  setView,
}: {
  view: string;
  setView(arg: string): void;
}) => {
  return (
    <div className="flex flex-1 flex-col w-full px-6 items-center">
      <div className="flex flex-1 flex-col px-6 w-full max-w-sm h-full">
        {view == "frame" ? (
          <>
            <div className="flex-1">
              <Frame />
              <DisplayGrid />
            </div>
            <div className="flex flex-col w-auto text-center justify-center gap-3 mt-1">
              <Button
                label="Connect Wallet"
                onPress={() => setView("gallery")}
                //classNames="border-green text-green"
                classNames="border-purple text-purple"
              />
              <Button
                //classNames="border-purple text-purple"
                label="View Owned"
                onPress={() => setView("gallery")}
              />
            </div>
          </>
        ) : (
          <Gallery onClose={() => setView("frame")} />
        )}
      </div>
    </div>
  );
};

export default Content;
