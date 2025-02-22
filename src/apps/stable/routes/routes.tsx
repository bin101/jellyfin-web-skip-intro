import { RouteObject, redirect } from 'react-router-dom';
import React from 'react';

import { DASHBOARD_APP_PATHS } from 'apps/dashboard/routes/routes';
import ConnectionRequired from 'components/ConnectionRequired';
import { toAsyncPageRoute } from 'components/router/AsyncRoute';
import { toViewManagerPageRoute } from 'components/router/LegacyRoute';
import { toRedirectRoute } from 'components/router/Redirect';
import AppLayout from '../AppLayout';
import { REDIRECTS } from './_redirects';
import { ASYNC_USER_ROUTES } from './asyncRoutes';
import { LEGACY_PUBLIC_ROUTES, LEGACY_USER_ROUTES } from './legacyRoutes';

export const STABLE_APP_ROUTES: RouteObject[] = [
    {
        path: '/*',
        element: <AppLayout />,
        children: [
            {
                /* User routes */
                element: <ConnectionRequired isUserRequired />,
                children: [
                    ...ASYNC_USER_ROUTES.map(toAsyncPageRoute),
                    ...LEGACY_USER_ROUTES.map(toViewManagerPageRoute)
                ]
            },

            /* Public routes */
            { index: true, loader: () => redirect('/home.html') },
            ...LEGACY_PUBLIC_ROUTES.map(toViewManagerPageRoute),

            /* Suppress warnings for unhandled routes */
            { path: '*', element: null }
        ]
    },

    /* Redirects for old paths */
    ...REDIRECTS.map(toRedirectRoute),

    /* Ignore dashboard routes */
    ...Object.entries(DASHBOARD_APP_PATHS).map(([, path]) => ({
        path: `/${path}/*`,
        element: null
    }))

];
