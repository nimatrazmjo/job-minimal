const Users = {
  text: "Users",
  icon: "fa fa-users",
  role: "admin",
  submenu: [
    {
      text: "Admin Users ",
      link: "/admin/user/admin",
      icon: "fa fa-user-secret",
      role: "admin",
    },

    {
      text: "Employer Users",
      link: "/admin/user/employer",
      icon: "fa fa-black-tie",
      role: "admin",
    },
    {
      text: "Job Seeker Users",
      link: "/admin/user/job-seeker",
      icon: "fa fa-user",
      role: "admin",
    },

    {
      text: "Deactivated Users",
      link: "/admin/user/deactive",
      icon: "fa fa-minus-circle",
      role: "admin"
    },
    {
      text: "Trashed Users",
      link: "/admin/user/trashed",
      icon: "fa fa-trash",
      role: "admin"
    },

    {
      text: "Add a User",
      icon: "fa fa-plus",
      link: "/admin/user/add",
      role: "admin"
    },

  ]
};

const Subscriptions = {
  text: "Invoices",
  icon: "fa fa-money",
  role: "admin",
  submenu: [
    {
      text: "Paid",
      link: "/admin/invoice/paid",
      icon: "fa fa-check-circle-o",
      role: "admin"
    },
    {
      text: "Open",
      link: "/admin/invoice/open",
      icon: "fa fa-exclamation",
      role: "admin"
    },
    {
      text: "Overdue",
      link: "/admin/invoice/overdue",
      icon: "fa fa-clock-o",
      role: "admin"
    },
    {
      text: "Closed (Not Paid)",
      link: "/admin/invoice/closed",
      icon: "fa fa-ban",
      role: "admin"
    },


  ]
};

const Jobs = {
  text: "Jobs",
  icon: "fa fa-briefcase",
  role: "admin",
  submenu: [
    {
      text: "Active Jobs",
      link: "/admin/jobs/active",
      icon: "fa fa-check-circle-o",
      role: "admin"

    },
    {
      text: "Draft Jobs",
      link: "/admin/jobs/draft",
      icon: "fa fa-pencil-square-o",
      role: "admin"
    },
    {
      text: "Expired Jobs",
      link: "/admin/jobs/expired",
      icon: "fa fa-times-circle-o",
      role: "admin"
    },
    {
      text: "Archived Jobs",
      link: "/admin/jobs/archived",
      icon: "fa fa-archive",
      role: "admin"
    }
  ]
};

const ReportedItems = {
  text: "Reported Items",
  link: "reported-items",
  icon: "fa fa-exclamation-triangle",
  role: "admin",
  submenu: [
    {
      text: "Users",
      link: "/admin/reported-items/users",
      role: "admin",
      icon: "fa fa-users"
    },
    {
      text: "Companies",
      link: "/admin/reported-items/companies",
      role: "admin",
      icon: "fa fa-building-o"
    },
    {
      text: "Jobs",
      link: "/admin/reported-items/jobs",
      role: "admin",
      icon: "fa fa-briefcase"

    },
    {
      text: "Forum Questions",
      link: "/admin/reported-items/qa",
      role: "admin",
      icon: "fa fa-forumbee"
    },
    {
      text: "Posts",
      link: "/admin/reported-items/posts",
      role: "admin",
      icon: "fa fa-pencil"
    },
    {
      text: "RFQs",
      link: "/admin/reported-items/rfqs",
      role: "admin",
      icon: "fa fa-file-powerpoint-o"
    },
    {
      text: "Trainings",
      link: "/admin/reported-items/trainings",
      role: "admin",
      icon: "fa fa-leanpub"
    }
  ]
};

const ads = {
  text: "Ads Management",
  link: "/admin/ads",
  icon: "fa fa-shopping-cart",
  role: "admin"
};
const Reporting = {
  text: "Reports",
  role: "admin",
  icon: "fa fa-pie-chart",
  submenu: [
    {
      text: 'Statistics',
      link: "/admin/statistic",
      icon: "fa fa-bar-chart",
    },
    {
      text: 'Users Action Log',
      link: "/admin/reporting",
      icon: "fa fa-user",
    },
    {
      text: "Users Session Log",
      icon: "fa fa-user-circle-o",
      role: "admin",
      submenu: [
        {
          text: 'Active',
          link: "/admin/session/active",
          icon: "fa fa-play"
        },
        {
          text: 'Closed',
          link: "/admin/session/deactive",
          icon: "fa fa-stop"
        },
      ]
    },
    {
      text: "Statements",
      link: "/admin/statements",
      icon: "fa fa-file-text-o",
      role: "admin"
    }
  ]
};

const feedbacks = {
  text: "Feedbacks",
  link: "/admin/feedbacks",
  icon: "fa fa-comments",
  role: "admin"
};

const ProfileVerificationRequest = {
  text: "Profile Verification Requests",
  link: "/admin/profile-verification-request",
  icon: "fa fa-user-circle-o",
  role: "admin"
};

const Company = {
  text: "Companies",
  icon: "fa fa-building-o",
  role: "admin",
  submenu: [
    {
      text: "Verified",
      link: "/admin/companies/verified",
      icon: "fa fa-check-circle-o",
      role: "admin"
    },
    {
      text: "Pending Verification",
      link: "/admin/companies/unverified",
      icon: "fa fa-exclamation",
      role: "admin"
    },
    {
      text: "Rejected",
      link: "/admin/companies/rejected",
      role: "admin",
      icon: "fa fa-times-circle-o"
    }
  ]
};


