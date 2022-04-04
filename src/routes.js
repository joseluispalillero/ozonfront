import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

const routes = [
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ path: 'pokemon', element: <Dashboard /> },
			{ path: '404', element: <NotFound /> },
		],
	},
];

export default routes;
