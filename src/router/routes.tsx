import { lazy } from 'react';

const Error = lazy(() => import('../components/Error'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const PokerFileUpload = lazy(() => import('../pages/poker/user/upload/FileUpload'));
const Dashboard = lazy(() => import('../pages/poker/user/upload'));
const GameProcess = lazy(() => import('../pages/poker/user/process'));
const GameAnalysis = lazy(() => import('../pages/poker/user/anaylsis'));
const HandDetail = lazy(() => import('../pages/poker/user/handDetail'));
const Report = lazy(() => import('../pages/poker/user/report'));
const Landing = lazy(() => import('../pages/poker/user/landing'));
const Payment = lazy(() => import('../pages/poker/user/payment'));
const Profile = lazy(() => import('../pages/Users/Profile'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const Article = lazy(() => import('../pages/poker/user/article'));
const MoreDetail = lazy(() => import('../pages/poker/user/article/MoreDetail'));
const ContributorsArticle = lazy(() => import('../pages/poker/user/article/ContributorsArticle'));


const routes = [
    {
        path: '/',
        element: <Landing />,
    },
    {
        path: '/user/payment',
        element: <Payment />,
    },
    {
        path: '/auth/boxed-signup',
        element: <RegisterBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-signin',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/user/poker/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/user/poker/upload',
        element: <PokerFileUpload />,
    },
    {
        path: '/user/poker/article',
        element: <Article />,
    },
    {
        path: '/user/poker/article-detail/:id',
        element: <MoreDetail />,
    },
    {
        path: '/user/poker/contributor-article/:id',
        element: <ContributorsArticle />,
    },
    {
        path: '/user/poker/process',
        element: <GameProcess />,
    },
    {
        path: '/user/poker/study',
        element: <GameAnalysis />,
    },
    {
        path: '/user/poker/process/:id',
        element: <HandDetail />,
    },
    {
        path: '/user/poker/report',
        element: <Report />,
    },
    {
        path: '/users/profile',
        element: <Profile />,
    },
    {
        path: '/users/user-account-settings',
        element: <AccountSetting />,
    },
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
