import Reveal from "@/components/Utils/Animation/Reveal";
import PageTitle from "@/components/Utils/LayoutComponent/PageTitle";
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