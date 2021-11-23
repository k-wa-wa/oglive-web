import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  readCmsAbout, readCmsContent,
  readCmsHome, readCmsNofContents,
  readCmsContentList, readCmsHomeList,
  readCmsAssetList,
  readCmsContactList
} from "@/modules/graphqlApi";


const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  console.log("/api/cms/graphcms");

  if (req.method === "GET") {
    const { pageType, liveVolume, contentId, first, skip } = req.query;

    if (pageType === "home") {
      // home page
      return await readCmsHome(Number(liveVolume)).then(data => {
        return res.status(200).json(data);
      }).catch(err => {
        console.log(err);
        return res.status(400).end();
      });

    } else if (pageType === "about") {
      // about page
      return await readCmsAbout(Number(liveVolume)).then(data => {
        return res.status(200).json(data);
      }).catch(err => {
        console.log(err);
        return res.status(400).end();
      });

    } else if (pageType === "content") {
      // content page
      return await readCmsContent(String(contentId)).then(data => {
        return res.status(200).json(data);
      }).catch(err => {
        console.log(err);
        return res.status(400).end();
      });

    } else if (pageType === "contents") {
      // content list
      return await readCmsContentList(Number(liveVolume), Number(first), Number(skip)).then(data => {
        return res.status(200).json(data);
      }).catch(err => {
        console.log(err);
        return res.status(400).end();
      });

    } else if (pageType === "NofContents") {
      // number of contents
      return await readCmsNofContents(Number(liveVolume)).then(data => {
        return res.status(200).json(data);
      }).catch(err => {
        console.log(err);
        return res.status(400).end();
      });

    } else if (pageType === "homes") {
      // home(top) page
      return await readCmsHomeList().then(data => {
        return res.status(200).json(data);
      }).catch(err => {
        console.log(err);
        return res.status(400).end();
      });

    } else if (pageType === "assets") {
      // asset list
      return await readCmsAssetList(Number(liveVolume)).then(data => {
        return res.status(200).json(data);
      }).catch(err => {
        console.log(err);
        return res.status(400).end();
      });

    } else if (pageType === "contacts") {
      // contact us list
      return await readCmsContactList(Number(liveVolume)).then(data => {
        return res.status(200).json(data);
      }).catch(err => {
        console.log(err);
        return res.status(400).end();
      });
    }

    return res.status(400).end();
  }
};

//export default handler;
export default withApiAuthRequired(handler);