const masterData = {
  text: "Master Data",
  link: "/admin/master-data",
  icon: "fa fa-table",
  role: "admin",
  submenu: [
    {
      text: "Packages",
      icon: "fa fa-shopping-cart",
      role: "admin",
      submenu: [
        {
          text: "Job Posting",
          link: "/admin/packages/jobPosting",
          icon: "fa fa-briefcase",
          role: "admin"
        },
        {
          text: "Resume Search",
          link: "/admin/packages/resumeSearch",
          icon: "fa fa-search",
          role: "admin"
        },


        //{
        //  text: "Add",
        //  link: "/packages/create",
        //  role: "admin",
        //  icon: "fa fa-plus",
        //}
      ]
    },
    {
      text: "Bank Accounts",
      icon: "fa fa-university",
      role: "admin",
      submenu: [
        {
          text: "Active",
          link: "/admin/bank-accounts/active-bank-accounts",
          icon: "fa fa-play",
          role: "admin"
        },
        {
          text: "Inactive",
          link: "/admin/bank-accounts/inactive-bank-accounts",
          icon: "fa fa-stop",
          role: "admin"
        }
      ]
    },
    {
      text: "Exchange Rate",
      icon: "fa fa-exchange",
      link: "/admin/exchange-rate",
      role: "admin",
    },

    {
      text: "Other",
      link: "/admin/master-data/approved",
      icon: "fa fa-list",
      role: "admin",
      submenu: [
        {
          text: "Skills",
          link: "/admin/master-data/approved/skills",
          icon: "fa fa-user-md",
          role: "admin"
        },
        {
          text: "Functional Areas",
          link: "/admin/master-data/approved/func-areas",
          role: "admin",
          icon: "fa fa-briefcase"
        },
        {
          text: "Industries",
          link: "/admin/master-data/approved/industries",
          role: "admin",
          icon: "fa fa-building"
        },
        {
          text: "Institutes",
          link: "/admin/master-data/approved/institutes",
          role: "admin",
          icon: "fa fa-graduation-cap"
        },
        {
          text: "Qualifications",
          link: "/admin/master-data/approved/qualifications",
          role: "admin",
          icon: "fa fa-flask"
        },
        {
          text: "Qualification Majors",
          link: "/admin/master-data/approved/qualification-majors",
          role: "admin",
          icon: "fa fa-flask"
        },
        {
          text: "Contract Types",
          link: "/admin/master-data/approved/contract-types",
          role: "admin",
          icon: "fa fa-calendar-check-o"
        },
        {
          text: "Languages",
          link: "/admin/master-data/approved/languages",
          role: "admin",
          icon: "fa fa-language"
        },
        {
          text: "Nationalities",
          link: "/admin/master-data/approved/nationalities",
          role: "admin",
          icon: "fa fa-flag-o"
        },
        {
          text: "Concern Areas",
          link: "/admin/master-data/approved/concern-areas",
          icon: "fa fa-exclamation-circle",
          role: "admin"
        },
        {
          text: "Company Types",
          link: "/admin/master-data/approved/company-types",
          role: "admin",
          icon: "fa fa-building"
        },
        {
          text: "Price Plans",
          link: "/admin/master-data/approved/price-plans",
          role: "admin",
          icon: "fa fa-usd"
        }
      ]
    },
    {
      text: "Pending Approval",
      link: "/admin/master-data/unapproved",
      role: "admin",
      icon: "fa fa-exclamation",
      submenu: [
        {
          text: "Skills",
          link: "/admin/master-data/unapproved/skills",
          role: "admin",
          icon: "fa fa-user-md"
        },
        {
          text: "Functional Areas",
          link: "/admin/master-data/unapproved/func-areas",
          role: "admin",
          icon: "fa fa-briefcase"
        },
        {
          text: "Industries",
          link: "/admin/master-data/unapproved/industries",
          role: "admin",
          icon: "fa fa-building"
        },
        {
          text: "Institutes",
          link: "/admin/master-data/unapproved/institutes",
          role: "admin",
          icon: "fa fa-graduation-cap"
        },
        {
          text: "Qualifications",
          link: "/admin/master-data/unapproved/qualifications",
          role: "admin",
          icon: "fa fa-flask"
        },
        {
          text: "Qualification Majors",
          link: "/admin/master-data/unapproved/qualification-majors",
          role: "admin",
          icon: "fa fa-flask"
        },
        {
          text: "Contract Types",
          link: "/admin/master-data/unapproved/contract-types",
          role: "admin",
          icon: "fa fa-calendar-check-o"
        },
        {
          text: "Languages",
          link: "/admin/master-data/unapproved/languages",
          role: "admin",
          icon: "fa fa-language"
        },
        {
          text: "Nationalities",
          link: "/admin/master-data/unapproved/nationalities",
          role: "admin",
          icon: "fa fa-flag-o"
        }
      ]
    },
  ]
};

export const menu = [
  Users,
  Jobs,
  Company,
  Subscriptions,
  ReportedItems,
  Reporting,
  masterData,
  feedbacks,
  // ads,
  ProfileVerificationRequest,

];
