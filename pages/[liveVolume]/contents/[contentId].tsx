import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from "next/router";
import ContentBody from "@/components/LiveVolume/Content/ContentBody";
import LiveVolHeader from "@/components/LiveVolume/Header/LiveVolHeader";


const Content = () => {
  const router = useRouter();
  const { liveVolume, contentId } = router.query;
  return (
    <div>
      <LiveVolHeader liveVolume={liveVolume} />

      <div>
        <ContentBody liveVolume={liveVolume} contentId={contentId} />
      </div>
    </div>
  );
};

export default Content;