import axios from "axios";
import useSWR from "swr";

// useSWR関数は、おそらく第一引数のパラメータが全て同じだと、同じリクエストを行なっているとみなしてキャッシュデータを利用している。
// 例えば、readCmsHomeSwr関数とreadCmsAboutSwr関数では第一引数に渡す配列が同じため、同じリクエストとみなされてしまう。
// これだと都合が悪いので、全く関係のないnumberを第一引数の配列に加えて、異なる関数を実行していることをSWRに知らせている。

type useSwrReadCmsHomeType = {
  data: CmsHomeType | "";
  isLoading: boolean;
  isError: any;
};
export const useSwrReadCmsHome = (liveVolume: number | undefined): useSwrReadCmsHomeType => {
  // home page
  const fetcher = (url: string, liveVolume: number) => {
    return axios.get(url, {
      params: { pageType: "home", liveVolume }
    }).then(res => res.data);
  };

  const { data, error } = useSWR(liveVolume ? [`/api/cms/graphcms`, liveVolume, 1] : null, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
};


type useSwrReadCmsHomeListType = {
  data: CmsHomeType[];
  isLoading: boolean;
  isError: any;
};
export const useSwrReadCmsHomeList = (): useSwrReadCmsHomeListType => {
  // home page
  const fetcher = (url: string) => {
    return axios.get(url, {
      params: { pageType: "homes" }
    }).then(res => res.data);
  };

  const { data, error } = useSWR([`/api/cms/graphcms`], fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
};

type useSwrReadCmsAboutType = {
  data: CmsAboutType | "";
  isLoading: boolean;
  isError: any;
};
export const useSwrReadCmsAbout = (liveVolume: number | undefined): useSwrReadCmsAboutType => {
  // about page
  const fetcher = (url: string, liveVolume: number) => {
    return axios.get(url, {
      params: { pageType: "about", liveVolume }
    }).then(res => res.data);
  };

  const { data, error } = useSWR(liveVolume ? [`/api/cms/graphcms`, liveVolume, 2] : null, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
};


type useSwrReadCmsContentType = {
  data: CmsContentType;
  isLoading: boolean;
  isError: any;
};
export const useSwrReadCmsContent = (contentId: string | string[] | undefined): useSwrReadCmsContentType => {
  // content page
  const fetcher = (url: string, contentId: string) => {
    return axios.get(url, {
      params: { pageType: "content", contentId }
    }).then(res => res.data);
  };

  const { data, error } = useSWR(contentId ? [`/api/cms/graphcms`, contentId] : null, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
};


type useSwrReadCmsContentListType = {
  data: CmsContentType[];
  isLoading: boolean;
  isError: any;
};
export const useSwrReadCmsContentList = (
  liveVolume: number | undefined, first: number | undefined,
  skip: number | undefined): useSwrReadCmsContentListType => {

  const fetcher = (url: string, liveVolume: number, first: number, skip: number) => {
    return axios.get(url, {
      params: {
        pageType: "contents", liveVolume, first, skip
      }
    }).then(res => res.data);
  };

  // skip === 0に注意
  const { data, error } = useSWR(
    liveVolume && first && typeof skip !== "undefined" ? [`/api/cms/graphcms`, liveVolume, first, skip] : null, fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
};


type useSwrReadCmsNofContentsType = {
  data: { count: number; };
  isLoading: boolean;
  isError: any;
};
export const useSwrReadCmsNofContents = (liveVolume: number | undefined): useSwrReadCmsNofContentsType => {
  const fetcher = (url: string, liveVolume: number) => {
    return axios.get(url, {
      params: {
        pageType: "NofContents", liveVolume
      }
    }).then(res => res.data);
  };

  const { data, error } = useSWR(
    liveVolume ? [`/api/cms/graphcms`, liveVolume] : null, fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
};