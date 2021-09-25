import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from "next/router";

import LiveVolHeader from "@/components/LiveVolume/Header/LiveVolHeader";
import HomeBody from "@/components/LiveVolume/Home/HomeBody";


const Home = () => {
  const router = useRouter();
  const { liveVolume } = router.query;

  return (
    <div>
      <LiveVolHeader liveVolume={liveVolume} />

      <div>
        <HomeBody liveVolume={liveVolume} />
      </div>
    </div>
  );
};

export default Home;
//export default withPageAuthRequired(Home);