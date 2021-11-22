import PageTitle from "@/components/Utils/LayoutComponent/PageTitle";
import MdViewer from "@/components/Utils/Markdown/MdViewer";

const ContactBody = () => {
  const body = `
  作成中
  `;
  return (
    <div>
      <PageTitle title="お問い合わせ" />

      <MdViewer body={body} />
    </div>
  );
};

export default ContactBody;