"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import mixpanel from "mixpanel-browser";
import { Button } from "../ui/button";

export default function GetStartedButton() {
  const handleButtonClick = () => {
    mixpanel.track("Get Started Button Clicked");
    window.open("https://github.com/AgentBurgundy/fire-saas", "_blank");
  };

  return (
    <Button onClick={handleButtonClick} variant="secondary" className="gap-2">
      <FontAwesomeIcon icon={faFire} color="red" size="lg" />
      <span>Start Using FireSaaS for Free</span>
    </Button>
  );
}
