import { useState } from "react";
import { Button } from "@pega/cosmos-react-core";
import TabularView from "./TabularView";

const AttachmentTabular = () => {
  const [showTabularView, setShowTabularView] = useState(false);

  const toggleTabularView = () => {
    setShowTabularView(!showTabularView);
  };

  return (
    <>
      <Button
        onClick={toggleTabularView}
        style={{ minWidth: "100px" }}
        variant="secondary"
        compact={false}
      >
        Select file(s)
      </Button>
      {showTabularView && <TabularView />}
    </>
  );
};

export default AttachmentTabular;
