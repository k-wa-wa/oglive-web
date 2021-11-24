import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from "next/router";
import ContactBody from "@/components/LiveVolume/Contact/ContactBody";
import LiveVolHeader from "@/components/LiveVolume/Header/LiveVolHeader";

const Contact = () => {
  const router = useRouter();
  const { liveVolume } = router.query;

  return (
    <div>
      <LiveVolHeader liveVolume={liveVolume} />

      <div>
        <ContactBody liveVolume={liveVolume} />
      </div>
    </div>
  );
};

//export default Contact;
export default withPageAuthRequired(Contact);