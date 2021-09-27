
import Reveal from "@/components/Utils/Animation/Reveal";
import Error from "@/components/Utils/Error";
import LayoutBox from "@/components/Utils/LayoutComponent/LayoutBox";
import PageTitle from "@/components/Utils/LayoutComponent/PageTitle";
import LoadingBody from "@/components/Utils/Loading/LoadingBody";
import MdViewer from "@/components/Utils/Markdown/MdViewer";

const ContactBody = () => {
  const body = `
  作成中
  `;
  return (
    <div>
      <Reveal animVars={{ y: 20 }}>
        <PageTitle title="お問い合わせ" />
      </Reveal>

      <Reveal>
        <MdViewer body={body} />
      </Reveal>
    </div>
  );
};

export default ContactBody;