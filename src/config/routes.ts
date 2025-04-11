import { identity } from "lodash";

export interface IRoute {
  list: string;
  create: string;
  edit: (id: string) => string;
  details: (id: string) => string;
}

export const routes = {
  user: {
    list: "/user",
    create: "/user/create",
    edit: (id: string) => `/user/${id}/edit`,
    details: (id: string) => `/user/${id}`,
  },
  role: {
    list: "/role",
    create: "/role/create",
    edit: (id: string) => `/role/${id}/edit`,
    details: (id: string) => `/role/${id}`,
  },
  partner: {
    list: "/partner",
    create: "/partner/create",
    edit: (id: string) => `/partner/${id}/edit`,
    details: (id: string) => `/partner/${id}`,
  },
  identity_type: {
    list: "/identity-type",
    create: "/identity-type/create",
    edit: (id: string) => `/identity-type/${id}/edit`,
    details: (id: string) => `/identity-type/${id}`,
  },
  master_entity: {
    list: "/master-entity",
    create: "/master-entity/create",
    edit: (id: string) => `/master-entity/${id}/edit`,
    details: (id: string) => `/master-entity/${id}`,
  },
  master_entity_cabang: {
    list: "/master-entity/cabang",
    create: "/master-entity/cabang/create",
    edit: (id: string) => `/master-entity/cabang/${id}/edit`,
    details: (id: string) => `/master-entity/cabang/${id}`,
  },
  master_entity_departemen: {
    list: "/master-entity/departemen",
    create: "/master-entity/departemen/create",
    edit: (id: string) => `/master-entity/departemen/${id}/edit`,
    details: (id: string) => `/master-entity/departemen/${id}`,
  },
  master_entity_individu: {
    list: "/master-entity/individu",
    create: "/master-entity/individu/create",
    edit: (id: string) => `/master-entity/individu/${id}/edit`,
    details: (id: string) => `/master-entity/individu/${id}`,
  },
  master_entity_legalentity: {
    list: "/master-entity/legalentity",
    create: "/master-entity/legalentity/create",
    edit: (id: string) => `/master-entity/legalentity/${id}/edit`,
    details: (id: string) => `/master-entity/legalentity/${id}`,
  },
  profile: "/profile",
  changePassword: "/change-password",

  program_category: {
    list: "/program-category",
    create: "/program-category/create",
    edit: (id: string) => `/program-category/${id}/edit`,
    details: (id: string) => `/program-category/${id}`,
  },
  auth: {
    forgotPassword: "/auth/forgot-password",
    otp: "/auth/otp",
    resetPassword: (token: string) => `/auth/reset-password/${token}`,

    // sign up
    signUp1: "/auth/sign-up-1",
    signUp2: "/auth/sign-up-2",
    signUp3: "/auth/sign-up-3",
    signUp4: "/auth/sign-up-4",
    signUp5: "/auth/sign-up-5",
    // sign in
    signIn1: "/auth/sign-in-1",
    signIn2: "/auth/sign-in-2",
    signIn3: "/auth/sign-in-3",
    signIn4: "/auth/sign-in-4",
    signIn5: "/auth/sign-in-5",
  },
  signIn: "/signin",
  // ! Tidak Di Pake
  eCommerce: {
    dashboard: "/ecommerce",
    products: "/ecommerce/products",
    createProduct: "/ecommerce/products/create",
    productDetails: (slug: string) => `/ecommerce/products/${slug}`,
    ediProduct: (slug: string) => `/ecommerce/products/${slug}/edit`,
    categories: "/ecommerce/categories",
    createCategory: "/ecommerce/categories/create",
    editCategory: (id: string) => `/ecommerce/categories/${id}/edit`,
    orders: "/ecommerce/orders",
    createOrder: "/ecommerce/orders/create",
    orderDetails: (id: string) => `/ecommerce/orders/${id}`,
    editOrder: (id: string) => `/ecommerce/orders/${id}/edit`,
    reviews: "/ecommerce/reviews",
    shop: "/ecommerce/shop",
    cart: "/ecommerce/cart",
    checkout: "/ecommerce/checkout",
    trackingId: (id: string) => `/ecommerce/tracking/${id}`,
  },
  searchAndFilter: {
    realEstate: "/search/real-estate",
    nft: "/search/nft",
    flight: "/search/flight",
  },
  support: {
    dashboard: "/support",
    inbox: "/support/inbox",
    supportCategory: (category: string) => `/support/inbox/${category}`,
    messageDetails: (id: string) => `/support/inbox/${id}`,
    snippets: "/support/snippets",
    createSnippet: "/support/snippets/create",
    viewSnippet: (id: string) => `/support/snippets/${id}`,
    editSnippet: (id: string) => `/support/snippets/${id}/edit`,
    templates: "/support/templates",
    createTemplate: "/support/templates/create",
    viewTemplate: (id: string) => `/support/templates/${id}`,
    editTemplate: (id: string) => `/support/templates/${id}/edit`,
  },
  logistics: {
    dashboard: "/logistics",
    shipmentList: "/logistics/shipments",
    customerProfile: "/logistics/customer-profile",
    createShipment: "/logistics/shipments/create",
    editShipment: (id: string) => `/logistics/shipments/${id}/edit`,
    shipmentDetails: (id: string) => `/logistics/shipments/${id}`,
    tracking: (id: string) => `/logistics/tracking/${id}`,
  },
  appointment: {
    dashboard: "/appointment",
    appointmentList: "/appointment/list",
  },
  executive: {
    dashboard: "/executive",
  },
  jobBoard: {
    dashboard: "/job-board",
    jobFeed: "/job-board/feed",
  },
  analytics: "/analytics",
  financial: {
    dashboard: "/financial",
  },
  file: {
    dashboard: "/file",
    manager: "/file-manager",
    upload: "/file-manager/upload",
    create: "/file-manager/create",
  },
  pos: {
    index: "/point-of-sale",
  },
  eventCalendar: "/event-calendar",
  rolesPermissions: "/roles-permissions",
  invoice: {
    home: "/invoice",
    create: "/invoice/create",
    details: (id: string) => `/invoice/${id}`,
    edit: (id: string) => `/invoice/${id}/edit`,
    builder: "/invoice/builder",
  },
  widgets: {
    cards: "/widgets/cards",
    icons: "/widgets/icons",
    charts: "/widgets/charts",
    maps: "/widgets/maps",
    banners: "/widgets/banners",
  },
  tables: {
    basic: "/tables/basic",
    collapsible: "/tables/collapsible",
    enhanced: "/tables/enhanced",
    pagination: "/tables/pagination",
    search: "/tables/search",
    stickyHeader: "/tables/sticky-header",
    tanTable: "/tables/tan-table",
    tanTableResizable: "/tables/tan-table-resizable",
    tanTableDnD: "/tables/tan-table-dnd",
    tanTablePinning: "/tables/tan-table-pinning",
    tanTableEnhanced: "/tables/tan-table-enhanced",
    tanTableCollapsible: "/tables/tan-table-collapsible",
  },
  multiStep: "/multi-step",
  forms: {
    profileSettings: "/forms/profile-settings",
    notificationPreference: "/forms/profile-settings/notification",
    personalInformation: "/forms/profile-settings/profile",
    newsletter: "/forms/newsletter",
  },
  emailTemplates: "/email-templates",
  welcome: "/welcome",
  comingSoon: "/coming-soon",
  accessDenied: "/access-denied",
  notFound: "/not-found",
  maintenance: "/maintenance",
  blank: "/blank",
};
