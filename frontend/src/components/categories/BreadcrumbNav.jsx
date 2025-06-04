import { Link, useLocation } from 'react-router-dom';

const DynamicBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <ol className="flex space-x-1 md:space-x-2 items-center">
        <li>
          <Link to="/" className="text-blue-600 hover:underline text-xs sm:text-base">Home</Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
          const isLast = index === pathnames.length - 1;
          const label = name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

          return (
            <li key={index} className="flex items-center text-xs sm:text-base">
              <span className="mx-1">{`>`} </span>
              {isLast ? (
                <span className="text-gray-800 dark:text-gray-300">{label}</span>
              ) : (
                <Link to={routeTo} className="text-blue-600 hover:underline">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default DynamicBreadcrumb;
