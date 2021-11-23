import { GraphQLClient, gql } from 'graphql-request';

const endpoint = process.env.CMS_ENDPOINT || "";
const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.CMS_READER_TOKEN}`
  }
});

export const readCmsHome = async (liveVolume: number): Promise<CmsHomeType> => {
  // home page
  const query = gql`
  query ($liveVolume: Int!) {
    home(where: { liveVolume: $liveVolume }) {
      id
      title
      body
    }
  }
  `;
  const data = await client.request(query, { liveVolume });
  return data.home;
};

export const readCmsHomeList = async (): Promise<CmsHomeType[]> => {
  // home list
  const query = gql`
  query () {
    homes(orderBy: liveVolume_DESC) {
      liveVolume
    }
  }
  `;
  const data = await client.request(query);
  return data.homes;
};

export const readCmsAbout = async (liveVolume: number): Promise<CmsAboutType> => {
  // about page
  const query = gql`
  query ($liveVolume: Int!) {
    about(where: { liveVolume: $liveVolume }) {
      id
      title
      body
    }
  }
  `;
  const data = await client.request(query, { liveVolume });
  return data.about;
};

export const readCmsContent = async (contentId: string): Promise<CmsContentType> => {
  // content page
  const query = gql`
  query ($id: ID!) {
    content(where: { id: $id }) {
      id
      title
      body
      updatedAt
      createdAt
    }
  }
  `;
  const data = await client.request(query, { id: contentId });
  return data.content;
};


export const readCmsContentList = async (liveVolume: number, first: number, skip: number): Promise<CmsContentType[]> => {
  // content list
  const query = gql`
  query ($liveVolume: Int!, $first: Int!, $skip: Int!) {
    contents(where: { liveVolume: $liveVolume }, orderBy: updatedAt_DESC, first: $first, skip: $skip) {
      id
      title
      updatedAt
      createdAt
    }
  }
  `;
  const data = await client.request(query, { liveVolume, first, skip });
  return data.contents;
};

export const readCmsNofContents = async (liveVolume: number): Promise<{ count: number }> => {
  // number of contents
  const query = gql`
  query ($liveVolume: Int!) {
    contentsConnection(where: { liveVolume: $liveVolume }) {
      aggregate {
        count
      }
    }
  }
  `;
  const data = await client.request(query, { liveVolume });
  return data.contentsConnection.aggregate;
};

export const readCmsAssetList = async (liveVolume: number): Promise<CmsAssetType[]> => {
  // image url list
  const query = gql`
  query ($liveVolume: Int!) {
    assets(where: { liveVolume: $liveVolume }) {
      url
    }
  }
  `;
  const data = await client.request(query, { liveVolume });
  return data.assets;
};

export const readCmsContactList = async (liveVolume: number): Promise<CmsContactType[]> => {
  // contact us list
  const query = gql`
  query ($liveVolume: Int!) {
    contacts(where: { liveVolume: $liveVolume }, orderBy: createdAt_ASC ) {
      title
      body
    }
  }
  `;
  const data = await client.request(query, { liveVolume });
  return data.contacts;
};