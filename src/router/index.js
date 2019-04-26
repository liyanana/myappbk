import Vue from "vue";
import Router from "vue-router";
import basicLayout from "@/components/basicLayout";
import Index from "@/components/index";
import Workslist from "@/components/work/workslist";
import layout from "@/components/Layout";
import ArticleList from "@/components/article/articleList";
import videoList from "@/components/video/videoList";
import recruitmentList from "@/components/recruitment/recruitmentList";
import resumeList from "@/components/resume/resumeList";
import usersList from "@/components/user/usersList";
import userShow from "@/components/user/userShow";
import companiesList from "@/components/company/companiesList";
import companyShow from "@/components/company/companyShow";
import interviewList from "@/components/interview/interviewList";
import interviewShow from "@/components/interview/interviewShow";
import interQuestionList from "@/components/interview/interQuestionList";
import noticeAdd from "@/components/notice/noticeAdd";
import noticeList from "@/components/notice/noticeList";
import updateNotice from "@/components/notice/updateNotice";
import addSort from "@/components/work/addSort";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: "/workslist",
      name: "workslist",
      component: Workslist,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: "/layout",
      name: "layout",
      omponent: layout
    },
    {
      path: "/articleList",
      name: "articleList",
      component: ArticleList
    },
    {
      path: "/videoList",
      name: "videoList",
      component: videoList
    },
    {
      path: "/recruitmentList",
      name: "recruitmentList",
      component: recruitmentList
    },
    {
      path: "/resumeList",
      name: "resumeList",
      component: resumeList
    },
    {
      path: "/usersList",
      name: "usersList",
      component: usersList
    },
    {
      path: "/userShow/:id",
      name: "userShow",
      component: userShow
    },
    {
      path: "/companiesList",
      name: "companiesList",
      component: companiesList
    },
    {
      path: "/companyShow/:id",
      name: "companyShow",
      component: companyShow
    },
    {
      path: "/interviewList",
      name: "interviewList",
      component: interviewList
    },
    {
      path: "/interviewShow/:id",
      name: "interviewShow",
      component: interviewShow
    },
    {
      path: "/interQuestionList",
      name: "interQuestionList",
      component: interQuestionList
    },
    {
      path: "/noticeAdd",
      name: "noticeAdd",
      component: noticeAdd
    },
    {
      path: "/noticeList",
      name: "noticeList",
      component: noticeList
    },
    {
      path: "/updateNotice/:id",
      name: "updateNotice",
      component: updateNotice
    },
    {
      path: "/addSort/:id",
      name: "addSort",
      component: addSort
    }
  ]
});
