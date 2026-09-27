export type UrlConfig = {
  urlWebsite: string;
  urlPanel: string; 
  urlCreateVendor: string;
  urlListOfVendor: string;
  urlEditBusiness: (businessId: string | number) => string;
};

export const Urls: UrlConfig = {
  urlWebsite: "/pwa/login",
  urlPanel: "/panel/app/dashboards/",
  urlCreateVendor: "/panel/app/dashboards/business/create",
  urlListOfVendor: "/panel/app/dashboards/business",
  urlEditBusiness: (businessId: string | number) => 
    `/panel/app/dashboards/business/edit/${businessId}`,
};
