import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from "next/router";

import AboutBody from "@/components/LiveVolume/About/AboutBody";
import LiveVolHeader from "@/components/LiveVolume/Header/LiveVolHeader";





const About = () => {
  const router = useRouter();
  const { liveVolume } = router.query;

  return (
    <div>
      <LiveVolHeader liveVolume={liveVolume} />

      <div>
        <AboutBody liveVolume={String(liveVolume)} />
      </div>

    </div>
  );
};

export default About;