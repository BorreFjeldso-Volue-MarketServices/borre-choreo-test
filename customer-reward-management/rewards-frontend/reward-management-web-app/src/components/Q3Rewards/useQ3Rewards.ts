/**********************************************************************
 *
 *   Component hook generated by Quest
 *
 *   Code Logic for the component goes in this hook
 *   To setup bindings that use the data here or call the functions here, use the Quest editor
 *   Do not change the name of the hook
 *
 *   For help and further details refer to: https://www.quest.ai/docs
 *
 *
 **********************************************************************/

import React, { useEffect } from "react";
import useQ3RewardsResponsiveSize from "./useQ3RewardsResponsiveSize";
import { Reward } from "src/api/types";
import { useAuthContext } from "@asgardeo/auth-react";
import { getRewards } from "src/api/api";

/* These are the possible values for the current variant. Use this to change the currentVariant dynamically.
Please don't modify */
const variantOptions = {
  ScreenDesktop: "ScreenDesktop",
  ScreenMobile: "ScreenMobile",
};

const useQ3Rewards = () => {
  const [currentVariant, setCurrentVariant] = React.useState<string>(
    variantOptions["ScreenDesktop"]
  );
  const [isRewardsLoading, setIsRewardsLoading] = React.useState(false);
  const [rewards, setRewards] = React.useState<Reward[]>([]);

  const { isAuthenticated } = useAuthContext();

  const breakpointsVariant = useQ3RewardsResponsiveSize();

  React.useEffect(() => {
    if (breakpointsVariant !== currentVariant) {
      setCurrentVariant(breakpointsVariant);
    }
  }, [breakpointsVariant, currentVariant]);

  async function getRewardDeatils() {
    const isSignedIn = await isAuthenticated();
    if (isSignedIn) {
      setIsRewardsLoading(true);
      getRewards()
        .then((res) => {
          setRewards(res.data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsRewardsLoading(false);
        });
    }
  }

  useEffect(() => {
    getRewardDeatils();
  }, []);

  const data: any = { currentVariant, rewards, isRewardsLoading };

  const fns: any = { setCurrentVariant };

  return { data, fns };
};

export default useQ3Rewards;
