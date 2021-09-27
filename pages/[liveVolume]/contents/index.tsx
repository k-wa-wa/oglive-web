import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from "next/router";
import ContentsBody from "@/components/LiveVolume/Contents/ContentsBody";
import LiveVolHeader from "@/components/LiveVolume/Header/LiveVolHeader";

const ContentsTop = () => {
  const router = useRouter();
  const { liveVolume, page } = router.query;
  return (
    <div>
      <LiveVolHeader liveVolume={liveVolume} />

      <div>
        <ContentsBody liveVolume={liveVolume} page={page} />
      </div>
    </div>
  );
};

//export default ContentsTop;
export default withPageAuthRequired(ContentsTop);