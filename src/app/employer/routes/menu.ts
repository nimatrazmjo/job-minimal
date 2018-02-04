
const Dashboard = {
  text: "Dashboard",
  link: "/employer/dashboard",
  icon: "fa fa-dashboard",
  color: 'brown',
  id: "dashboard",
  teamMemberPermissionRequired: "",
};

const JobPosting = {
  text: "Jobs",
  link: "/employer/jobs",
  icon: "fa fa-briefcase",
  color: 'cornflowerblue',
  teamMemberPermissionRequired: "canPostJob",
  permissionsRequired: [
    "canPostJob"
  ],
  id: "jobs",
  submenu: [
    {
      text: "Published",
      link: "/employer/jobs",
      icon: "fa fa-list"
    },
    {
      text: "Posted By Me",
      link: "/employer/jobs/byMe",
      icon: "fa fa-user"
    },
    {
      text: "Drafts",
      link: "/employer/jobs/drafts",
      icon: "fa fa-pencil"
    },
    {
      text: "Expired",
      link: "/employer/jobs/expired",
      icon: "fa fa-clock-o"
    },
    {
      text: "Archived",
      link: "/employer/jobs/archived",
      icon: "fa fa-archive"
    },
    {
      text: "Post a Job",
      link: "/employer/jobs/post",
      icon: "fa fa-plus"
    }
  ]
};

const Packages = {
  text: "Buy Credit",
  link: "/employer/packages",
  icon: "fa fa-shopping-cart",
  color: 'lightpink',
  id: "packages",
  submenu: [
    {
      text: "All",
      link: '/employer/packages',
      icon: 'fa fa-list'
    },
    {
      text: "Job Posting",
      link: "/employer/packages/jobPosting",
      icon: "fa fa-briefcase",
    },
    {
      text: "Resume Search",
      link: "/employer/packages/resumeSearch",
      icon: "fa fa-search",
    }
  ]
};

const Questionnaire = {
  text: "Job Questionnaires",
  link: "/employer/questionnaires",
  icon: "fa fa-list-alt",
  color: 'cadetblue',
  permissionsRequired: [
    "canPostJob"
  ],
  teamMemberPermissionRequired: "canPostJob",
  id: "questionnaires"
};

const ResumeSearch = {
  text: "Search For Resumes",
  link: "/employer/resume",
  icon: "fa fa-search",
  color: 'tan',
  teamMemberPermissionRequired: "canSearchResume",
  permissionsRequired: [
    "canSearchResume"
  ]
};

const CompanyProfile = {
  text: "Profile",
  link: "/employer/companyProfile",
  icon: "fa fa-university",
  color: 'currentColor',
  teamMemberPermissionRequired: "",
  id: "companyProfile",
};



export const menu = [Dashboard, Packages, JobPosting, Questionnaire, CompanyProfile, ResumeSearch];
